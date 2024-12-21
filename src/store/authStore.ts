import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserPreferences {
  emailNotifications: boolean;
  competitionAlerts: boolean;
  achievementAlerts: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  bio?: string;
  location?: string;
  preferences?: UserPreferences;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: async (user) => {
        if (user) {
          const userRef = doc(db, 'users', user.id);
          const userDoc = await getDoc(userRef);
          
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              ...user,
              waterSaved: 0,
              badgeLevel: null,
              competitions: [],
            });
          }
        }
        set({ user, isAuthenticated: !!user });
      },
      setToken: async (token) => {
        if (token) {
          const decoded: any = jwtDecode(token);
          const user = {
            id: decoded.sub,
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
          };
          
          const userRef = doc(db, 'users', user.id);
          const userDoc = await getDoc(userRef);
          
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              ...user,
              waterSaved: 0,
              badgeLevel: null,
              competitions: [],
            });
          }

          set({
            token,
            user,
            isAuthenticated: true,
          });
        } else {
          set({ token: null, user: null, isAuthenticated: false });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
        localStorage.removeItem('auth-storage');
      },
      checkAuth: () => {
        const state = get();
        if (state.token) {
          try {
            const decoded: any = jwtDecode(state.token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
              state.logout();
            }
          } catch (error) {
            state.logout();
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              user: state.user,
              isAuthenticated: state.isAuthenticated,
              token: state.token,
            },
          };
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);