import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Briefcase, Award, TrendingUp } from 'lucide-react';

interface ExperienceSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const ExperienceSection = forwardRef<HTMLDivElement, ExperienceSectionProps>(
  ({ scrollMode }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.1,
      triggerOnce: false,
    });

    const experiences = [
      {
        role: 'Senior Software Engineer',
        company: 'TechCorp Solutions',
        period: '2022 - Present',
        location: 'Remote',
        description: 'Leading development of scalable web applications using modern technologies. Mentoring junior developers and architecting system solutions for enterprise clients.',
        achievements: [
          'Led team of 5 developers on microservices architecture migration',
          'Reduced application load time by 60% through optimization',
          'Implemented CI/CD pipelines increasing deployment frequency by 400%',
          'Mentored 8 junior developers, with 100% promotion rate',
        ],
        color: 'from-red-500 to-red-600',
        technologies: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes'],
      },
      {
        role: 'Full Stack Developer',
        company: 'StartupVenture Inc.',
        period: '2020 - 2022',
        location: 'San Francisco, CA',
        description: 'Developed and maintained multiple client applications using React, Node.js, and Python. Collaborated with design teams to implement pixel-perfect UIs.',
        achievements: [
          'Built 3 successful web applications from scratch',
          'Integrated 15+ third-party APIs and payment systems',
          'Maintained 99.9% uptime for production systems',
          'Reduced bug reports by 70% through comprehensive testing',
        ],
        color: 'from-red-400 to-red-500',
        technologies: ['React', 'Python', 'PostgreSQL', 'Redis', 'Stripe'],
      },
      {
        role: 'Software Developer',
        company: 'Digital Innovations Ltd.',
        period: '2019 - 2020',
        location: 'New York, NY',
        description: 'Focused on mobile app development using Flutter and native technologies. Worked closely with product managers to define feature requirements.',
        achievements: [
          'Published 2 mobile apps with 50K+ downloads each',
          'Optimized app performance resulting in 4.8+ star ratings',
          'Implemented real-time chat functionality for 10K+ users',
          'Contributed to open-source Flutter packages',
        ],
        color: 'from-red-300 to-red-400',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Swift', 'Kotlin'],
      },
      {
        role: 'Junior Developer',
        company: 'CodeCraft Studio',
        period: '2018 - 2019',
        location: 'Remote',
        description: 'Started career developing web applications and learning industry best practices. Contributed to various client projects and internal tools.',
        achievements: [
          'Completed 20+ client projects successfully',
          'Learned 5 new programming languages in first year',
          'Improved code review process efficiency by 40%',
          'Received "Rising Star" award for exceptional growth',
        ],
        color: 'from-red-200 to-red-300',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
      },
    ];

    const isHorizontal = scrollMode === 'horizontal' && window.innerWidth >= 1024;

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          inViewRef(node);
        }}
        className={`${
          isHorizontal ? 'w-screen h-screen' : 'min-h-screen w-full'
        } flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20`}
        style={{ minHeight: isHorizontal ? '100vh' : 'auto' }}
      >
        <div className="container mx-auto px-8 max-w-7xl h-full flex flex-col justify-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional <span className="text-red-500">Journey</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-red-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A timeline of growth, innovation, and impactful contributions
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative flex-1 flex items-center justify-center">
            {isHorizontal ? (
              // Horizontal Timeline for Desktop
              <div className="relative w-full max-w-6xl">
                {/* Horizontal Timeline Line */}
                <motion.div
                  className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-300 rounded-full transform -translate-y-1/2"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Experience Items */}
                <div className="flex justify-between items-center relative z-10">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className="flex flex-col items-center w-64"
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-xl mb-6 z-20`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        style={{ transitionDelay: `${index * 0.2 + 0.8}s` }}
                      >
                        <Briefcase className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Experience Card */}
                      <motion.div
                        className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-h-96 overflow-y-auto"
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-red-500 font-semibold mb-2">
                          {exp.company}
                        </p>
                        
                        <div className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Achievements */}
                        <div>
                          <div className="flex items-center mb-3">
                            <Award className="w-4 h-4 text-red-500 mr-2" />
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Key Achievements
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {exp.achievements.slice(0, 3).map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300 text-sm">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              // Vertical Timeline for Mobile/Tablet
              <div className="relative w-full max-w-4xl">
                {/* Vertical Timeline Line */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-red-500 via-red-400 to-red-300 rounded-full"
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${experiences.length * 300}px` } : {}}
                  transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Experience Items */}
                <div className="space-y-20">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-xl z-20`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        style={{ transitionDelay: `${index * 0.2 + 0.8}s` }}
                      >
                        <Briefcase className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Experience Card */}
                      <motion.div
                        className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 flex-1 max-w-lg ${
                          index % 2 === 0 ? 'mr-8' : 'ml-8'
                        }`}
                        whileHover={{ y: -10, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {exp.role}
                        </h3>
                        <p className="text-lg text-red-500 font-semibold mb-2">
                          {exp.company}
                        </p>
                        
                        <div className="flex flex-col space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Achievements */}
                        <div>
                          <div className="flex items-center mb-3">
                            <Award className="w-4 h-4 text-red-500 mr-2" />
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                              Key Achievements
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-300 text-sm">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Career Growth Indicator */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-semibold">5+ Years of Continuous Growth</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
);

ExperienceSection.displayName = 'ExperienceSection';