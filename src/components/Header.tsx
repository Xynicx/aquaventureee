import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Droplets, Users, Info, LogOut, Bot } from 'lucide-react';
import { ChatBot } from './ChatBot/ChatBot';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center gap-2">
                <Droplets className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold text-white">Aquaventure</span>
              </Link>
              <nav className="ml-10 flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/discover"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/discover'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Users className="inline-block w-4 h-4 mr-1" />
                  Discover
                </Link>
                <Link
                  to="/about"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/about'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Info className="inline-block w-4 h-4 mr-1" />
                  About
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Bot className="w-6 h-6" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-white">{user?.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </>
  );
};