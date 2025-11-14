'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuctionState, Team, BidHistory, SoldPlayer } from '@/types';
import {
  initDB,
  saveAuctionState,
  loadAuctionState,
  saveTeams,
  loadTeams,
  savePlayers,
  loadPlayers,
  createDefaultAuctionState,
} from '@/lib/db';
import { getAuctionSync } from '@/lib/sync';

export function useAuction() {
  const [state, setState] = useState<AuctionState | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [undoStack, setUndoStack] = useState<AuctionState[]>([]);

  // Initialize auction
  const initAuction = useCallback(async () => {
    try {
      await initDB();
      
      // Load teams
      let teamsData = await loadTeams();
      if (teamsData.length === 0) {
        // Load from JSON if not in DB
        const teamsResponse = await fetch('/teams.json');
        teamsData = await teamsResponse.json();
        await saveTeams(teamsData);
      }
      setTeams(teamsData);

      // Load players
      let playersData = await loadPlayers();
      if (playersData.length === 0) {
        const playersResponse = await fetch('/players.json');
        playersData = await playersResponse.json();
        await savePlayers(playersData);
      }

      // Load or create auction state
      let auctionState = await loadAuctionState();
      if (!auctionState) {
        auctionState = createDefaultAuctionState(teamsData, playersData);
        await saveAuctionState(auctionState);
      }

      setState(auctionState);
    } catch (error) {
      console.error('Failed to initialize auction:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuction();
  }, [initAuction]);

  // Subscribe to sync messages
  useEffect(() => {
    const sync = getAuctionSync();
    const unsubscribe = sync.subscribe((message) => {
      if (message.type === 'STATE_UPDATE' && message.payload) {
        setState(prev => prev ? { ...prev, ...message.payload } : null);
      } else if (message.type === 'RESET') {
        initAuction();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [initAuction]);

  // Save state to DB and broadcast changes
  const updateState = useCallback(async (newState: AuctionState) => {
    setState(newState);
    await saveAuctionState(newState);
    getAuctionSync().broadcast({ type: 'STATE_UPDATE', payload: newState });
  }, []);

  // Save current state for undo
  const saveUndo = useCallback(() => {
    if (state) {
      setUndoStack(prev => [...prev.slice(-9), state]); // Keep last 10 states
    }
  }, [state]);

  // Start auction
  const startAuction = useCallback(async () => {
    if (!state) return;
    saveUndo();
    const newState = {
      ...state,
      isActive: true,
      isPaused: false,
      currentBid: state.playerQueue[0]?.basePrice || 0,
    };
    await updateState(newState);
  }, [state, saveUndo, updateState]);

  // Pause/Resume
  const togglePause = useCallback(async () => {
    if (!state) return;
    const newState = { ...state, isPaused: !state.isPaused };
    await updateState(newState);
  }, [state, updateState]);

  // Place bid
  const placeBid = useCallback(async (teamId: string, amount: number) => {
    if (!state) return;

    const teamState = state.teamStates.get(teamId);
    if (!teamState || teamState.remainingPurse < amount) {
      alert('Insufficient purse!');
      return;
    }

    saveUndo();
    const currentPlayer = state.playerQueue[state.currentPlayerIndex];
    
    const bidHistory: BidHistory = {
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      teamId,
      teamName: teams.find(t => t.id === teamId)?.name || '',
      amount,
      timestamp: Date.now(),
    };

    const newState = {
      ...state,
      currentBid: amount,
      currentBiddingTeamId: teamId,
      bidHistory: [...state.bidHistory, bidHistory],
    };

    await updateState(newState);
  }, [state, teams, saveUndo, updateState]);

  // Increase bid
  const increaseBid = useCallback(async () => {
    if (!state || !state.currentBiddingTeamId) return;
    const newAmount = state.currentBid + state.bidIncrement;
    await placeBid(state.currentBiddingTeamId, newAmount);
  }, [state, placeBid]);

  // Sell player
  const sellPlayer = useCallback(async () => {
    if (!state || !state.currentBiddingTeamId) {
      alert('No team is bidding!');
      return;
    }

    const currentPlayer = state.playerQueue[state.currentPlayerIndex];
    const teamState = state.teamStates.get(state.currentBiddingTeamId);
    
    if (!teamState) return;

    saveUndo();

    const soldPlayer: SoldPlayer = {
      player: currentPlayer,
      teamId: state.currentBiddingTeamId,
      amount: state.currentBid,
      timestamp: Date.now(),
    };

    const newTeamStates = new Map(state.teamStates);
    newTeamStates.set(state.currentBiddingTeamId, {
      ...teamState,
      remainingPurse: teamState.remainingPurse - state.currentBid,
      totalSpent: teamState.totalSpent + state.currentBid,
      players: [...teamState.players, soldPlayer],
    });

    const newState = {
      ...state,
      soldPlayers: [...state.soldPlayers, soldPlayer],
      teamStates: newTeamStates,
      currentPlayerIndex: state.currentPlayerIndex + 1,
      currentBid: state.playerQueue[state.currentPlayerIndex + 1]?.basePrice || 0,
      currentBiddingTeamId: null,
    };

    await updateState(newState);
  }, [state, saveUndo, updateState]);

  // Mark as unsold
  const markUnsold = useCallback(async () => {
    if (!state) return;

    saveUndo();
    const currentPlayer = state.playerQueue[state.currentPlayerIndex];

    const newState = {
      ...state,
      unsoldPlayers: [...state.unsoldPlayers, currentPlayer],
      currentPlayerIndex: state.currentPlayerIndex + 1,
      currentBid: state.playerQueue[state.currentPlayerIndex + 1]?.basePrice || 0,
      currentBiddingTeamId: null,
    };

    await updateState(newState);
  }, [state, saveUndo, updateState]);

  // Undo last action
  const undo = useCallback(async () => {
    if (undoStack.length === 0) return;
    
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    await updateState(previousState);
  }, [undoStack, updateState]);

  // Set bid increment
  const setBidIncrement = useCallback(async (increment: number) => {
    if (!state) return;
    const newState = { ...state, bidIncrement: increment };
    await updateState(newState);
  }, [state, updateState]);

  // Reset auction
  const resetAuction = useCallback(async () => {
    if (!confirm('Are you sure you want to reset the auction?')) return;
    
    const playersData = await loadPlayers();
    const newState = createDefaultAuctionState(teams, playersData);
    await updateState(newState);
    setUndoStack([]);
    getAuctionSync().broadcast({ type: 'RESET' });
  }, [teams, updateState]);

  const currentPlayer = state?.playerQueue[state.currentPlayerIndex];
  const nextPlayer = state?.playerQueue[state.currentPlayerIndex + 1];

  return {
    state,
    teams,
    loading,
    currentPlayer,
    nextPlayer,
    canUndo: undoStack.length > 0,
    // Actions
    startAuction,
    togglePause,
    placeBid,
    increaseBid,
    sellPlayer,
    markUnsold,
    undo,
    setBidIncrement,
    resetAuction,
  };
}
