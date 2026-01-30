// src/presentation/components/layouts/auth-layout.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, ArrowLeft, Sparkles, Users, TrendingUp, Shield } from 'lucide-react';
import { APP_CONFIG } from '../../../shared/constants/app.constants';
import styles from '../../../app/landing.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

/**
 * Layout premium para páginas de autenticación
 */
export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const features = [
    {
      icon: Users,
      title: '5,000+ Profesionales',
      description: 'Conectados en nuestra plataforma'
    },
    {
      icon: TrendingUp,
      title: '94% Tasa de Éxito',
      description: 'En procesos de reclutamiento'
    },
    {
      icon: Shield,
      title: 'Completamente Seguro',
      description: 'Datos protegidos y verificados'
    }
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Premium Background */}
      <div className={`${styles.premiumBg} fixed inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50`} />
      
      {/* Animated Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`${styles.orb} w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl absolute -top-48 -left-48`} />
        <div className={`${styles.orb} w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl absolute -bottom-40 -right-40`} />
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="mx-auto w-full max-w-xl">
          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Volver al inicio
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/40"
              >
                <Briefcase size={24} />
              </motion.div>
              <span className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                {APP_CONFIG.NAME}
              </span>
            </Link>

            {/* Title & Subtitle */}
            {title && (
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 font-medium">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50 relative overflow-hidden"
          >
            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />
            
            {/* Shine Effect */}
            <div className={`${styles.shine} absolute inset-0 pointer-events-none`} />
            
            <div className="relative z-10">
              {children}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Premium Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500" />
        
        {/* Pattern Overlay */}
        <div className={`absolute inset-0 ${styles.headerPattern} opacity-10`} />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center p-16 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="text-yellow-300" size={32} />
              <h2 className="text-4xl font-black">
                Únete a la Revolución
              </h2>
              <Sparkles className="text-yellow-300" size={32} />
            </div>
            <p className="text-xl opacity-90 leading-relaxed max-w-md">
              La plataforma de empleo más avanzada que conecta talento excepcional 
              con oportunidades extraordinarias.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-8 w-full max-w-md">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Elements */}
          <motion.div
            className={`${styles.floatCard} absolute top-20 right-20 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20`}
          >
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp size={16} className="text-green-300" />
              <span className="font-semibold">+127 nuevos empleos hoy</span>
            </div>
          </motion.div>

          <motion.div
            className={`${styles.floatCard} absolute bottom-32 left-16 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20`}
            style={{ animationDelay: '2s' }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-blue-300" />
              <span className="font-semibold">234 profesionales activos</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}