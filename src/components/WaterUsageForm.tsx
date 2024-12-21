import { useState } from 'react';
import { useWaterUsageStore } from '../store/waterUsageStore';

interface Props {
  onClose: () => void;
}

export const WaterUsageForm = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    shower: 0,
    toilet: 0,
    dishes: 0,
    laundry: 0,
    garden: 0,
    drinking: 0,
  });

  const { addUsage } = useWaterUsageStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Object.values(formData).reduce((acc, curr) => acc + curr, 0);
    
    addUsage({
      date: new Date().toISOString().split('T')[0],
      ...formData,
      total,
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Log Water Usage</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Shower (minutes)
              </label>
              <input
                type="number"
                name="shower"
                value={formData.shower}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Toilet Flushes
              </label>
              <input
                type="number"
                name="toilet"
                value={formData.toilet}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dishes (minutes)
              </label>
              <input
                type="number"
                name="dishes"
                value={formData.dishes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Laundry Loads
              </label>
              <input
                type="number"
                name="laundry"
                value={formData.laundry}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Garden (minutes)
              </label>
              <input
                type="number"
                name="garden"
                value={formData.garden}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drinking (liters)
              </label>
              <input
                type="number"
                name="drinking"
                value={formData.drinking}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
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
              Save Usage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};