import React, { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare, Calendar, User } from 'lucide-react';

interface ContactSectionProps {
  scrollMode: 'vertical' | 'horizontal';
}

export const ContactSection = forwardRef<HTMLDivElement, ContactSectionProps>(
  ({ scrollMode }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('idle');
      }, 3000);
    };

    const contactInfo = [
      {
        icon: Mail,
        label: 'Email',
        value: 'sathminadaham75@gmail.com',
        href: 'sathminadaham75@gmail.com',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
      },
      {
        icon: Phone,
        label: 'Phone',
        value: '+94 742 334 961',
        href: 'tel:+94742334961',
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
      },
      {
        icon: MapPin,
        label: 'Location',
        value: 'Kandy, SRI LANKA',
        href: 'https://maps.app.goo.gl/2fGWbU3SoYGb7DFV9',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
      },
    ];

    const socialLinks = [
      { icon: Github, href: 'https://github.com/DahamSathmina', label: 'GitHub', color: 'hover:text-gray-400' },
      { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
      { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    ];

    const FloatingLabel = ({ 
      children, 
      htmlFor, 
      focused, 
      hasValue 
    }: { 
      children: React.ReactNode; 
      htmlFor: string; 
      focused: boolean; 
      hasValue: boolean; 
    }) => (
      <motion.label
        htmlFor={htmlFor}
        className={`absolute left-6 pointer-events-none transition-all duration-300 ${
          focused || hasValue
            ? 'top-2 text-xs text-red-400 font-medium'
            : 'top-4 text-base text-gray-400'
        }`}
        animate={{
          y: focused || hasValue ? -8 : 0,
          scale: focused || hasValue ? 0.85 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.label>
    );

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
        } flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 dark:from-black dark:via-red-900/30 dark:to-black py-20 overflow-y-auto`}
      >
        <div className="container mx-auto px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let's <span className="text-red-500">Connect</span>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-red-500 mx-auto mb-6"
              initial={{ width: 0 }}
              animate={inView ? { width: 96 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center mb-8">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MessageSquare className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white">Get in Touch</h3>
                </div>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                      className="group flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <motion.div 
                        className={`w-14 h-14 ${info.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        whileHover={{ rotate: 5 }}
                      >
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </motion.div>
                      <div>
                        <p className="text-gray-400 text-sm font-medium">{info.label}</p>
                        <p className="text-white font-semibold text-lg">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2 text-red-500" />
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                        className="group relative w-14 h-14 bg-white/10 hover:bg-red-500 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-red-500"
                        whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                        
                        {/* Tooltip */}
                        <motion.div
                          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ y: 10 }}
                          whileHover={{ y: 0 }}
                        >
                          {social.label}
                        </motion.div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Response Time', value: '< 24h', icon: Calendar },
                      { label: 'Projects Completed', value: '50+', icon: User },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center p-4 bg-white/5 rounded-2xl border border-white/10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <stat.icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center mb-8">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white">Send Message</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Name Field */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300"
                      placeholder="Your Name"
                      required
                    />
                    <FloatingLabel 
                      htmlFor="name" 
                      focused={focusedField === 'name'} 
                      hasValue={!!formData.name}
                    >
                      Your Name
                    </FloatingLabel>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300"
                      placeholder="Your Email"
                      required
                    />
                    <FloatingLabel 
                      htmlFor="email" 
                      focused={focusedField === 'email'} 
                      hasValue={!!formData.email}
                    >
                      Your Email
                    </FloatingLabel>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300"
                      placeholder="Subject"
                      required
                    />
                    <FloatingLabel 
                      htmlFor="subject" 
                      focused={focusedField === 'subject'} 
                      hasValue={!!formData.subject}
                    >
                      Subject
                    </FloatingLabel>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300 resize-none"
                      placeholder="Your Message"
                      required
                    />
                    <FloatingLabel 
                      htmlFor="message" 
                      focused={focusedField === 'message'} 
                      hasValue={!!formData.message}
                    >
                      Your Message
                    </FloatingLabel>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || submitStatus === 'success'}
                      className="group relative w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 disabled:opacity-70"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="submitting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center space-x-2"
                          >
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <span>Sending...</span>
                          </motion.div>
                        ) : submitStatus === 'success' ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center space-x-2"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: 'spring' }}
                            >
                              ✓
                            </motion.div>
                            <span>Message Sent!</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center space-x-2"
                          >
                            <span>Send Message</span>
                            <motion.div
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Ripple Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-2xl"
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

ContactSection.displayName = 'ContactSection';