import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Target, Heart, Award, Users } from 'lucide-react';

interface AboutSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const AboutSection = forwardRef<HTMLDivElement, AboutSectionProps>(
  ({ scrollMode }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    const skills = [
      { name: 'Problem Solving', value: 97, color: 'from-red-500 to-red-600' },
      { name: 'Code Quality', value: 94, color: 'from-red-500 to-red-600' },
      { name: 'Team Leadership', value: 85, color: 'from-red-400 to-red-600' },
      { name: 'Innovation', value: 89, color: 'from-red-500 to-red-600' },
    ];

    const achievements = [
      { icon: Award, number: '200+', label: 'Projects Completed' },
      { icon: Users, number: '130+', label: 'Happy Clients' },
      { icon: Code, number: '5+', label: 'Years Experience' },
    ];

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
        <div className="container mx-auto px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-red-500">Me</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-red-500 mx-auto"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-6"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Code className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Passionate Developer</h3>
                      <p className="text-red-500 font-medium">Softwere Engineer</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    I'm a dedicated software Developer with a passion for creating innovative solutions 
                    that solve real-world problems. With expertise across multiple programming languages 
                    and platforms, I bring ideas to life through clean, efficient code and thoughtful design.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Zap, title: 'Fast Learner', desc: 'Quick to adapt to new technologies' },
                      { icon: Target, title: 'Goal Oriented', desc: 'Focused on delivering results' },
                    ].map(({ icon: Icon, title, desc }) => (
                      <motion.div
                        key={title}
                        className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-6 h-6 text-red-500 mb-2" />
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Skills & Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Core Strengths */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Core Strengths</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        <motion.span 
                          className="font-bold text-red-500"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        >
                          {skill.value}%
                        </motion.span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`bg-gradient-to-r ${skill.color} h-3 rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.value}%` } : {}}
                          transition={{ duration: 1.5, delay: 0.6 + index * 0.2, ease: 'easeOut' }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                              duration: 2,
                              delay: 1.2 + index * 0.2,
                              ease: 'easeInOut',
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Philosophy */}
              <motion.div
                className="bg-gradient-to-r from-red-500 to-red-600 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10">
                  <Heart className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-bold mb-3">My Philosophy</h3>
                  <p className="leading-relaxed">
                    "Great software isn't just about code—it's about understanding users, 
                    solving problems creatively, and building experiences that make a difference."
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {achievements.map(({ icon: Icon, number, label }, index) => (
              <motion.div
                key={label}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                style={{ transitionDelay: `${0.8 + index * 0.2}s` }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h4 
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1, type: 'spring' }}
                >
                  {number}
                </motion.h4>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }
);

AboutSection.displayName = 'AboutSection';