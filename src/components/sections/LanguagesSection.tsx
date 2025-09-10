import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe2, MessageCircle, Award } from 'lucide-react';

interface LanguagesSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const LanguagesSection = forwardRef<HTMLDivElement, LanguagesSectionProps>(
  ({ scrollMode }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    const languages = [
      {
        name: 'Sinhala',
        level: 'Native',
        proficiency: 100,
        flag: '🇱🇰',
        description: 'Mother tongue with complete fluency in speaking, reading, and writing. Deep cultural understanding and native-level communication skills.',
        skills: ['Speaking', 'Writing', 'Reading', 'Cultural Context'],
      },
      {
        name: 'English',
        level: 'Fluent',
        proficiency: 97,
        flag: '🇺🇸',
        description: 'Excellent command of English for professional and technical communication. Proficient in business writing and presentations.',
        skills: ['Speaking','Technical Writing', 'Business Communication', 'Presentations', 'Documentation'],
      },
    ];

    const CircularProgress = ({ 
      percentage, 
      delay = 0,
      size = 200 
    }: { 
      percentage: number; 
      delay?: number;
      size?: number;
    }) => {
      const radius = (size - 20) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;

      return (
        <div className={`relative w-${size/4} h-${size/4}`} style={{ width: size, height: size }}>
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size/2}
              cy={size/2}
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx={size/2}
              cy={size/2}
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset } : {}}
              transition={{ duration: 2.5, delay, ease: 'easeOut' }}
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                className="text-4xl font-bold text-gray-900 dark:text-white"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.8, delay: delay + 1, type: 'spring' }}
              >
                {percentage}%
              </motion.div>
              <div className="text-red-500 font-medium text-sm">Proficiency</div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          inViewRef(node);
        }}
        className={`${
          scrollMode === 'horizontal' && window.innerWidth >= 1024
            ? 'w-screen h-screen'
            : 'min-h-screen w-full'
        } flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20`}
      >
        <div className="container mx-auto px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Language <span className="text-red-500">Proficiency</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-red-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Effective communication across cultures and technical domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {languages.map((language, index) => (
              <motion.div
                key={language.name}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="group"
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden"
                  whileHover={{ 
                    y: -15, 
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(220, 38, 38, 0.15)'
                  }}
                  transition={{ duration: 0.4, type: 'spring' }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600" />
                  </div>

                  {/* Flag Icon with Animation */}
                  <motion.div
                    className="text-8xl mb-6 relative z-10"
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: [0, -10, 10, -5, 5, 0],
                      y: -10
                    }}
                    transition={{ duration: 0.8 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    style={{ transitionDelay: `${index * 0.3 + 0.5}s` }}
                  >
                    {language.flag}
                  </motion.div>

                  {/* Language Name */}
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-3 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 + 0.8 }}
                  >
                    {language.name}
                  </motion.h3>
                  
                  {/* Level Badge */}
                  <motion.div
                    className="inline-block px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold mb-8 shadow-lg relative z-10"
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.3 + 1, type: 'spring' }}
                  >
                    {language.level}
                  </motion.div>

                  {/* Circular Progress */}
                  <div className="flex justify-center mb-8 relative z-10">
                    <CircularProgress 
                      percentage={language.proficiency} 
                      delay={index * 0.5 + 1.2} 
                      size={180}
                    />
                  </div>

                  {/* Description */}
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.3 + 1.5 }}
                  >
                    {language.description}
                  </motion.p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6 relative z-10">
                    {language.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.3 + skillIndex * 0.1 + 1.8,
                          type: 'spring'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex justify-center space-x-2 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-red-500"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.3 + i * 0.1 + 2,
                          type: 'spring'
                        }}
                        whileHover={{ scale: 1.5 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Communication Stats */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {[
              { icon: MessageCircle, label: 'Cross-Cultural Communication', value: 'Expert' },
              { icon: Award, label: 'Technical Documentation', value: 'Advanced' },
              { icon: Globe2, label: 'International Collaboration', value: 'Proven' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                style={{ transitionDelay: `${1.8 + index * 0.2}s` }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{stat.label}</h4>
                <p className="text-red-500 font-semibold">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Global Communication Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-center mt-16"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto shadow-2xl"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)'
              }}
              transition={{ duration: 0.8 }}
            >
              <Globe2 className="w-12 h-12 text-white" />
            </motion.div>
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mt-6 font-medium text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 3 }}
            >
              Ready for Global Collaboration
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }
);

LanguagesSection.displayName = 'LanguagesSection';