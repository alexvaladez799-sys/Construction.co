'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, ChevronRight, Phone, Mail, MapPin, Building, Wrench, Hammer, HardHat, Globe, Menu, X } from 'lucide-react'
import Image from 'next/image'

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll for navigation opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardHat className={`w-8 h-8 ${isScrolled ? 'text-brand-primary' : 'text-white'}`} />
            <div className={`text-2xl font-bold tracking-tight heading-montserrat ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>
              Complete Construction
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand-secondary ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="tel:559-536-0625" className="btn-primary">
              (559) 536-0625
            </a>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className={isScrolled ? 'text-brand-primary w-8 h-8' : 'text-white w-8 h-8'} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-brand-primary text-white flex flex-col pt-24 px-8 pb-12"
          >
            <button 
              className="absolute top-6 right-6"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-10 h-10 text-white" />
            </button>
            <div className="flex flex-col gap-6 text-2xl font-semibold mt-12 heading-montserrat">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brand-secondary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <a href="tel:559-536-0625" className="btn-primary inline-block w-full text-center mt-8">
                Call Now: (559) 536-0625
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="hero-container flex items-center bg-brand-primary relative">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-primary/40 md:bg-brand-primary/20 z-10 mix-blend-multiply" />
          {/* We avoid full grayscale to keep it vibrant, using a subtle overlay simply for text legibility */}
          <img
            src="/images/asset_9f1hejavg_1775155997654.png"
            className="w-full h-[120%] object-cover scale-110"
            alt="Construction work taking place"
          />
        </motion.div>

        <div className="relative z-20 text-white px-6 md:px-12 lg:px-24 w-full max-w-7xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-brand-secondary" />
              <span className="text-xs uppercase tracking-widest font-semibold">Perfect 5-Star Rating in Clovis, CA</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight heading-montserrat mb-6">
              Quality Projects,<br />On Time, <span className="text-brand-secondary">Every Time.</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 max-w-2xl opacity-90 leading-relaxed">
              Family-owned construction company serving Clovis, California with excellence, integrity, and craftsmanship you can trust. Let us bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary flex items-center justify-center gap-2 group">
                Get Free Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projects" className="bg-white text-brand-primary border-none py-3 px-8 rounded-md font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center">
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-brand-primary-dark text-white py-12 relative z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2 heading-montserrat">20+</div>
            <div className="text-sm uppercase tracking-wider opacity-80">Years Experience</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2 heading-montserrat">100%</div>
            <div className="text-sm uppercase tracking-wider opacity-80">Licensed & Insured</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2 heading-montserrat">5.0</div>
            <div className="text-sm uppercase tracking-wider opacity-80">Star Rating</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-2 heading-montserrat">100s</div>
            <div className="text-sm uppercase tracking-wider opacity-80">Projects Completed</div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img 
                  src="/images/asset_221p1186c_1775154970860.png" 
                  alt="Construction Crew" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-brand-primary text-white p-8 rounded-xl shadow-xl hidden md:block">
                <div className="text-xl font-bold heading-montserrat mb-2">Locally Owned</div>
                <div className="opacity-90">Serving the Central Valley</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="text-brand-secondary font-bold tracking-wider uppercase mb-4 text-sm flex items-center gap-4">
                <span className="w-12 h-px bg-brand-secondary"></span> Inside Complete Construction
              </div>
              <h2 className="text-4xl md:text-5xl font-bold heading-montserrat mb-8 text-brand-primary">
                Building Excellence in Construction
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Complete Construction Company is a fully licensed and insured, family-owned business based in Clovis, California. We have built a reputation for excellence in the construction industry.
                </p>
                <p>
                  Our commitment to superior customer service, honesty, and quality craftsmanship sets us apart from the competition. We take pride in every project we undertake and strive to exceed our clients&apos; expectations.
                </p>
                <p>
                  From residential upgrades to new commercial builds, we are your trusted partner for all construction needs. Let&apos;s build something great together.
                </p>
              </div>
              
              <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                {['Perfect 5-Star Rating', 'Family-Owned', 'Top Quality Materials', 'Financing Available'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-semibold text-brand-primary">
                    <CheckCircle2 className="w-6 h-6 text-brand-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="text-brand-secondary font-bold tracking-wider uppercase mb-4 text-sm">Our Expertise</div>
            <h2 className="text-4xl md:text-5xl font-bold heading-montserrat text-brand-primary mb-6">We Build Everything</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive construction services tailored to bringing your residential or commercial vision to reality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Metal Buildings', desc: 'Agricultural buildings, home shops, haybarns, and carports. Custom designs available.', icon: Building, img: '/images/asset_aw8lrl8fs_1775154970860.png' },
              { title: 'Roofing & Gutters', desc: 'Complete roofing installation, repair, and maintenance. Quality materials guaranteed.', icon: Home, img: '/images/asset_e7tm8xqbe_1775154970860.png' },
              { title: 'Home Renovations', desc: 'Transform your space with expert remodeling. From single rooms to whole-house overhauls.', icon: Hammer, img: '/images/asset_4dv6fmfd5_1775155997654.png' },
              { title: 'Concrete Work', desc: 'Driveways, patios, foundations, and more. Durable concrete construction.', icon: MapPin, img: '/images/asset_lgi2sbubc_1775155997654.png' },
              { title: 'Remodeling', desc: 'Kitchen and bathroom remodeling specialists to breathe new life into your home.', icon: Wrench, img: '/images/asset_npc17xbb7_1775155997654.png' },
              { title: 'New Construction', desc: 'Ground-up construction for residential and commercial projects. Quality built from the foundation up.', icon: HardHat, img: '/images/asset_221p1186c_1775154970860.png' },
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent flex items-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <service.icon className="w-10 h-10 text-brand-secondary mb-2" />
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold heading-montserrat text-brand-primary mb-3 group-hover:text-brand-secondary transition-colors">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.desc}</p>
                  </div>
                  <a href={`#`} className="inline-flex items-center text-brand-primary font-bold hover:text-brand-secondary transition-colors">
                    Learn More <ChevronRight className="w-5 h-5 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative py-32 bg-brand-primary overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/asset_9f1hejavg_1775155997654.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-brand-primary/90" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold heading-montserrat text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get a free, no-obligation estimate for your construction project today. Our expert team is ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="tel:559-536-0625" className="btn-primary text-xl px-12 py-5 flex items-center shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]">
                <Phone className="w-6 h-6 mr-3" />
                (559) 536-0625
              </a>
              <a href="mailto:support@completeconstruction-company.com" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/30 text-lg font-semibold px-8 py-5 rounded-md transition-all flex items-center">
                <Mail className="w-6 h-6 mr-3" />
                Email Us
              </a>
            </div>
            <p className="mt-8 text-gray-400">Serving Clovis, Fresno, and the Central Valley</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-primary-dark text-white pt-20 pb-10 border-t-4 border-brand-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <HardHat className="w-8 h-8 text-brand-secondary" />
                <span className="text-2xl font-bold heading-montserrat">Complete Construction</span>
              </div>
              <p className="text-gray-400 mb-6 line-clamp-3">
                Family-owned construction company serving Clovis, CA with excellence. Licensed, insured, and committed to quality.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors">
                  <Globe className="w-5 h-5 relative -left-0.5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 heading-montserrat">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-brand-secondary transition-colors flex items-center gap-2">
                       <ChevronRight className="w-4 h-4" /> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 heading-montserrat">Our Services</h4>
              <ul className="space-y-3">
                {['Metal Buildings', 'Roofing & Gutters', 'Renovations', 'Concrete Work', 'Remodeling', 'New Construction'].map(service => (
                  <li key={service}>
                    <a href="#services" className="text-gray-400 hover:text-brand-secondary transition-colors flex items-center gap-2">
                       <ChevronRight className="w-4 h-4" /> {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 heading-montserrat">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-gray-400">
                  <Phone className="w-6 h-6 text-brand-secondary shrink-0" />
                  <a href="tel:559-536-0625" className="hover:text-white transition-colors">(559) 536-0625</a>
                </li>
                <li className="flex items-start gap-4 text-gray-400">
                  <Mail className="w-6 h-6 text-brand-secondary shrink-0" />
                  <a href="mailto:support@completeconstruction-company.com" className="hover:text-white transition-colors break-words">
                    support@completeconstruction-company.com
                  </a>
                </li>
                <li className="flex items-start gap-4 text-gray-400">
                  <MapPin className="w-6 h-6 text-brand-secondary shrink-0" />
                  <span>1077 N. Willow Ave, Ste 105-966<br/>Clovis, CA 93611</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center md:flex md:justify-between md:items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Complete Construction Company. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6">
              <span>Licensed & Insured</span>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
