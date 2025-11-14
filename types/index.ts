// Core data types for IPL Auction Dashboard

export type PlayerRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';

export interface PlayerStats {
  matches: number;
  runs?: number;
  wickets?: number;
  average?: number;
  strikeRate?: number;
  economy?: number;
  fifties?: number;
  hundreds?: number;
  bestBowling?: string;
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  country: string;
  basePrice: number; // in crores
  stats: PlayerStats;
  imageUrl?: string;
  iplHistory?: string[]; // teams played for
  yearRange?: string; // e.g., "2010-2023"
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  initialPurse: number; // in crores
}

export interface BidHistory {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  amount: number;
  timestamp: number;
}

export interface SoldPlayer {
  player: Player;
  teamId: string;
  amount: number;
  timestamp: number;
}

export interface TeamState {
  teamId: string;
  remainingPurse: number;
  totalSpent: number;
  players: SoldPlayer[];
}

export interface AuctionState {
  isActive: boolean;
  isPaused: boolean;
  currentPlayerIndex: number;
  currentBid: number;
  currentBiddingTeamId: string | null;
  playerQueue: Player[];
  soldPlayers: SoldPlayer[];
  unsoldPlayers: Player[];
  teamStates: Map<string, TeamState>;
  bidHistory: BidHistory[];
  bidIncrement: number;
}

export interface AuctionAction {
  type: 'START' | 'PAUSE' | 'RESUME' | 'NEXT_PLAYER' | 'PLACE_BID' | 'SELL' | 'UNSELL' | 'UNDO' | 'RESET' | 'SET_INCREMENT';
  payload?: {
    teamId?: string;
    amount?: number;
    increment?: number;
    player?: Player;
  };
}

export interface DBSchema {
  auctionState: AuctionState;
  teams: Team[];
  players: Player[];
  timestamp: number;
}
