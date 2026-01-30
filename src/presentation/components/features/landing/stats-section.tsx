'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from '../../../../app/landing.module.css';

/**
 * Section de estadísticas con animaciones
 */
export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { number: 2500, label: 'Empleos Publicados', suffix: '+' },
    { number: 850, label: 'Empresas Activas', suffix: '+' },
    { number: 5000, label: 'Profesionales Registrados', suffix: '+' },
    { number: 94, label: 'Tasa de Éxito', suffix: '%' },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500" />
      <div className={`absolute inset-0 ${styles.statsPattern} opacity-10`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" ref={ref}>
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StatsCardProps {
  stat: {
    number: number;
    label: string;
    suffix: string;
  };
  index: number;
  isInView: boolean;
}

function StatsCard({ stat, index, isInView }: StatsCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const increment = stat.number / 80;
        const counter = setInterval(() => {
          setCount((prevCount) => {
            const newCount = prevCount + increment;
            if (newCount >= stat.number) {
              clearInterval(counter);
              return stat.number;
            }
            return newCount;
          });
        }, 25);
      }, index * 200);

      return () => clearTimeout(timer);
    }
  }, [isInView, stat.number, index]);

  const formatNumber = (num: number) => {
    if (stat.suffix === '%') {
      return Math.floor(num) + '%';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K' + stat.suffix;
    }
    return Math.floor(num) + stat.suffix;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.2)' 
      }}
      className="text-center text-white p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300 hover:shadow-2xl"
    >
      <motion.span
        className="block text-5xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg"
        style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
      >
        {formatNumber(count)}
      </motion.span>
      <span className="text-white/90 font-semibold text-lg">
        {stat.label}
      </span>
    </motion.div>
  );
}