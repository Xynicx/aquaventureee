import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface Props {
  message: {
    content: string;
    role: 'user' | 'assistant';
  };
}

export const ChatMessage = ({ message }: Props) => {
  const isBot = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-500' : 'bg-green-500'
      }`}>
        {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isBot ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'
      }`}>
        <p className="text-sm">{message.content}</p>
      </div>
    </motion.div>
  );
};