'use client';

interface AuctionControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onStart: () => void;
  onTogglePause: () => void;
  onReset: () => void;
  currentPlayerIndex: number;
  totalPlayers: number;
}

export function AuctionControls({
  isActive,
  isPaused,
  onStart,
  onTogglePause,
  onReset,
  currentPlayerIndex,
  totalPlayers,
}: AuctionControlsProps) {
  const progress = totalPlayers > 0 ? (currentPlayerIndex / totalPlayers) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Auction Controls</h3>

      {/* Status */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              !isActive
                ? 'bg-gray-100 text-gray-800'
                : isPaused
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800 animate-pulse'
            }`}
          >
            {!isActive ? 'Not Started' : isPaused ? 'Paused' : 'Live'}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{currentPlayerIndex} / {totalPlayers}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-2">
        {!isActive ? (
          <button
            onClick={onStart}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
          >
            Start Auction
          </button>
        ) : (
          <button
            onClick={onTogglePause}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors shadow-md ${
              isPaused
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}

        <button
          onClick={onReset}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md"
        >
          Reset Auction
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Players Remaining</span>
          <span className="font-bold text-gray-900">{totalPlayers - currentPlayerIndex}</span>
        </div>
      </div>
    </div>
  );
}
