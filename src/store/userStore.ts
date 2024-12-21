import { create } from 'zustand';
import { collection, addDoc, query, getDocs, updateDoc, doc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

interface User {
  id: string;
  name: string;
  picture: string;
  waterSaved: number;
  badgeLevel: 'bronze' | 'silver' | 'gold' | null;
  competitions: Competition[];
}

interface Competition {
  id: string;
  opponent: string;
  target: number;
  duration: 'week' | 'month';
  startDate: string;
  endDate: string;
  progress: number;
}

interface UserState {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  startCompetition: (userId: string, competition: Omit<Competition, 'id'>) => Promise<void>;
}

export const useUserStore = create<UserState>()((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      set({ users: userData });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  addUser: async (user) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), user);
      set((state) => ({
        users: [...state.users, { ...user, id: docRef.id }],
      }));
    } catch (error) {
      console.error('Error adding user:', error);
    }
  },

  updateUser: async (id, updates) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, updates);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updates } : user
        ),
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },

  startCompetition: async (userId, competition) => {
    try {
      const competitionWithId = {
        ...competition,
        id: Math.random().toString(36).substr(2, 9),
      };
      
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        competitions: [...(await getDocs(query(collection(db, 'users'), where('id', '==', userId)))).docs[0].data().competitions, competitionWithId],
      });

      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId
            ? {
                ...user,
                competitions: [...user.competitions, competitionWithId],
              }
            : user
        ),
      }));
    } catch (error) {
      console.error('Error starting competition:', error);
    }
  },
}));