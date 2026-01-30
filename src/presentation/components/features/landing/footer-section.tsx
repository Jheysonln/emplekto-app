'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { APP_CONFIG } from '../../../../shared/constants/app.constants';
import styles from '../../../../app/landing.module.css';

/**
 * Footer premium con links y redes sociales
 */
export function FooterSection() {
  const footerSections = [
    {
      title: 'Para Profesionales',
      links: [
        { label: 'Buscar Empleos', href: '#' },
        { label: 'Crear Perfil', href: '#' },
        { label: 'Guía de Carrera', href: '#' },
        { label: 'Recursos Profesionales', href: '#' },
        { label: 'Calculadora Salarial', href: '#' },
      ],
    },
    {
      title: 'Para Empresas',
      links: [
        { label: 'Publicar Empleos', href: '#' },
        { label: 'Buscar Talento', href: '#' },
        { label: 'Planes Empresariales', href: '#' },
        { label: 'Herramientas HR', href: '#' },
        { label: 'API Developers', href: '#' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Prensa', href: '#' },
        { label: 'Carreras', href: '#' },
        { label: 'Contacto', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-20 relative overflow-hidden" id="empresa">
      {/* Background Pattern */}
      <div className={`absolute inset-0 ${styles.footerPattern} opacity-5`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h4 className="text-2xl font-black text-white mb-6">
              {APP_CONFIG.NAME}
            </h4>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Revolucionamos el mercado laboral conectando talento excepcional con empresas 
              innovadoras a través de tecnología de vanguardia y procesos optimizados.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ 
                    y: -3,
                    backgroundColor: '#3b82f6',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-xl font-bold text-white mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 {APP_CONFIG.NAME}. Todos los derechos reservados. |{' '}
            <Link 
              href="#" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Política de Privacidad
            </Link>{' '}
            |{' '}
            <Link 
              href="#" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Términos de Servicio
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}