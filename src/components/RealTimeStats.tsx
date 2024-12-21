import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Users, Award } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

export const RealTimeStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWaterSaved: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    const usersQuery = query(collection(db, 'users'));
    const usageQuery = query(collection(db, 'waterUsage'), orderBy('date', 'desc'));

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      setStats(prev => ({
        ...prev,
        totalUsers: snapshot.size,
      }));
    });

    const unsubscribeUsage = onSnapshot(usageQuery, (snapshot) => {
      const total = snapshot.docs.reduce((acc, doc) => acc + doc.data().total, 0);
      setStats(prev => ({
        ...prev,
        totalWaterSaved: total,
      }));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeUsage();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Total Users</h3>
            <p className="text-2xl font-bold text-blue-400">{stats.totalUsers}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center gap-3">
          <Droplets className="w-8 h-8 text-green-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Water Saved</h3>
            <p className="text-2xl font-bold text-green-400">
              {stats.totalWaterSaved.toLocaleString()}L
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl p-6"
      >
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-yellow-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">Active Users</h3>
            <p className="text-2xl font-bold text-yellow-400">{stats.activeUsers}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};