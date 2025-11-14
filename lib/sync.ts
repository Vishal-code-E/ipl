import { AuctionState } from '@/types';

const CHANNEL_NAME = 'ipl-auction-sync';

export type SyncMessage = {
  type: 'STATE_UPDATE' | 'RESET';
  payload?: Partial<AuctionState>;
};

class AuctionSync {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(message: SyncMessage) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event: MessageEvent<SyncMessage>) => {
        this.listeners.forEach(listener => listener(event.data));
      };
    }
  }

  broadcast(message: SyncMessage) {
    if (this.channel) {
      this.channel.postMessage(message);
    }
  }

  subscribe(listener: (message: SyncMessage) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  close() {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    this.listeners.clear();
  }
}

// Singleton instance
let syncInstance: AuctionSync | null = null;

export function getAuctionSync(): AuctionSync {
  if (!syncInstance) {
    syncInstance = new AuctionSync();
  }
  return syncInstance;
}
