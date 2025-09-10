import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Smartphone, Database, Cloud, Zap } from 'lucide-react';

interface SkillsSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const SkillsSection = forwardRef<HTMLDivElement, SkillsSectionProps>(
  ({ scrollMode }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    const skillCategories = [
      {
        title: 'Programming Languages',
        icon: Code,
        skills: [
          { name: 'Python', level: 98, color: '#3776ab' },
          { name: 'JavaScript', level: 90, color: '#f7df1e' },
          { name: 'C++', level: 88, color: '#00599c' },
          { name: 'Java', level: 85, color: '#ed8b00' },
          { name: 'C#', level: 91, color: '#239120' },
          { name: 'Swift', level: 89, color: '#fa7343' },
          { name: 'Kotlin', level: 90, color: '#7f52ff' },
          { name: 'Go', level: 77, color: '#00add8' },
          { name: 'SQL', level: 85, color: '#336791' },
        ],
        gradient: 'from-red-500 to-red-600',
      },
      {
        title: 'Web Development',
        icon: Globe,
        skills: [
          { name: 'HTML5', level: 95, color: '#e34f26' },
          { name: 'CSS3', level: 90, color: '#1572b6' },
          { name: 'JavaScript', level: 88, color: '#f7df1e' },
          { name: 'React', level: 85, color: '#61dafb' },
          { name: 'Node.js', level: 82, color: '#339933' },
          { name: 'TypeScript', level: 80, color: '#3178c6' },
        ],
        gradient: 'from-red-400 to-red-500',
      },
      {
        title: 'Mobile & Cross-Platform',
        icon: Smartphone,
        skills: [
          { name: 'Flutter', level: 90, color: '#02569b' },
          { name: 'Dart', level: 88, color: '#0175c2' },
          { name: 'React Native', level: 75, color: '#61dafb' },
          { name: 'iOS Development', level: 88, color: '#000000' },
          { name: 'Android', level: 90, color: '#3ddc84' },
        ],
        gradient: 'from-red-500 to-red-600',
      },
    ];

    const CircularProgress = ({ 
      skill, 
      delay = 0, 
      categoryIndex 
    }: { 
      skill: { name: string; level: number; color: string }; 
      delay?: number;
      categoryIndex: number;
    }) => {
      const radius = 35;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (skill.level / 100) * circumference;

      return (
        <motion.div
          className="relative w-24 h-24 group"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay, type: 'spring' }}
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx="40"
              cy="40"
              r={radius}
              stroke={skill.color}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={inView ? { strokeDashoffset } : {}}
              transition={{ duration: 2, delay: delay + 0.5, ease: 'easeOut' }}
              className="drop-shadow-lg"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {skill.level}%
            </div>
          </div>
          
          {/* Skill Name */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {skill.name}
            </span>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ backgroundColor: skill.color, filter: 'blur(10px)' }}
          />
        </motion.div>
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
        } flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900/10 to-gray-900 dark:from-black dark:via-red-900/20 dark:to-black py-20 overflow-y-auto`}
      >
        <div className="container mx-auto px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Technical <span className="text-red-500">Skills</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-red-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive expertise across multiple technologies and platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-red-500/10 transition-all duration-500"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    style={{ transitionDelay: `${categoryIndex * 0.2 + 0.5}s` }}
                  >
                    <category.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-3 gap-8 justify-items-center">
                  {category.skills.map((skill, skillIndex) => (
                    <CircularProgress
                      key={skill.name}
                      skill={skill}
                      delay={categoryIndex * 0.2 + skillIndex * 0.1 + 0.8}
                      categoryIndex={categoryIndex}
                    />
                  ))}
                </div>

                {/* Category Stats */}
                <motion.div
                  className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 + 1.5 }}
                >
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-red-500" />
                      <span>Proficiency</span>
                    </div>
                    <div className="font-bold text-red-500">
                      {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}% Avg
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Additional Expertise</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Docker', icon: '🐋' },
                { name: 'AWS', icon: '☁️' },
                { name: 'Git', icon: '📝' },
                { name: 'MongoDB', icon: '🍃' },
                { name: 'PostgreSQL', icon: '🐘' },
                { name: 'Redis', icon: '🔴' },
                { name: 'GraphQL', icon: '📊' },
                { name: 'REST APIs', icon: '🔗' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-red-500/20 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="text-lg">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

SkillsSection.displayName = 'SkillsSection';