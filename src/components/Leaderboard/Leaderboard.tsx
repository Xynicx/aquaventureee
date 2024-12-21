import { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { LeaderboardItem } from './LeaderboardItem';
import { useUserStore } from '../../store/userStore';

export const Leaderboard = () => {
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const sortedUsers = [...users].sort((a, b) => b.waterSaved - a.waterSaved).slice(0, 10);

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-xl font-bold text-white">Top Water Savers</h2>
      </div>

      <div className="space-y-4">
        {sortedUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <LeaderboardItem user={user} rank={index + 1} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};