import { Award } from 'lucide-react';
import { Badge } from '../Badge';

interface Props {
  user: {
    name: string;
    picture: string;
    waterSaved: number;
    badgeLevel: 'bronze' | 'silver' | 'gold' | null;
  };
  rank: number;
}

export const LeaderboardItem = ({ user, rank }: Props) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-400';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-700';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
      <span className={`text-xl font-bold ${getRankColor(rank)}`}>#{rank}</span>
      <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{user.name}</span>
          {user.badgeLevel === 'gold' && <Award className="w-4 h-4 text-yellow-400" />}
        </div>
        <span className="text-sm text-gray-400">{user.waterSaved.toLocaleString()}L saved</span>
      </div>
      <Badge level={user.badgeLevel} />
    </div>
  );
};