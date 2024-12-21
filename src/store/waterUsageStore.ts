import { create } from 'zustand';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface WaterUsage {
  date: string;
  shower: number;
  toilet: number;
  dishes: number;
  laundry: number;
  garden: number;
  drinking: number;
  total: number;
  userId: string;
}

interface WaterUsageState {
  usageHistory: WaterUsage[];
  addUsage: (usage: Omit<WaterUsage, 'userId'>, userId: string) => Promise<void>;
  fetchUserUsage: (userId: string) => Promise<void>;
  getWeeklyTotal: () => number;
  getMonthlyTotal: () => number;
  getBadgeLevel: () => 'bronze' | 'silver' | 'gold' | null;
}

export const useWaterUsageStore = create<WaterUsageState>()((set, get) => ({
  usageHistory: [],
  
  addUsage: async (usage, userId) => {
    try {
      const usageWithUser = { ...usage, userId };
      await addDoc(collection(db, 'waterUsage'), usageWithUser);
      set((state) => ({
        usageHistory: [...state.usageHistory, usageWithUser],
      }));
    } catch (error) {
      console.error('Error adding water usage:', error);
    }
  },

  fetchUserUsage: async (userId) => {
    try {
      const q = query(
        collection(db, 'waterUsage'),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const usageData = querySnapshot.docs.map(doc => doc.data() as WaterUsage);
      set({ usageHistory: usageData });
    } catch (error) {
      console.error('Error fetching water usage:', error);
    }
  },

  getWeeklyTotal: () => {
    const state = get();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return state.usageHistory
      .filter((usage) => new Date(usage.date) >= weekAgo)
      .reduce((acc, curr) => acc + curr.total, 0);
  },

  getMonthlyTotal: () => {
    const state = get();
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    return state.usageHistory
      .filter((usage) => new Date(usage.date) >= monthAgo)
      .reduce((acc, curr) => acc + curr.total, 0);
  },

  getBadgeLevel: () => {
    const weeklyTotal = get().getWeeklyTotal();
    if (weeklyTotal >= 5000) return 'gold';
    if (weeklyTotal >= 3000) return 'silver';
    if (weeklyTotal >= 1000) return 'bronze';
    return null;
  },
}));