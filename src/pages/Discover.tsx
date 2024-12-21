import { useState, useEffect } from 'react';
import { Search, Award } from 'lucide-react';
import { UserCard } from '../components/UserCard';
import { Leaderboard } from '../components/Leaderboard/Leaderboard';
import { useUserStore } from '../store/userStore';
import { motion } from 'framer-motion';

export const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-white">Discover Water Warriors</h1>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <motion.div 
            className="grid gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <UserCard user={user} />
              </motion.div>
            ))}
          </motion.div>

          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              No users found matching your search.
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};