'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Briefcase, Menu, X } from 'lucide-react';
import { APP_CONFIG, ROUTES } from '../../../../shared/constants/app.constants';
import styles from '../../../../app/landing.module.css';

/**
 * Navbar premium para landing page
 */
export function NavbarLanding() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#caracteristicas', label: 'Características' },
    { href: '#como-funciona', label: 'Cómo Funciona' },
    { href: '#empresa', label: 'Empresa' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-2xl border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-md border-b border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-11 h-11 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/40"
            >
              <Briefcase size={24} />
            </motion.div>
            <span className="text-2xl font-black text-blue-600 group-hover:text-blue-700 transition-colors">
              {APP_CONFIG.NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 font-semibold transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={ROUTES.LOGIN}
              className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className={`${styles.shine} relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300`}
            >
              Registrarse
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200"
          >
            <div className="flex flex-col gap-4 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-blue-600 font-semibold py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                <Link
                  href={ROUTES.LOGIN}
                  className="text-blue-600 hover:text-blue-700 font-bold py-2 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold text-center hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}