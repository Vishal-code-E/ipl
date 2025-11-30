'use client';

import { useAuction } from '@/hooks/useAuction';
import { CurrentPlayerPanel } from '@/components/CurrentPlayerPanel';
import { LiveBiddingPanel } from '@/components/LiveBiddingPanel';
import { TeamsPanel } from '@/components/TeamsPanel';
import { NextPlayerPreview } from '@/components/NextPlayerPreview';
import { HistoryPanel } from '@/components/HistoryPanel';
import { AuctionControls } from '@/components/AuctionControls';

export default function Home() {
  const {
    state,
    teams,
    loading,
    currentPlayer,
    nextPlayer,
    canUndo,
    startAuction,
    togglePause,
    placeBid,
    increaseBid,
    sellPlayer,
    markUnsold,
    undo,
    resetAuction,
  } = useAuction();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-900">IPL Auction...</p>
        </div>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-red-600">Failed to load auction Page</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">IPL Auction Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Live Auction Simulation • Offline First
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-600">Player {state.currentPlayerIndex + 1} of {state.playerQueue.length}</p>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    state.isActive && !state.isPaused
                      ? 'bg-green-100 text-green-800'
                      : state.isPaused
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {state.isActive && !state.isPaused ? '🔴 LIVE' : state.isPaused ? '⏸ PAUSED' : '⚪ READY'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Controls */}
          <div className="xl:col-span-2">
            <AuctionControls
              isActive={state.isActive}
              isPaused={state.isPaused}
              onStart={startAuction}
              onTogglePause={togglePause}
              onReset={resetAuction}
              currentPlayerIndex={state.currentPlayerIndex}
              totalPlayers={state.playerQueue.length}
            />
          </div>

          {/* Middle Column - Main Auction */}
          <div className="xl:col-span-6 space-y-6">
            <CurrentPlayerPanel
              player={currentPlayer}
              currentBid={state.currentBid}
            />

            <LiveBiddingPanel
              teams={teams}
              currentBid={state.currentBid}
              currentBiddingTeamId={state.currentBiddingTeamId}
              bidIncrement={state.bidIncrement}
              onPlaceBid={placeBid}
              onIncreaseBid={increaseBid}
              onSell={sellPlayer}
              onUnsell={markUnsold}
              onUndo={undo}
              canUndo={canUndo}
              isActive={state.isActive && !state.isPaused}
            />

            <NextPlayerPreview player={nextPlayer} />
          </div>

          {/* Right Column - Teams & History */}
          <div className="xl:col-span-4 space-y-6">
            <TeamsPanel
              teams={teams}
              teamStates={state.teamStates}
              currentBiddingTeamId={state.currentBiddingTeamId}
            />
            
            <HistoryPanel
              soldPlayers={state.soldPlayers}
              unsoldPlayers={state.unsoldPlayers}
              teams={teams}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              IPL Live Auction Dashboard • Fully Offline Mode• {new Date().getFullYear()}
            </p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Total Sold: {state.soldPlayers.length}</span>
              <span>•</span>
              <span>Unsold: {state.unsoldPlayers.length}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

