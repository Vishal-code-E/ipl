'use client';

import { Player } from '@/types';
import { motion } from 'framer-motion';

interface NextPlayerPreviewProps {
  player: Player | undefined;
}

export function NextPlayerPreview({ player }: NextPlayerPreviewProps) {
  if (!player) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Next Player</h3>
        <p className="text-gray-500 text-center py-8">Auction Complete</p>
      </div>
    );
  }

  return (
    <motion.div
      key={player.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Next Player</h3>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-2xl font-bold shadow">
          {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-gray-900">{player.name}</h4>
          <div className="flex gap-2 mt-1">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">
              {player.role}
            </span>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
              {player.country}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Base: <span className="font-semibold text-gray-900">₹{player.basePrice.toFixed(2)} Cr</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
