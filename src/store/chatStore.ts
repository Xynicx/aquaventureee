import { create } from 'zustand';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: any;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string, userId: string) => Promise<void>;
  fetchChatHistory: (userId: string) => Promise<void>;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hello! I\'m your water conservation assistant. How can I help you today?',
  timestamp: serverTimestamp(),
};

export const useChatStore = create<ChatState>()((set) => ({
  messages: [INITIAL_MESSAGE],
  isLoading: false,

  sendMessage: async (content: string, userId: string) => {
    try {
      set((state) => ({
        messages: [...state.messages, { role: 'user', content, timestamp: serverTimestamp() }],
        isLoading: true,
      }));

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a water conservation expert helping users save water and understand environmental impact.'
          },
          { role: 'user', content }
        ],
        model: 'gpt-3.5-turbo',
      });

      const response = completion.choices[0]?.message?.content || 'I apologize, but I cannot provide a response at this moment.';

      // Save to Firebase
      await addDoc(collection(db, 'chatHistory'), {
        userId,
        content,
        response,
        timestamp: serverTimestamp(),
      });

      set((state) => ({
        messages: [...state.messages, { role: 'assistant', content: response, timestamp: serverTimestamp() }],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      set({ isLoading: false });
    }
  },

  fetchChatHistory: async (userId: string) => {
    try {
      const q = query(
        collection(db, 'chatHistory'),
        where('userId', '==', userId),
        orderBy('timestamp', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        role: 'user' as const,
        content: doc.data().content,
        timestamp: doc.data().timestamp,
      }));
      set({ messages: [INITIAL_MESSAGE, ...messages] });
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  },
}));