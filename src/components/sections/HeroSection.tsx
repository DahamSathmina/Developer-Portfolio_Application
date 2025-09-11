import React, { forwardRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Linkedin, Github, Globe, Download } from 'lucide-react';

interface HeroSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ scrollMode }, ref) => {
    const [displayText, setDisplayText] = useState('');
    const [currentPhrase, setCurrentPhrase] = useState(0);
    
    const phrases = [
      'Entrepreneur & Tech Enthusiast',
      'Software Engineer',
      'DevOps Specialist',
      'Programmer',
      'Full-Stack Engineer',
      'Mobile App Developer',
      'Problem Solver & Innovator',
      'Content Creator'
    ];

    useEffect(() => {
      let index = 0;
      const currentText = phrases[currentPhrase];
      
      const typeWriter = () => {
        if (index < currentText.length) {
          setDisplayText(currentText.slice(0, index + 1));
          index++;
          setTimeout(typeWriter, 100);
        } else {
          setTimeout(() => {
            // Erase text
            const eraseText = () => {
              if (index > 0) {
                setDisplayText(currentText.slice(0, index - 1));
                index--;
                setTimeout(eraseText, 50);
              } else {
                setCurrentPhrase((prev) => (prev + 1) % phrases.length);
              }
            };
            eraseText();
          }, 2000);
        }
      };

      typeWriter();
    }, [currentPhrase]);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.3,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 100, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
      },
    };

    const glitchVariants = {
      initial: { x: 0, y: 0 },
      glitch: {
        x: [0, -2, 2, 0],
        y: [0, 2, -2, 0],
        transition: { duration: 0.2, repeat: 2 }
      }
    };

    return (
      <div
        ref={ref}
        className={`${
          scrollMode === 'horizontal' && window.innerWidth >= 1024
            ? 'w-screen h-screen'
            : 'min-h-screen w-full'
        } flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 dark:from-black dark:via-red-900/30 dark:to-black overflow-hidden`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="text-center z-10 px-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Name with Glitch Effect */}
          <motion.div
            className="overflow-hidden mb-4"
            variants={itemVariants}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-500 to-red-600 leading-none"
              style={{
                fontFamily: '"Orbitron", "Inter", sans-serif',
                textShadow: '0 0 30px rgba(220, 38, 38, 0.5)',
              }}
              variants={glitchVariants}
              initial="initial"
              whileHover="glitch"
            >
              DAHAM
            </motion.h1>
          </motion.div>

          <motion.div
            className="overflow-hidden mb-8"
            variants={itemVariants}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none"
              style={{
                fontFamily: '"Orbitron", "Inter", sans-serif',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
              }}
              variants={glitchVariants}
              initial="initial"
              whileHover="glitch"
            >
              SATHMIN
            </motion.h1>
          </motion.div>

          {/* Animated Tagline */}
          <motion.div
            className="h-16 mb-12 flex items-center justify-center"
            variants={itemVariants}
          >
            <span
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light tracking-widest"
              style={{ fontFamily: '"Space Mono", "Fira Code", monospace' }}
            >
              {displayText}
              <motion.span
                className="inline-block w-1 h-8 bg-red-500 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            variants={itemVariants}
          >
            {[
              { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
              { icon: Github, href: 'https://github.com/DahamSathmina', label: 'GitHub', color: 'hover:text-gray-400' },
              { icon: Globe, href: '#', label: 'WebSite', color: 'hover:text-green-400' },
            ].map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                className={`group p-4 rounded-full bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-300 ${color}`}
                whileHover={{ 
                  scale: 1.2, 
                  rotateZ: [0, -10, 10, 0],
                  boxShadow: '0 0 25px rgba(220, 38, 38, 0.4)'
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-6 h-6 text-red-400 group-hover:text-white transition-colors duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
              }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>VIEW MY WORK</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                </motion.div>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              className="group relative px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.2)',
              }}
              whileTap={{ scale: 0.95 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                e.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
              }}
            >
              <span className="relative z-10 flex items-center space-x-2 group-hover:text-white transition-colors duration-300">
                <Download className="w-5 h-5" />
                <span>DOWNLOAD CV</span>
              </span>
              <motion.div
                className="absolute inset-0 bg-red-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {scrollMode === 'vertical' && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <ChevronDown className="w-8 h-8 text-red-400" />
          </motion.div>
        )}
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';