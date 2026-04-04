'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle2, ChevronRight, ChevronLeft,
  Phone, Mail, MapPin, Building2, Wrench, Hammer, HardHat,
  Globe, Menu, X, Star, Clock, FileText, BadgeCheck,
  Home as HomeIcon, Layers, Send, Shield
} from 'lucide-react'

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
]

const SERVICES = [
  {
    title: 'Metal Buildings',
    desc: 'Agricultural buildings, home shops, hay barns, and carports. Custom steel designs built to last.',
    icon: Building2,
    img: '/images/asset_aw8lrl8fs_1775154970860.png',
    list: ['Hay Barns & Ag Buildings', 'Home Shops & Garages', 'Custom Carports'],
  },
  {
    title: 'Roofing & Gutters',
    desc: 'Complete roofing installation, repair, and maintenance with quality materials guaranteed.',
    icon: HomeIcon,
    img: '/images/asset_e7tm8xqbe_1775154970860.png',
    list: ['Roof Replacement', 'Gutter Systems', 'Repairs & Inspections'],
  },
  {
    title: 'Home Renovations',
    desc: 'Transform your space with expert remodeling — from single rooms to whole-house overhauls.',
    icon: Hammer,
    img: '/images/asset_4dv6fmfd5_1775155997654.png',
    list: ['Kitchen & Bath', 'Room Additions', 'Whole-Home Remodel'],
  },
  {
    title: 'Concrete Work',
    desc: 'Driveways, patios, foundations, and retaining walls built for decades of durability.',
    icon: Layers,
    img: '/images/asset_lgi2sbubc_1775155997654.png',
    list: ['Driveways & Flatwork', 'Foundations', 'Retaining Walls'],
  },
  {
    title: 'Remodeling',
    desc: 'Kitchen and bathroom remodeling specialists breathing new life into every space.',
    icon: Wrench,
    img: '/images/asset_npc17xbb7_1775155997654.png',
    list: ['Kitchen Remodels', 'Bathroom Upgrades', 'Interior Finishes'],
  },
  {
    title: 'New Construction',
    desc: 'Ground-up construction for residential and commercial projects. Quality from the foundation up.',
    icon: HardHat,
    img: '/images/asset_221p1186c_1775154970860.png',
    list: ['Custom Home Builds', 'Commercial Projects', 'Accessory Dwellings'],
  },
]

const GALLERY = [
  { img: '/images/asset_9f1hejavg_1775155997654.png', label: 'Commercial Build', size: 'large' },
  { img: '/images/asset_aw8lrl8fs_1775154970860.png', label: 'Metal Building', size: 'tall' },
  { img: '/images/asset_e7tm8xqbe_1775154970860.png', label: 'Roofing Project', size: 'normal' },
  { img: '/images/asset_4dv6fmfd5_1775155997654.png', label: 'Home Renovation', size: 'normal' },
  { img: '/images/asset_lgi2sbubc_1775155997654.png', label: 'Concrete Work', size: 'wide' },
  { img: '/images/asset_npc17xbb7_1775155997654.png', label: 'Interior Remodel', size: 'normal' },
  { img: '/images/asset_221p1186c_1775154970860.png', label: 'New Construction', size: 'normal' },
]

const PROCESS = [
  {
    step: '01',
    title: 'Free Consultation',
    desc: 'We visit your site, listen to your vision, and take detailed measurements. No pressure, no sales pitch — just honest conversation.',
    time: 'Within 48 hours',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Detailed Proposal',
    desc: 'You receive a line-item written estimate with materials, labor, timeline, and a fixed price. No hidden costs, no change-order surprises.',
    time: '3–5 business days',
    icon: BadgeCheck,
  },
  {
    step: '03',
    title: 'Expert Execution',
    desc: 'Our licensed crew gets to work. Regular updates and a dedicated contact keep you informed every step of the way.',
    time: 'Per project timeline',
    icon: Hammer,
  },
  {
    step: '04',
    title: 'Final Walkthrough',
    desc: 'We walk every inch of the finished project with you. Nothing is signed off until you are fully satisfied — your approval is all that matters.',
    time: 'At completion',
    icon: CheckCircle2,
  },
]

const TESTIMONIALS = [
  {
    name: 'Robert & Linda H.',
    location: 'Full Home Renovation · Clovis, CA',
    quote: 'APEX Construction finished our entire first floor renovation two days early and came in under budget. The work is absolutely flawless — they\'re the last contractor we\'ll ever need.',
    initials: 'R',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    location: 'Metal Building · Fresno, CA',
    quote: 'They built our hay barn in record time. Showed up every single day, communicated clearly, and the finished product exceeded every expectation. Truly professional.',
    initials: 'S',
    stars: 5,
  },
  {
    name: 'David K.',
    location: 'Roof Replacement · Clovis, CA',
    quote: 'Roof replacement done in under three days and the cleanup was spotless. Six months later a major storm hit and not a single leak. I have absolute confidence in this crew.',
    initials: 'D',
    stars: 5,
  },
  {
    name: 'Tanya & Mark F.',
    location: 'Kitchen Remodel · Fresno, CA',
    quote: 'I\'ve been burned by contractors before. APEX Construction was completely different — showed up every day, communicated clearly, and the kitchen they built is better than anything I imagined.',
    initials: 'T',
    stars: 5,
  },
]

type FormData = {
  fname: string
  lname: string
  phone: string
  email: string
  service: string
  city: string
  budget: string
  message: string
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fname: '', lname: '', phone: '', email: '',
    service: '', city: '', budget: '', message: '',
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormLoading(true)
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1200))
    setFormLoading(false)
    setFormSubmitted(true)
  }

  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      {/* ── NAVIGATION ── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HardHat className={`w-8 h-8 ${isScrolled ? 'text-brand-primary' : 'text-white'}`} />
            <div className={`text-xl font-bold tracking-tight heading-montserrat ${isScrolled ? 'text-brand-primary' : 'text-white'}`}>
              APEX Construction
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand-secondary ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="tel:559-536-0625" className="btn-primary text-sm">
              (559) 536-0625
            </a>
          </div>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu className={`w-8 h-8 ${isScrolled ? 'text-brand-primary' : 'text-white'}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-brand-primary text-white flex flex-col pt-24 px-8 pb-12"
          >
            <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <X className="w-10 h-10 text-white" />
            </button>
            <div className="flex flex-col gap-5 text-2xl font-semibold heading-montserrat">
              {NAV_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brand-secondary transition-colors border-b border-white/10 pb-4"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto space-y-4">
              <a href="tel:559-536-0625" className="btn-primary inline-flex items-center justify-center gap-2 w-full text-center">
                <Phone className="w-5 h-5" /> Call Now: (559) 536-0625
              </a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn-secondary inline-flex items-center justify-center gap-2 w-full text-center">
                Get Free Estimate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="hero-container flex items-center bg-brand-primary relative" aria-label="Hero">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-primary/50 z-10" />
          <img
            src="/images/asset_9f1hejavg_1775155997654.png"
            className="w-full h-[120%] object-cover scale-110"
            alt="Construction work in progress"
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
              <span className="text-xs uppercase tracking-widest font-semibold">Perfect 5-Star Rating · Clovis, CA</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight heading-montserrat mb-6">
              Quality Projects,<br />On Time, <span className="text-brand-secondary">Every Time.</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 max-w-2xl opacity-90 leading-relaxed">
              Family-owned construction company serving Clovis &amp; the Central Valley with excellence, integrity, and craftsmanship you can trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-2 group text-base px-8 py-4">
                Get Free Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#gallery" className="bg-white/10 backdrop-blur-sm text-white border border-white/30 py-4 px-8 rounded-md font-semibold hover:bg-white/20 transition-all duration-300 inline-flex items-center justify-center">
                View Our Work
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-4">
              {[
                { icon: Shield, text: 'State Licensed' },
                { icon: BadgeCheck, text: 'Fully Insured' },
                { icon: Star, text: '5.0★ Rating' },
                { icon: Clock, text: 'On-Time Delivery' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-white/20">
                  <Icon className="w-4 h-4 text-brand-secondary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 text-xs font-medium">
          <div className="w-px h-10 bg-white/40 animate-pulse" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-brand-primary-dark text-white py-10 relative z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: '20+', label: 'Years Experience' },
            { val: '100%', label: 'Licensed & Insured' },
            { val: '5.0★', label: 'Star Rating' },
            { val: '500+', label: 'Projects Completed' },
          ].map(({ val, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="px-4 border-r border-white/10 last:border-r-0"
            >
              <div className="text-3xl md:text-4xl font-bold text-brand-secondary mb-1 heading-montserrat">{val}</div>
              <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src="/images/asset_221p1186c_1775154970860.png"
                  alt="APEX Construction crew on site"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Stacked secondary image */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden md:block">
                <img
                  src="/images/asset_aw8lrl8fs_1775154970860.png"
                  alt="Metal building project"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-secondary text-white p-5 rounded-xl shadow-xl hidden md:block">
                <div className="text-2xl font-bold heading-montserrat">20+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="text-brand-secondary font-bold tracking-wider uppercase mb-4 text-sm flex items-center gap-3">
                <span className="w-10 h-px bg-brand-secondary" /> Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-bold heading-montserrat mb-6 text-brand-primary">
                Building Excellence in the Central Valley
              </h2>
              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  APEX Construction is a fully licensed and insured, family-owned business based in Clovis, California. We have built a reputation for excellence in the construction industry.
                </p>
                <p>
                  Our commitment to superior customer service, honesty, and quality craftsmanship sets us apart. We take pride in every project we undertake and strive to exceed our clients&apos; expectations.
                </p>
                <p>
                  From residential upgrades to new commercial builds, we are your trusted partner for all construction needs in Clovis, Fresno, and the entire Central Valley.
                </p>
              </div>

              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {['Perfect 5-Star Rating', 'Family-Owned & Operated', 'Top Quality Materials', 'Financing Available', 'Licensed & Insured', 'On-Time Guarantee'].map(item => (
                  <li key={item} className="flex items-center gap-3 font-semibold text-brand-primary">
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                  Get Free Estimate <ArrowRight className="w-4 h-4" />
                </a>
                <a href="tel:559-536-0625" className="btn-outline inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (559) 536-0625
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-brand-secondary font-bold tracking-wider uppercase mb-3 text-sm">What We Build</div>
            <h2 className="text-4xl md:text-5xl font-bold heading-montserrat text-brand-primary mb-4">Expert Services,<br />Exceptional Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive construction services — every phase handled with precision, from foundations to finishes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="w-8 h-8 text-brand-secondary" />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold heading-montserrat text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow">{service.desc}</p>
                  <ul className="space-y-1 mb-5">
                    {service.list.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronRight className="w-4 h-4 text-brand-secondary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-brand-primary font-bold text-sm hover:text-brand-secondary transition-colors mt-auto"
                  >
                    Get a Quote <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-brand-primary rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-white text-center md:text-left">
              <div className="text-2xl font-bold heading-montserrat mb-1">Don&apos;t see your project?</div>
              <p className="text-white/70">We handle custom scopes — call us and we&apos;ll work it out together.</p>
            </div>
            <div className="flex gap-4 shrink-0">
              <a href="tel:559-536-0625" className="btn-primary inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="#contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 py-3 px-6 rounded-md font-semibold transition-all inline-flex items-center gap-2">
                Free Estimate
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-brand-secondary font-bold tracking-wider uppercase mb-3 text-sm">Our Work</div>
            <h2 className="text-4xl md:text-5xl font-bold heading-montserrat text-brand-primary mb-4">Projects That Speak<br />For Themselves</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every project is a commitment. Browse our recent work and see the standard we hold ourselves to.
            </p>
          </motion.div>

          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
            {/* Row 1: large + two stacked */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl"
            >
              <img src={GALLERY[0].img} alt={GALLERY[0].label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <span className="text-brand-secondary text-xs font-bold uppercase tracking-widest">Featured Project</span>
                  <div className="text-white text-xl font-bold heading-montserrat">{GALLERY[0].label}</div>
                </div>
              </div>
            </motion.div>

            {[GALLERY[1], GALLERY[2]].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.08 }}
                className="col-span-1 row-span-1 relative group overflow-hidden rounded-xl"
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white font-bold text-sm heading-montserrat">{item.label}</div>
                </div>
              </motion.div>
            ))}

            {/* Row 2 */}
            {[GALLERY[3], GALLERY[4], GALLERY[5], GALLERY[6]].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 3) * 0.08 }}
                className={`relative group overflow-hidden rounded-xl ${item.label === 'Concrete Work' ? 'col-span-2' : 'col-span-1'}`}
              >
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white font-bold text-sm heading-montserrat">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Start Your Project Today <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-brand-secondary font-bold tracking-wider uppercase mb-3 text-sm">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-bold heading-montserrat text-brand-primary mb-4">Simple Process.<br />Zero Surprises.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Refined over 20 years — every step designed to protect your time, money, and peace of mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-brand-secondary/30 z-0" />

            {PROCESS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Step number circle */}
                <div className="w-14 h-14 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg heading-montserrat mb-6 shadow-lg ring-4 ring-white border-2 border-brand-secondary">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold heading-montserrat text-brand-primary mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.desc}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-secondary bg-brand-secondary/10 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> {step.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-brand-primary-dark text-white overflow-hidden" aria-label="Reviews">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-brand-secondary font-bold tracking-wider uppercase mb-3 text-sm">Real Clients · Real Results</div>
            <h2 className="text-4xl md:text-5xl font-bold heading-montserrat mb-4">Don&apos;t Take Our Word For It</h2>
            <div className="flex items-center justify-center gap-2 text-lg">
              <span className="text-brand-secondary text-2xl">★★★★★</span>
              <strong>5.0 / 5.0</strong>
              <span className="text-white/60">from Google Reviews</span>
            </div>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/10"
              >
                <div className="text-brand-secondary text-3xl mb-6">{'★'.repeat(TESTIMONIALS[activeTestimonial].stars)}</div>
                <p className="text-xl leading-relaxed text-white/90 mb-8 italic max-w-3xl mx-auto">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                <footer className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-secondary text-white flex items-center justify-center font-bold text-lg heading-montserrat">
                    {TESTIMONIALS[activeTestimonial].initials}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">{TESTIMONIALS[activeTestimonial].name}</div>
                    <div className="text-white/60 text-sm">{TESTIMONIALS[activeTestimonial].location}</div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setActiveTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-secondary transition-colors flex items-center justify-center"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-brand-secondary w-8' : 'bg-white/30'}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-secondary transition-colors flex items-center justify-center"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / QUOTE FORM ── */}
      <section id="contact" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-brand-secondary font-bold tracking-wider uppercase mb-3 text-sm flex items-center gap-3">
                <span className="w-10 h-px bg-brand-secondary" /> Get In Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-bold heading-montserrat text-brand-primary mb-6">
                Start Your Project<br />This Month
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We&apos;re currently booking 4–6 weeks out. Request your free estimate today to lock in your spot.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Free on-site estimate — no obligation',
                  'Written, itemized quote within 5 business days',
                  'Fixed pricing — no surprise change orders',
                  'Licensed, insured, and bonded crew',
                  'Serving Clovis, Fresno & the Central Valley',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Contact details */}
              <div className="space-y-4">
                <a href="tel:559-536-0625" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center group-hover:bg-brand-secondary transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Call Us</div>
                    <div className="text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">(559) 536-0625</div>
                  </div>
                </a>
                <a href="mailto:support@completeconstruction-company.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center group-hover:bg-brand-secondary transition-colors">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Email Us</div>
                    <div className="text-base font-bold text-brand-primary group-hover:text-brand-secondary transition-colors break-all">support@completeconstruction-company.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Address</div>
                    <div className="text-base font-bold text-brand-primary">1077 N. Willow Ave, Ste 105-966<br />Clovis, CA 93611</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold heading-montserrat text-brand-primary mb-3">Request Received!</h3>
                    <p className="text-gray-600 mb-6">We&apos;ll be in touch within 1 business day to schedule your free on-site estimate.</p>
                    <a href="tel:559-536-0625" className="btn-primary inline-flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Call to Expedite
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold heading-montserrat text-brand-primary">Get Your Free Estimate</h3>
                      <p className="text-gray-500 mt-1">We respond within 1 business day.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fname" className="block text-sm font-semibold text-gray-700 mb-1">First Name <span className="text-brand-secondary">*</span></label>
                          <input
                            type="text" id="fname" name="fname"
                            placeholder="John"
                            required
                            value={formData.fname}
                            onChange={handleFormChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="lname" className="block text-sm font-semibold text-gray-700 mb-1">Last Name <span className="text-brand-secondary">*</span></label>
                          <input
                            type="text" id="lname" name="lname"
                            placeholder="Smith"
                            required
                            value={formData.lname}
                            onChange={handleFormChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone <span className="text-brand-secondary">*</span></label>
                          <input
                            type="tel" id="phone" name="phone"
                            placeholder="(559) 000-0000"
                            required
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email <span className="text-brand-secondary">*</span></label>
                          <input
                            type="email" id="email" name="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-1">Service Needed <span className="text-brand-secondary">*</span></label>
                        <select
                          id="service" name="service"
                          required
                          value={formData.service}
                          onChange={handleFormChange}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition bg-white"
                        >
                          <option value="" disabled>Select a service…</option>
                          <option value="metal">Metal Buildings</option>
                          <option value="roofing">Roofing &amp; Gutters</option>
                          <option value="renovation">Home Renovations</option>
                          <option value="concrete">Concrete Work</option>
                          <option value="remodel">Remodeling</option>
                          <option value="new">New Construction</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">City / Zip</label>
                          <input
                            type="text" id="city" name="city"
                            placeholder="Clovis, 93611…"
                            value={formData.city}
                            onChange={handleFormChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-1">Est. Budget</label>
                          <select
                            id="budget" name="budget"
                            value={formData.budget}
                            onChange={handleFormChange}
                            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition bg-white"
                          >
                            <option value="" disabled>Select range…</option>
                            <option>Under $10,000</option>
                            <option>$10,000 – $25,000</option>
                            <option>$25,000 – $50,000</option>
                            <option>$50,000 – $100,000</option>
                            <option>Over $100,000</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Project Description</label>
                        <textarea
                          id="message" name="message"
                          rows={4}
                          placeholder="Tell us about your project — what you want, timeline, any special requirements…"
                          value={formData.message}
                          onChange={handleFormChange}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full btn-primary py-4 inline-flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send My Free Quote Request
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> 100% private. We never share your information.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-brand-primary-dark text-white pt-20 pb-10 border-t-4 border-brand-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <HardHat className="w-8 h-8 text-brand-secondary" />
                <span className="text-xl font-bold heading-montserrat">APEX Construction</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Family-owned construction company serving Clovis, CA with excellence. Licensed, insured, and committed to quality craftsmanship.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary transition-colors" aria-label="Website">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-bold mb-5 heading-montserrat">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-brand-secondary transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4" /> {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-5 heading-montserrat">Our Services</h4>
              <ul className="space-y-3">
                {SERVICES.map(s => (
                  <li key={s.title}>
                    <a href="#services" className="text-gray-400 hover:text-brand-secondary transition-colors flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4" /> {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-5 heading-montserrat">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <Phone className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                  <a href="tel:559-536-0625" className="hover:text-white transition-colors">(559) 536-0625</a>
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <Mail className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                  <a href="mailto:support@completeconstruction-company.com" className="hover:text-white transition-colors break-all">
                    support@completeconstruction-company.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                  <span>1077 N. Willow Ave, Ste 105-966<br />Clovis, CA 93611</span>
                </li>
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <Clock className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                  <span>Mon–Sat: 7:00am – 6:00pm</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 text-center md:flex md:justify-between md:items-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} APEX Construction. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6">
              <span className="flex items-center gap-1"><BadgeCheck className="w-4 h-4 text-brand-secondary" /> Licensed &amp; Insured</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
