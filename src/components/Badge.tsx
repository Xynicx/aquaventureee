interface BadgeProps {
  level: 'bronze' | 'silver' | 'gold' | null;
}

export const Badge = ({ level }: BadgeProps) => {
  if (!level) return null;

  const badges = {
    bronze: {
      color: 'from-amber-700 to-amber-600',
      text: 'Bronze Conservator',
    },
    silver: {
      color: 'from-gray-400 to-gray-300',
      text: 'Silver Protector',
    },
    gold: {
      color: 'from-yellow-500 to-yellow-400',
      text: 'Gold Guardian',
    },
  };

  const badge = badges[level];

  return (
    <div className={`bg-gradient-to-r ${badge.color} px-4 py-2 rounded-full`}>
      <span className="text-white font-semibold">{badge.text}</span>
    </div>
  );
};