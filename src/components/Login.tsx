import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Droplets } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';

const waterTips = [
  "Turn off the tap while brushing your teeth to save up to 8 gallons per day",
  "Fix leaky faucets - one drop per second wastes 3,000 gallons per year",
  "Take shorter showers - every minute you save can conserve 2.5 gallons",
  "Use a rain barrel to collect water for your garden",
  "Install water-efficient fixtures to reduce consumption by 30%",
  "Water your plants early morning or late evening to reduce evaporation",
  "Use drought-resistant plants in your garden",
  "Run full loads of laundry to maximize water efficiency"
];

export const Login = () => {
  const [currentTip, setCurrentTip] = useState(0);
  const navigate = useNavigate();
  const { setToken, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % waterTips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSuccess = (credentialResponse: any) => {
    setToken(credentialResponse.credential);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            src="https://asset.cloudinary.com/dlbqdjxcy/6afb6f88fa7263bf6d19ee4ba12aab98"
            alt="Aquaventure Logo"
            className="w-32 h-32 mb-4"
          />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-white mb-2 flex items-center gap-2"
          >
            <Droplets className="w-8 h-8" />
            Aquaventure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-100 text-center"
          >
            Join the movement to conserve water
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log('Login Failed')}
            theme="filled_blue"
            shape="pill"
            size="large"
            text="continue_with"
            useOneTap
          />
        </motion.div>

        <div className="text-center">
          <p className="text-sm text-blue-100 mb-2">Did you know?</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg"
            >
              {waterTips[currentTip]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};