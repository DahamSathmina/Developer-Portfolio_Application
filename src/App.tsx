import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from './hooks/useTheme';
import { useScrollMode } from './hooks/useScrollMode';
import { ParticleBackground } from './components/ParticleBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { LanguagesSection } from './components/sections/LanguagesSection';
import { ContactSection } from './components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { theme, toggleTheme } = useTheme();
  const { scrollMode, toggleScrollMode } = useScrollMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    ScrollTrigger.killAll();
    
    const sections = sectionsRef.current;
    const container = containerRef.current;

    if (scrollMode === 'horizontal' && window.innerWidth >= 1024) {
      // Horizontal scroll setup for desktop
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
          },
          end: () => "+=" + container.offsetWidth * (sections.length - 1),
          onUpdate: (self) => {
            const progress = self.progress;
            const sectionIndex = Math.round(progress * (sections.length - 1));
            setCurrentSection(sectionIndex);
          }
        }
      });
    } else {
      // Vertical scroll setup for mobile/tablet
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentSection(index),
          onEnterBack: () => setCurrentSection(index),
        });
      });
    }

    return () => {
      ScrollTrigger.killAll();
    };
  }, [scrollMode]);

  const addSectionRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (!section) return;

    if (scrollMode === 'horizontal' && window.innerWidth >= 1024) {
      gsap.to(window, {
        scrollTo: { x: section.offsetLeft, autoKill: false },
        duration: 1,
        ease: "power2.out"
      });
    } else {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-700">
        <ParticleBackground />
        
        <Navigation 
          theme={theme}
          toggleTheme={toggleTheme}
          scrollMode={scrollMode}
          toggleScrollMode={toggleScrollMode}
          currentSection={currentSection}
          onSectionClick={scrollToSection}
        />
        
        <div ref={containerRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={scrollMode}
              className={
                scrollMode === 'horizontal' && window.innerWidth >= 1024
                  ? "flex w-[700vw] h-screen"
                  : "flex flex-col"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection ref={addSectionRef} scrollMode={scrollMode} />
              <AboutSection ref={addSectionRef} scrollMode={scrollMode} />
              <ProjectsSection ref={addSectionRef} scrollMode={scrollMode} />
              <ExperienceSection ref={addSectionRef} scrollMode={scrollMode} />
              <SkillsSection ref={addSectionRef} scrollMode={scrollMode} />
              <LanguagesSection ref={addSectionRef} scrollMode={scrollMode} />
              <ContactSection ref={addSectionRef} scrollMode={scrollMode} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
