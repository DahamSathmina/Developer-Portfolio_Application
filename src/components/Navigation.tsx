import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Smartphone, Menu } from 'lucide-react';

interface NavigationProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  scrollMode: 'vertical' | 'horizontal';
  toggleScrollMode: () => void;
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const sections = ['Hero', 'About', 'Projects', 'Experience', 'Skills', 'Languages', 'Contact'];

export function Navigation({ 
  theme, 
  toggleTheme, 
  scrollMode, 
  toggleScrollMode, 
  currentSection, 
  onSectionClick 
}: NavigationProps) {
  return (
    <>
      {/* Top Navigation Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/10 dark:bg-black/20 backdrop-blur-lg border-b border-white/20 dark:border-gray-700/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-red-500">O</span>DS {/* Site Header Nav Title */}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => onSectionClick(index)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  currentSection === index
                    ? 'text-red-500'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section}
                {currentSection === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                    layoutId="activeSection"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Scroll Mode Toggle */}
            <motion.button
              onClick={toggleScrollMode}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 hover:bg-red-500/20 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${scrollMode === 'vertical' ? 'horizontal' : 'vertical'} scroll`}
            >
              {scrollMode === 'vertical' ? (
                <Monitor className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Smartphone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 hover:bg-red-500/20 transition-all duration-300 border border-white/20 dark:border-gray-600/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: theme === 'dark' ? 0 : 180,
                  scale: theme === 'dark' ? 1 : 1.1
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-400 drop-shadow-lg" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600 drop-shadow-lg" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Section Indicators */}
      <motion.div
        className={`fixed z-50 flex ${
          scrollMode === 'horizontal' && window.innerWidth >= 1024
            ? 'right-8 top-1/2 transform -translate-y-1/2 flex-col space-y-3'
            : 'bottom-8 left-1/2 transform -translate-x-1/2 space-x-3'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {sections.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onSectionClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-red-500 scale-125'
                : 'bg-white/30 dark:bg-gray-600/50 hover:bg-red-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </motion.div>
    </>
  );
}