'use client';

import { Player } from '@/types';
import { motion } from 'framer-motion';

interface CurrentPlayerPanelProps {
  player: Player | undefined;
  currentBid: number;
}

export function CurrentPlayerPanel({ player, currentBid }: CurrentPlayerPanelProps) {
  if (!player) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500 text-lg">No player selected</p>
      </div>
    );
  }

  return (
    <motion.div
      key={player.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Player Image */}
        <div className="flex justify-center items-center">
          <div className="w-48 h-48 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold shadow-xl">
            {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        </div>

        {/* Player Details */}
        <div className="col-span-2 space-y-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">{player.name}</h2>
            <div className="flex gap-4 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {player.role}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {player.country}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Base Price</p>
              <p className="text-2xl font-bold text-gray-900">₹{player.basePrice.toFixed(2)} Cr</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Bid</p>
              <motion.p
                key={currentBid}
                initial={{ scale: 1.2, color: '#059669' }}
                animate={{ scale: 1, color: '#111827' }}
                className="text-2xl font-bold"
              >
                ₹{currentBid.toFixed(2)} Cr
              </motion.p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-xs text-gray-500">Matches</p>
              <p className="text-lg font-bold text-gray-900">{player.stats.matches}</p>
            </div>
            {player.stats.runs !== undefined && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Runs</p>
                <p className="text-lg font-bold text-gray-900">{player.stats.runs}</p>
              </div>
            )}
            {player.stats.wickets !== undefined && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Wickets</p>
                <p className="text-lg font-bold text-gray-900">{player.stats.wickets}</p>
              </div>
            )}
            {player.stats.average !== undefined && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Average</p>
                <p className="text-lg font-bold text-gray-900">{player.stats.average.toFixed(2)}</p>
              </div>
            )}
            {player.stats.strikeRate !== undefined && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Strike Rate</p>
                <p className="text-lg font-bold text-gray-900">{player.stats.strikeRate.toFixed(2)}</p>
              </div>
            )}
            {player.stats.economy !== undefined && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Economy</p>
                <p className="text-lg font-bold text-gray-900">{player.stats.economy.toFixed(2)}</p>
              </div>
            )}
          </div>

          {player.iplHistory && player.iplHistory.length > 0 && (
            <div className="pt-4">
              <p className="text-xs text-gray-500 mb-2">IPL Teams</p>
              <div className="flex gap-2 flex-wrap">
                {player.iplHistory.map((team, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                  >
                    {team}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
