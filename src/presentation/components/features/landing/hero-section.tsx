'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Building, Rocket, Users, Send, TrendingUp, Clock, ChartLine } from 'lucide-react';
import { APP_CONFIG, ROUTES } from '../../../../shared/constants/app.constants';
import styles from '../../../../app/landing.module.css';

/**
 * Hero section premium con dispositivos mockup
 */
export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="min-h-screen flex items-center pt-32 pb-16 px-6 relative" id="inicio">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className={`${styles.glow} inline-flex items-center gap-3 bg-blue-600/10 border border-blue-600/30 text-blue-600 px-6 py-3 rounded-full text-sm font-bold backdrop-blur-md`}
            >
              <Rocket size={18} />
              Plataforma en Beta - Acceso Anticipado
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight"
            >
              Conectamos{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Talento
              </span>{' '}
              con{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Oportunidades
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl font-medium"
            >
              La plataforma de reclutamiento más avanzada que revoluciona la forma en que
              profesionales y empresas se encuentran. Tecnología, eficiencia y resultados
              garantizados.
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href={ROUTES.REGISTER}
                className={`${styles.shine} relative overflow-hidden inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300`}
              >
                <Search size={20} />
                Explorar Empleos
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                <Building size={20} />
                Para Empresas
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-8 pt-8"
            >
              {[
                { number: '2,500+', label: 'Empleos Activos' },
                { number: '850+', label: 'Empresas' },
                { number: '5,000+', label: 'Profesionales' },
              ].map((stat, index) => (
                <div key={index} className="text-left">
                  <span className="block text-3xl font-black text-blue-600">
                    {stat.number}
                  </span>
                  <span className="text-gray-500 font-semibold text-sm">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              {/* Desktop Mockup */}
              <motion.div
                whileHover={{
                  rotateY: -4,
                  rotateX: 2,
                  scale: 1.02,
                }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transform perspective-1000 hover:shadow-blue-500/20"
                style={{
                  transform: 'perspective(1000px) rotateY(-8deg) rotateX(5deg)',
                }}
              >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white overflow-hidden">
                  <div className={`absolute inset-0 ${styles.headerPattern} opacity-10`} />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2">Panel de Reclutamiento</h3>
                    <p className="opacity-90 text-lg">Métricas en tiempo real</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 bg-gradient-to-b from-white to-gray-50">
                  {[
                    { icon: Users, label: 'Candidatos Activos', value: '1,247' },
                    { icon: Send, label: 'Aplicaciones Hoy', value: '89' },
                    { icon: TrendingUp, label: 'Tasa de Éxito', value: '94%' },
                    { icon: Clock, label: 'Tiempo Promedio', value: '12 días' },
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 8, backgroundColor: 'rgba(37, 99, 235, 0.05)' }}
                      className="flex justify-between items-center py-6 border-b border-gray-200 last:border-b-0 transition-all duration-300 rounded-lg px-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <metric.icon size={20} />
                        </div>
                        <span className="text-gray-600 font-semibold text-lg">
                          {metric.label}
                        </span>
                      </div>
                      <span className="text-2xl font-black text-gray-900 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                        {metric.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile Mockup */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-8 -right-8 w-48 bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-300 transform rotate-12 z-20"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white text-center">
                  <div className="text-sm font-bold">EmplekTo Mobile</div>
                </div>
                <div className="p-4">
                  {[
                    { label: 'Nuevos empleos', value: '24' },
                    { label: 'Aplicaciones', value: '12' },
                    { label: 'Entrevistas', value: '3' },
                    { label: 'Mensajes', value: '8' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-3 border-b border-gray-200 last:border-b-0 text-sm"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-bold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                className={`${styles.floatCard} absolute -top-4 -left-12 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30`}
              >
                <div className="flex items-center gap-3 text-sm">
                  <ChartLine className="text-green-500" size={20} />
                  <span className="font-bold text-gray-800">+24% Este Mes</span>
                </div>
              </motion.div>

              <motion.div
                className={`${styles.floatCard} absolute bottom-4 right-48 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30`}
                style={{ animationDelay: '3s' }}
              >
                <div className="flex items-center gap-3 text-sm">
                  <Users className="text-blue-600" size={20} />
                  <span className="font-bold text-gray-800">156 Nuevos</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}