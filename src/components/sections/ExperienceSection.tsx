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
      threshold: 0.3,
      triggerOnce: true,
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

    const isHorizontalLayout = scrollMode === 'horizontal' && window.innerWidth >= 1024;

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          inViewRef(node);
        }}
        className={`${
          isHorizontalLayout ? 'w-screen h-screen' : 'min-h-screen w-full'
        } flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 overflow-hidden`}
      >
        <div className="container mx-auto px-8 max-w-7xl">
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

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className={`absolute ${
                isHorizontalLayout 
                  ? 'top-1/2 left-0 h-1 w-full bg-gradient-to-r' 
                  : 'left-8 top-0 w-1 h-full bg-gradient-to-b'
              } from-red-500 via-red-400 to-red-300 rounded-full`}
              initial={isHorizontalLayout ? { width: 0 } : { height: 0 }}
              animate={inView ? (isHorizontalLayout ? { width: '100%' } : { height: '100%' }) : {}}
              transition={{ duration: 2, delay: 0.5 }}
            />

            <div className={`${
              isHorizontalLayout 
                ? 'flex items-center space-x-16 overflow-x-auto pb-8' 
                : 'space-y-16'
            }`}>
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, [isHorizontalLayout ? 'y' : 'x']: isHorizontalLayout ? 50 : -50 }}
                  animate={inView ? { opacity: 1, [isHorizontalLayout ? 'y' : 'x']: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex ${
                    isHorizontalLayout 
                      ? 'flex-col items-center min-w-[400px]' 
                      : 'items-start'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-xl ${
                      isHorizontalLayout ? 'mb-8' : 'mr-8'
                    }`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    style={{ transitionDelay: `${index * 0.2 + 0.8}s` }}
                  >
                    <Briefcase className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Experience Card */}
                  <motion.div
                    className={`flex-1 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 ${
                      isHorizontalLayout ? 'w-full' : ''
                    }`}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {exp.role}
                          </h3>
                          <p className="text-xl text-red-500 font-semibold mb-3">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="font-medium">{exp.period}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.2 + techIndex * 0.05 + 1 
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <div className="flex items-center mb-4">
                        <Award className="w-5 h-5 text-red-500 mr-2" />
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Key Achievements
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.2 + achIndex * 0.1 + 1.2 
                            }}
                            className="flex items-start group"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-red-500 rounded-full mt-2.5 mr-4 flex-shrink-0"
                              whileHover={{ scale: 1.5 }}
                            />
                            <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                              {achievement}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
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