import { useState } from 'react';
import { Trophy, Award, Droplets } from 'lucide-react';
import { CompetitionModal } from './CompetitionModal';
import { Badge } from './Badge';
import { motion } from 'framer-motion';

interface Props {
  user: {
    id: string;
    name: string;
    picture: string;
    waterSaved: number;
    badgeLevel: 'bronze' | 'silver' | 'gold' | null;
    competitions: any[];
  };
}

export const UserCard = ({ user }: Props) => {
  const [showCompetition, setShowCompetition] = useState(false);

  return (
    <>
      <motion.div
        className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-4">
          <img 
            src={user.picture} 
            alt={user.name} 
            className="w-16 h-16 rounded-full border-2 border-gray-700"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              {user.name}
              {user.badgeLevel === 'gold' && <Award className="w-5 h-5 text-yellow-400" />}
            </h3>
            <p className="text-gray-300 flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              {user.waterSaved.toLocaleString()}L saved
            </p>
            <div className="mt-2">
              <Badge level={user.badgeLevel} />
            </div>
          </div>
          <button
            onClick={() => setShowCompetition(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
          >
            <Trophy className="w-4 h-4" />
            Compete
          </button>
        </div>
        
        {user.competitions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Active Competitions: {user.competitions.length}
            </p>
          </div>
        )}
      </motion.div>

      {showCompetition && (
        <CompetitionModal
          onClose={() => setShowCompetition(false)}
          opponent={{
            id: user.id,
            name: user.name,
            picture: user.picture,
          }}
        />
      )}
    </>
  );
};