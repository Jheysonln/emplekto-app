'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Rocket, Calendar } from 'lucide-react';
import { ROUTES } from '../../../../shared/constants/app.constants';
import styles from '../../../../app/landing.module.css';

/**
 * Call to Action section
 */
export function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative bg-white/90 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/30 overflow-hidden"
        >
          {/* Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500" />

          {/* Content */}
          <div className="text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
              ¿Listo para transformar tu carrera?
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto">
              Únete a miles de profesionales que ya están aprovechando las mejores 
              oportunidades laborales. Acceso beta gratuito por tiempo limitado.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link
                href={ROUTES.REGISTER}
                className={`${styles.shine} relative overflow-hidden inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300`}
              >
                <Rocket size={20} />
                Comenzar Gratis
              </Link>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                <Calendar size={20} />
                Agendar Demo
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}