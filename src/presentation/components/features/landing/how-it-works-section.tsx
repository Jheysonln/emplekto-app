// src/presentation/components/features/landing/how-it-works-section.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from '../../../../app/landing.module.css';

/**
 * Section de cómo funciona el proceso
 */
export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: 1,
      title: 'Registro Inteligente',
      description: 'Crea tu perfil profesional en minutos. Nuestro sistema optimiza automáticamente tu información para maximizar las oportunidades.',
    },
    {
      number: 2,
      title: 'Matching Automático',
      description: 'Nuestro algoritmo analiza tu perfil y te presenta únicamente las oportunidades que realmente se ajustan a tu experiencia y objetivos.',
    },
    {
      number: 3,
      title: 'Aplicación Eficiente',
      description: 'Aplica con un solo clic y recibe notificaciones en tiempo real sobre el estado de tus aplicaciones y respuestas de las empresas.',
    },
    {
      number: 4,
      title: 'Contratación Exitosa',
      description: 'Comunícate directamente con reclutadores, programa entrevistas y negocia ofertas a través de nuestra plataforma segura.',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-32 bg-white relative" id="como-funciona">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-white/90 backdrop-blur-md text-blue-600 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-blue-600/30">
            Proceso Simplificado
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
            Cómo funciona EmplekTo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Un proceso optimizado de 4 pasos que revoluciona la experiencia de reclutamiento
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <ProcessStep 
              key={index} 
              step={step} 
              index={index}
              variants={itemVariants}
              isLast={index === steps.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ProcessStepProps {
  step: {
    number: number;
    title: string;
    description: string;
  };
  index: number;
  variants: any;
  isLast: boolean;
}

function ProcessStep({ step, index, variants, isLast }: ProcessStepProps) {
  return (
    <motion.div
      variants={variants}
      className="text-center relative"
    >
      {/* Connector Line (hidden on mobile and last item) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-full w-8 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 z-[-1] rounded-full" />
      )}

      {/* Step Number */}
      <motion.div
        whileHover={{ 
          scale: 1.1,
          boxShadow: '0 0 40px rgba(37, 99, 235, 0.6)'
        }}
        transition={{ duration: 0.3 }}
        className={`${styles.pulse} relative w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-8 shadow-lg shadow-blue-500/40`}
      >
        <span className="relative z-10">{step.number}</span>
        <div className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 animate-pulse" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-black text-gray-900 mb-6">
        {step.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-lg">
        {step.description}
      </p>
    </motion.div>
  );
}