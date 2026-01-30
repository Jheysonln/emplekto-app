'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

/**
 * Botón premium de scroll to top
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          whileHover={{ 
            y: -5, 
            scale: 1.1,
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)'
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center z-50 transition-all duration-300 hover:shadow-xl"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}