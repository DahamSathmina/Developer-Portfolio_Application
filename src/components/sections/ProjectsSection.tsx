import React, { forwardRef, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Star, Code, Smartphone, Globe } from 'lucide-react';

interface ProjectsSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const ProjectsSection = forwardRef<HTMLDivElement, ProjectsSectionProps>(
  ({ scrollMode }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const projects = [
      {
        title: 'Neural Network Framework',
        description: 'Advanced machine learning framework built with Python and TensorFlow for deep learning applications',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
        tech: ['Python', 'TensorFlow', 'NumPy', 'Scikit-learn'],
        github: '#',
        demo: '#',
        featured: true,
        category: 'AI/ML',
        icon: Code,
      },
      {
        title: 'Real-time Chat Application',
        description: 'Full-stack real-time messaging platform with Flutter frontend and Node.js backend',
        image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg',
        tech: ['Flutter', 'Dart', 'Node.js', 'Socket.io', 'MongoDB'],
        github: '#',
        demo: '#',
        featured: true,
        category: 'Mobile',
        icon: Smartphone,
      },
      {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution with advanced analytics, payment integration, and admin dashboard',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        tech: ['C#', 'ASP.NET', 'React', 'PostgreSQL', 'Stripe'],
        github: '#',
        demo: '#',
        featured: false,
        category: 'Web',
        icon: Globe,
      },
      {
        title: 'iOS Task Manager',
        description: 'Native iOS productivity app with Core Data persistence and CloudKit synchronization',
        image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg',
        tech: ['Swift', 'SwiftUI', 'Core Data', 'CloudKit'],
        github: '#',
        demo: '#',
        featured: false,
        category: 'Mobile',
        icon: Smartphone,
      },
      {
        title: 'Data Visualization Dashboard',
        description: 'Interactive dashboard for complex data analysis with real-time updates and custom charts',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
        tech: ['JavaScript', 'D3.js', 'React', 'Python', 'FastAPI'],
        github: '#',
        demo: '#',
        featured: false,
        category: 'Web',
        icon: Globe,
      },
      {
        title: 'Blockchain Voting System',
        description: 'Secure and transparent voting system built on blockchain technology with smart contracts',
        image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
        tech: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
        github: '#',
        demo: '#',
        featured: true,
        category: 'Blockchain',
        icon: Code,
      },
    ];

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          inViewRef(node);
          containerRef.current = node;
        }}
        className={`${
          scrollMode === 'horizontal' && window.innerWidth >= 1024
            ? 'w-screen h-screen'
            : 'min-h-screen w-full'
        } flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900/10 to-gray-900 dark:from-black dark:via-red-900/20 dark:to-black py-20 overflow-hidden`}
      >
        <div className="container mx-auto px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured <span className="text-red-500">Projects</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-red-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A showcase of innovative solutions and creative implementations
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative"
                style={{ y: index % 2 === 0 ? y : undefined }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 transform-gpu h-full"
                  whileHover={{
                    y: -15,
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(220, 38, 38, 0.2)',
                  }}
                  transition={{ duration: 0.4, type: 'spring' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div 
                      className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-bold">Featured</span>
                    </motion.div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center space-x-2">
                    <project.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{project.category}</span>
                  </div>

                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <div className="flex space-x-4">
                        <motion.a
                          href={project.github}
                          className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-5 h-5 text-gray-800" />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.1 + techIndex * 0.05 + 0.8 
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-red-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>View All Projects</span>
                <motion.div
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';