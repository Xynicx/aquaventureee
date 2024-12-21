import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Camera, Save } from 'lucide-react';

export const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    preferences: {
      emailNotifications: user?.preferences?.emailNotifications || false,
      competitionAlerts: user?.preferences?.competitionAlerts || false,
      achievementAlerts: user?.preferences?.achievementAlerts || false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      ...user!,
      ...formData,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full"
                />
                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-blue-200">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md bg-white/5 border-transparent text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="mt-1 block w-full rounded-md bg-white/5 border-transparent text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-200">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md bg-white/5 border-transparent text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferences.emailNotifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          emailNotifications: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white">Email Notifications</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferences.competitionAlerts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          competitionAlerts: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white">Competition Alerts</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferences.achievementAlerts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          achievementAlerts: e.target.checked,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-white">Achievement Alerts</span>
                </label>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-white hover:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};