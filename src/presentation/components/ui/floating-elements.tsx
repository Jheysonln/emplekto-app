'use client';

import { Briefcase, Users, TrendingUp, Handshake, Target, Rocket, Star } from 'lucide-react';
import styles from '../../../app/landing.module.css';

/**
 * Elementos flotantes decorativos
 */
export function FloatingElements() {
  const icons = [
    Briefcase,
    Users, 
    TrendingUp,
    Handshake,
    Target,
    Rocket,
    Star,
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
      {icons.map((Icon, index) => (
        <Icon
          key={index}
          className={`${styles.floatingIcon} text-blue-600 opacity-8 text-3xl`}
          size={28}
        />
      ))}
    </div>
  );
}