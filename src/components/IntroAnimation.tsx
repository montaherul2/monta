import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const IntroAnimation: React.FC = () => {
  const { showIntro, setShowIntro } = usePortfolio();
  const [stage, setStage] = useState<'wireframe' | 'expanded' | 'done'>('wireframe');

  useEffect(() => {
    if (!showIntro) return;

    setStage('wireframe');
    const timer1 = setTimeout(() => {
      setStage('expanded');
    }, 750);

    const timer2 = setTimeout(() => {
      setShowIntro(false);
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [showIntro, setShowIntro]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="intro-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b09] text-white"
        onClick={() => setShowIntro(false)}
      >
        <div className="relative flex items-center justify-center cursor-pointer select-none">
          {stage === 'wireframe' ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-7xl md:text-8xl tracking-widest text-[#00df81] font-bold drop-shadow-[0_0_25px_rgba(0,223,129,0.5)] border-2 border-[#00df81]/40 px-8 py-4 rounded-xl"
            >
              M<span className="text-[#34d399]/60">I</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ letterSpacing: '0.1em', opacity: 0, scale: 0.95 }}
              animate={{ letterSpacing: '0.25em', opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-7xl md:text-9xl font-black text-white tracking-widest flex items-center"
            >
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">MONTA</span>
              <span className="text-[#00df81] drop-shadow-[0_0_20px_rgba(0,223,129,0.8)]">.</span>
            </motion.div>
          )}
        </div>

        {/* Ambient subtle glow ring */}
        <div className="absolute w-96 h-96 rounded-full bg-[#00df81]/10 blur-[120px] pointer-events-none" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowIntro(false);
          }}
          className="absolute bottom-10 px-4 py-1.5 text-xs text-[#8ea197] hover:text-[#00df81] transition-colors border border-[#1a2b23] rounded-full bg-[#0d1612]/60 backdrop-blur-sm"
        >
          Skip Intro ↗
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
