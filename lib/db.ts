import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { AuctionState, Player, Team, TeamState } from '@/types';

interface AuctionDB extends DBSchema {
  state: {
    key: string;
    value: AuctionState;
  };
  teams: {
    key: string;
    value: Team;
  };
  players: {
    key: string;
    value: Player;
  };
}

const DB_NAME = 'ipl-auction-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<AuctionDB> | null = null;

export async function initDB(): Promise<IDBPDatabase<AuctionDB>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<AuctionDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains('state')) {
        db.createObjectStore('state');
      }
      if (!db.objectStoreNames.contains('teams')) {
        db.createObjectStore('teams');
      }
      if (!db.objectStoreNames.contains('players')) {
        db.createObjectStore('players');
      }
    },
  });

  return dbInstance;
}

// State operations
export async function saveAuctionState(state: AuctionState): Promise<void> {
  const db = await initDB();
  // Convert Map to plain object for storage
  const stateToStore = {
    ...state,
    teamStates: Object.fromEntries(state.teamStates),
  };
  await db.put('state', stateToStore as unknown as AuctionState, 'current');
}

export async function loadAuctionState(): Promise<AuctionState | null> {
  const db = await initDB();
  const state = await db.get('state', 'current');
  if (!state) return null;

  // Convert plain object back to Map
  const stateWithTeamStates = state as AuctionState & { teamStates: Record<string, TeamState> };
  return {
    ...state,
    teamStates: new Map(Object.entries(stateWithTeamStates.teamStates || {})),
  };
}

export async function clearAuctionState(): Promise<void> {
  const db = await initDB();
  await db.delete('state', 'current');
}

// Team operations
export async function saveTeams(teams: Team[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('teams', 'readwrite');
  await Promise.all(teams.map(team => tx.store.put(team, team.id)));
  await tx.done;
}

export async function loadTeams(): Promise<Team[]> {
  const db = await initDB();
  return await db.getAll('teams');
}

// Player operations
export async function savePlayers(players: Player[]): Promise<void> {
  const db = await initDB();
  const tx = db.transaction('players', 'readwrite');
  await Promise.all(players.map(player => tx.store.put(player, player.id)));
  await tx.done;
}

export async function loadPlayers(): Promise<Player[]> {
  const db = await initDB();
  return await db.getAll('players');
}

// Initialize default state
export function createDefaultAuctionState(teams: Team[], players: Player[]): AuctionState {
  const teamStates = new Map<string, TeamState>();
  
  teams.forEach(team => {
    teamStates.set(team.id, {
      teamId: team.id,
      remainingPurse: team.initialPurse,
      totalSpent: 0,
      players: [],
    });
  });

  return {
    isActive: false,
    isPaused: false,
    currentPlayerIndex: 0,
    currentBid: 0,
    currentBiddingTeamId: null,
    playerQueue: [...players],
    soldPlayers: [],
    unsoldPlayers: [],
    teamStates,
    bidHistory: [],
    bidIncrement: 0.25, // 25 lakhs default increment
  };
}

// Clear all data
export async function clearAllData(): Promise<void> {
  const db = await initDB();
  await db.clear('state');
  await db.clear('teams');
  await db.clear('players');
}
