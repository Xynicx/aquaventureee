import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useUserStore } from '../store/userStore';

interface Props {
  onClose: () => void;
  opponent: {
    id: string;
    name: string;
    picture: string;
  };
}

export const CompetitionModal = ({ onClose, opponent }: Props) => {
  const [duration, setDuration] = useState<'week' | 'month'>('week');
  const [target, setTarget] = useState(duration === 'week' ? 500 : 8000);
  const { user } = useAuthStore();
  const { startCompetition } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDate = new Date();
    const endDate = new Date();
    if (duration === 'week') {
      endDate.setDate(endDate.getDate() + 7);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    const competition = {
      id: Math.random().toString(36).substr(2, 9),
      opponent: opponent.id,
      target,
      duration,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      progress: 0,
    };

    startCompetition(user!.id, competition);
    onClose();
  };

  const handleDurationChange = (newDuration: 'week' | 'month') => {
    setDuration(newDuration);
    setTarget(newDuration === 'week' ? 500 : 8000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Start Competition</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <img src={user?.picture} alt={user?.name} className="w-12 h-12 rounded-full" />
            <span className="text-lg">vs</span>
            <img src={opponent.picture} alt={opponent.name} className="w-12 h-12 rounded-full" />
          </div>
          <span className="text-lg">{opponent.name}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleDurationChange('week')}
                className={`px-4 py-2 rounded-lg text-center ${
                  duration === 'week'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                1 Week
              </button>
              <button
                type="button"
                onClick={() => handleDurationChange('month')}
                className={`px-4 py-2 rounded-lg text-center ${
                  duration === 'month'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                1 Month
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target (Liters) - Minimum: {duration === 'week' ? '500L' : '8000L'}
            </label>
            <input
              type="number"
              min={duration === 'week' ? 500 : 8000}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Start Competition
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};