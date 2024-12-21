import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAuthStore } from '../store/authStore';
import { useWaterUsageStore } from '../store/waterUsageStore';
import { WaterUsageForm } from './WaterUsageForm';
import { Badge } from './Badge';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { usageHistory, getWeeklyTotal, getMonthlyTotal, getBadgeLevel } = useWaterUsageStore();
  const [showUsageForm, setShowUsageForm] = useState(false);

  const chartData = {
    labels: usageHistory.map(usage => usage.date),
    datasets: [
      {
        label: 'Daily Water Usage (L)',
        data: usageHistory.map(usage => usage.total),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Water Usage Over Time',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome, {user?.name}</h1>
                <p className="text-blue-200">Track your water conservation journey</p>
              </div>
            </div>
            <Badge level={getBadgeLevel()} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Weekly Overview</h2>
            <p className="text-4xl font-bold text-blue-300">{getWeeklyTotal()}L</p>
            <p className="text-blue-200">Water Saved This Week</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Monthly Overview</h2>
            <p className="text-4xl font-bold text-blue-300">{getMonthlyTotal()}L</p>
            <p className="text-blue-200">Water Saved This Month</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Usage History</h2>
            <button
              onClick={() => setShowUsageForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Log Today's Usage
            </button>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>

        {showUsageForm && (
          <WaterUsageForm onClose={() => setShowUsageForm(false)} />
        )}
      </div>
    </div>
  );
};