'use client';

import { SoldPlayer, Player, Team } from '@/types';
import { useState } from 'react';

interface HistoryPanelProps {
  soldPlayers: SoldPlayer[];
  unsoldPlayers: Player[];
  teams: Team[];
}

export function HistoryPanel({ soldPlayers, unsoldPlayers, teams }: HistoryPanelProps) {
  const [activeTab, setActiveTab] = useState<'sold' | 'unsold'>('sold');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Auction History</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('sold')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'sold'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Sold ({soldPlayers.length})
        </button>
        <button
          onClick={() => setActiveTab('unsold')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'unsold'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Unsold ({unsoldPlayers.length})
        </button>
      </div>

      {/* Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'sold' && (
          <div className="space-y-2">
            {soldPlayers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No players sold yet</p>
            ) : (
              soldPlayers.slice().reverse().map((soldPlayer, idx) => {
                const team = teams.find(t => t.id === soldPlayer.teamId);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{team?.logo}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{soldPlayer.player.name}</h4>
                        <div className="flex gap-2 mt-0.5">
                          <span className="text-xs text-gray-600">{soldPlayer.player.role}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{team?.shortName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{soldPlayer.amount.toFixed(2)} Cr</p>
                      <p className="text-xs text-gray-500">
                        {new Date(soldPlayer.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'unsold' && (
          <div className="space-y-2">
            {unsoldPlayers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No unsold players yet</p>
            ) : (
              unsoldPlayers.slice().reverse().map((player, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{player.name}</h4>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-xs text-gray-600">{player.role}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{player.country}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Base: ₹{player.basePrice.toFixed(2)} Cr</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{soldPlayers.length}</p>
          <p className="text-xs text-gray-500">Sold</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{unsoldPlayers.length}</p>
          <p className="text-xs text-gray-500">Unsold</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {(soldPlayers.length + unsoldPlayers.length)}
          </p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
    </div>
  );
}
