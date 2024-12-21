import { useEffect } from 'react';
import '../styles/water-background.css';

export const WaterBackground = () => {
  useEffect(() => {
    const createBubbles = () => {
      const container = document.querySelector('.water-background');
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = `${Math.random() * 50 + 10}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(bubble);
      }
    };

    createBubbles();
  }, []);

  return (
    <>
      <div className="water-background">
        <div className="wave" />
        <div className="wave" style={{ animationDelay: '-2s' }} />
        <div className="wave" style={{ animationDelay: '-4s' }} />
        <div className="light-beam" />
        <div className="light-beam" style={{ animationDelay: '-4s' }} />
      </div>
    </>
  );
};