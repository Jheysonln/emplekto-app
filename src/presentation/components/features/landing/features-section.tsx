// src/presentation/components/features/landing/features-section.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Search, 
  Shield, 
  Zap, 
  BarChart3, 
  MessageCircle, 
  Smartphone 
} from 'lucide-react';

/**
 * Section de características principales
 */
export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Search,
      title: 'Búsqueda Inteligente',
      description: 'Algoritmos avanzados de matching que conectan automáticamente candidatos ideales con las oportunidades más relevantes según skills y experiencia.',
    },
    {
      icon: Shield,
      title: 'Verificación Empresarial',
      description: 'Todas las empresas pasan por un riguroso proceso de verificación que garantiza ofertas laborales legítimas y ambientes de trabajo seguros.',
    },
    {
      icon: Zap,
      title: 'Aplicación Express',
      description: 'Aplica a múltiples empleos con un solo clic. Tu perfil optimizado se envía automáticamente, eliminando formularios repetitivos.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Profesionales',
      description: 'Dashboard completo con métricas de rendimiento, estadísticas de aplicaciones y insights del mercado laboral en tiempo real.',
    },
    {
      icon: MessageCircle,
      title: 'Comunicación Directa',
      description: 'Sistema de mensajería integrado que facilita la comunicación fluida entre reclutadores y candidatos durante todo el proceso.',
    },
    {
      icon: Smartphone,
      title: 'Experiencia Móvil',
      description: 'Diseño responsive optimizado para todos los dispositivos. Gestiona tu carrera profesional desde cualquier lugar y momento.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-gray-100 relative" id="caracteristicas">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-white/90 backdrop-blur-md text-blue-600 px-6 py-3 rounded-full text-sm font-bold margin-bottom-6 border border-blue-600/30">
            Características Principales
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 mt-6">
            ¿Por qué elegir EmplekTo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Tecnología de vanguardia diseñada para optimizar cada paso del proceso de reclutamiento
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: {
    icon: any;
    title: string;
    description: string;
  };
  index: number;
  variants: any;
}

function FeatureCard({ feature, index, variants }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={variants}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group bg-white/95 backdrop-blur-md border-2 border-blue-600/15 rounded-2xl p-8 transition-all duration-400 hover:border-blue-600/40 hover:bg-white/98 hover:shadow-2xl relative overflow-hidden"
    >
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
      
      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 15 }}
          transition={{ duration: 0.3 }}
          className="w-18 h-18 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-500/40 group-hover:shadow-xl group-hover:shadow-blue-500/60"
        >
          <Icon size={28} />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-black text-gray-900 mb-6 group-hover:text-blue-600 transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}