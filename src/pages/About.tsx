import { Droplets, Heart, Shield, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">About Aquaventure</h1>
        <p className="text-xl text-blue-200">Join the movement to protect our planet's most precious resource</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <Droplets className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Track Usage</h3>
          <p className="text-blue-200">Monitor your daily water consumption and see your impact</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <Users className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Compete & Connect</h3>
          <p className="text-blue-200">Challenge friends and join a community of water conservators</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <Shield className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Earn Badges</h3>
          <p className="text-blue-200">Get recognized for your conservation achievements</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
          <Heart className="w-12 h-12 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Make an Impact</h3>
          <p className="text-blue-200">Help preserve water resources for future generations</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-blue-200 mb-4">
          Aquaventure is dedicated to making water conservation engaging and meaningful. We believe that small, daily actions can lead to significant environmental impact when we work together.
        </p>
        <p className="text-blue-200">
          Through gamification and social connection, we're building a community of conscious consumers who understand the value of water and are committed to its preservation.
        </p>
      </div>
    </div>
  );
};