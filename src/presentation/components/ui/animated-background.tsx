'use client';

import { motion } from 'framer-motion';
import styles from '../../../app/landing.module.css';

/**
 * Background animado premium con orbs flotantes
 */
export function AnimatedBackground() {
  return (
    <>
      {/* Premium Background */}
      <div className={`${styles.premiumBg} bg-gradient-to-b from-gray-50 to-white`} />
      
      {/* Animated Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
      </div>
    </>
  );
}