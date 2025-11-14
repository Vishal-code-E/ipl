'use client';

import { Team, TeamState } from '@/types';
import { motion } from 'framer-motion';

interface TeamsPanelProps {
  teams: Team[];
  teamStates: Map<string, TeamState>;
  currentBiddingTeamId: string | null;
}

export function TeamsPanel({ teams, teamStates, currentBiddingTeamId }: TeamsPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Teams</h3>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {teams.map(team => {
          const state = teamStates.get(team.id);
          if (!state) return null;

          const pursePercentage = (state.remainingPurse / team.initialPurse) * 100;
          const isCurrentBidder = team.id === currentBiddingTeamId;

          return (
            <motion.div
              key={team.id}
              animate={{
                scale: isCurrentBidder ? 1.02 : 1,
                boxShadow: isCurrentBidder
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              }}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                isCurrentBidder ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <span className="text-2xl sm:text-3xl shrink-0">{team.logo}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{team.shortName}</h4>
                    <p className="text-xs text-gray-500 truncate">{team.name}</p>
                  </div>
                </div>
                {isCurrentBidder && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded-full font-medium shrink-0"
                  >
                    Bidding
                  </motion.span>
                )}
              </div>

              {/* Purse Info */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Remaining</span>
                  <motion.span
                    key={state.remainingPurse}
                    initial={{ scale: 1.1, color: '#059669' }}
                    animate={{ scale: 1, color: '#111827' }}
                    className="font-bold"
                  >
                    ₹{state.remainingPurse.toFixed(2)} Cr
                  </motion.span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Spent</span>
                  <span className="font-bold text-gray-900">₹{state.totalSpent.toFixed(2)} Cr</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pursePercentage}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-linear-to-r from-green-400 to-blue-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {pursePercentage.toFixed(1)}% remaining
                </p>
              </div>

              {/* Players Count */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Players</span>
                <span className="font-bold text-gray-900">{state.players.length}</span>
              </div>

              {/* Recent Players */}
              {state.players.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Recent Purchases</p>
                  <div className="space-y-1">
                    {state.players.slice(-3).reverse().map((soldPlayer, idx) => (
                      <div key={idx} className="flex justify-between text-xs gap-2">
                        <span className="text-gray-700 truncate flex-1">
                          {soldPlayer.player.name}
                        </span>
                        <span className="font-medium text-gray-900 shrink-0">
                          ₹{soldPlayer.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
