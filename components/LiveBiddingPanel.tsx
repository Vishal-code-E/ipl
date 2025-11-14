'use client';

import { Team } from '@/types';
import { motion } from 'framer-motion';

interface LiveBiddingPanelProps {
  teams: Team[];
  currentBid: number;
  currentBiddingTeamId: string | null;
  bidIncrement: number;
  onPlaceBid: (teamId: string, amount: number) => void;
  onIncreaseBid: () => void;
  onSell: () => void;
  onUnsell: () => void;
  onUndo: () => void;
  canUndo: boolean;
  isActive: boolean;
}

export function LiveBiddingPanel({
  teams,
  currentBid,
  currentBiddingTeamId,
  bidIncrement,
  onPlaceBid,
  onIncreaseBid,
  onSell,
  onUnsell,
  onUndo,
  canUndo,
  isActive,
}: LiveBiddingPanelProps) {
  const incrementOptions = [0.25, 0.5, 1.0, 2.0, 5.0];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Live Bidding</h3>

      {/* Current Bid Display */}
      <div className="bg-linear-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200">
        <p className="text-sm text-gray-600 mb-1">Current Highest Bid</p>
        <motion.div
          key={currentBid}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold text-gray-900"
        >
          ₹{currentBid.toFixed(2)} Cr
        </motion.div>
        {currentBiddingTeamId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-700 mt-2"
          >
            {teams.find(t => t.id === currentBiddingTeamId)?.name}
          </motion.p>
        )}
      </div>

      {/* Bid Increment Selection */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Bid Increment</p>
        <div className="flex gap-2 flex-wrap">
          {incrementOptions.map(inc => (
            <button
              key={inc}
              onClick={() => onPlaceBid(
                currentBiddingTeamId || teams[0].id,
                currentBid + inc
              )}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                inc === bidIncrement
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={!isActive}
            >
              +₹{inc.toFixed(2)} Cr
            </button>
          ))}
        </div>
      </div>

      {/* Team Selection */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Select Team to Bid</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {teams.map(team => (
            <button
              key={team.id}
              onClick={() => onPlaceBid(team.id, currentBid + bidIncrement)}
              disabled={!isActive}
              className={`p-3 rounded-lg border-2 transition-all ${
                team.id === currentBiddingTeamId
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{team.logo}</span>
                <span className="text-sm font-medium text-gray-900">{team.shortName}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t">
        <button
          onClick={onIncreaseBid}
          disabled={!isActive || !currentBiddingTeamId}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
        >
          Raise Bid
        </button>

        <button
          onClick={onSell}
          disabled={!isActive || !currentBiddingTeamId}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
        >
          Sold!
        </button>

        <button
          onClick={onUnsell}
          disabled={!isActive}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
        >
          Unsold
        </button>

        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md"
        >
          Undo
        </button>
      </div>
    </div>
  );
}
