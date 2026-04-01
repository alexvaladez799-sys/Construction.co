'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      const { default: Lenis } = await import('@studio-freight/lenis')
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      const rafId = requestAnimationFrame(raf)

      // Hero parallax zoom
      gsap.to('#mainHeroImg', {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveal
      gsap.to('.reveal-text', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.reveal-text',
          start: 'top 85%',
        },
      })

      // Parallax for large image
      gsap.to('.parallax-img', {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.parallax-img',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Service row hover indent
      const rows = document.querySelectorAll<HTMLElement>('[data-service-row]')
      const handlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = []

      rows.forEach((item) => {
        const enter = () => gsap.to(item, { paddingLeft: '40px', duration: 0.4 })
        const leave = () => gsap.to(item, { paddingLeft: '16px', duration: 0.4 })
        item.addEventListener('mouseenter', enter)
        item.addEventListener('mouseleave', leave)
        handlers.push({ el: item, enter, leave })
      })

      cleanup = () => {
        cancelAnimationFrame(rafId)
        lenis.destroy()
        ScrollTrigger.getAll().forEach((t) => t.kill())
        handlers.forEach(({ el, enter, leave }) => {
          el.removeEventListener('mouseenter', enter)
          el.removeEventListener('mouseleave', leave)
        })
      }
    }

    init()

    return () => cleanup?.()
  }, [])

  return (
    <div className="bg-white text-[#0f0f0f] overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed w-full z-[100] px-10 py-8 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl font-semibold tracking-tighter uppercase">
          Apex / <span className="serif italic lowercase font-light">Studio</span>
        </div>
        <div className="hidden md:flex space-x-12 text-[10px] uppercase tracking-[0.3em] font-medium">
          <a href="#" className="hover:opacity-50 transition">Work</a>
          <a href="#" className="hover:opacity-50 transition">Services</a>
          <a href="#" className="hover:opacity-50 transition">Process</a>
          <a href="#" className="hover:opacity-50 transition">Contact</a>
        </div>
        <div className="md:hidden">MENU</div>
      </nav>

      {/* Hero */}
      <section className="hero-container flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600607687940-c52fb0c0919c?auto=format&fit=crop&q=80&w=2000"
            className="hero-image w-full h-full object-cover opacity-60"
            id="mainHeroImg"
            alt="Architectural hero"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] serif italic mb-4">Fluid Space.</h1>
          <p className="text-xs md:text-sm uppercase tracking-[0.5em] font-light">
            The Art of High-Performance Construction
          </p>
        </div>
        <div className="absolute bottom-10 left-10 text-white text-[10px] tracking-widest uppercase hidden md:block">
          SCROLL TO EXPLORE<br />
          <span className="opacity-30">EST. 1998</span>
        </div>
      </section>

      {/* Intro */}
      <section className="py-32 px-10 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="md:w-1/2">
              <h2 className="reveal-text text-4xl md:text-6xl leading-tight serif mb-8 translate-y-20 opacity-0">
                We build structures that<br />
                <span className="italic text-gray-400">breathe with light.</span>
              </h2>
            </div>
            <div className="md:w-1/3 mt-4">
              <p className="reveal-text text-gray-500 leading-relaxed mb-8 translate-y-20 opacity-0">
                Apex is a premium contracting firm specializing in the intersection of structural
                integrity and modern transparency. We don&apos;t just build; we engineer environments
                that elevate human experience.
              </p>
              <a href="#" className="reveal-text btn-outline inline-block opacity-0">
                Our Philosophy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Image */}
      <section className="h-[80vh] overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          className="parallax-img w-full h-[120%] object-cover absolute top-[-10%]"
          alt="Modern office building"
        />
      </section>

      {/* Services */}
      <section className="py-32 bg-white">
        <div className="px-10 md:px-20 border-b border-gray-100 pb-20">
          <h3 className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-20">Capabilities</h3>

          {[
            { n: '01', title: 'Architectural Glazing', desc: 'World-class glass solutions for residential estates and commercial flagships.' },
            { n: '02', title: 'Luxury Build-Outs', desc: 'Meticulous attention to detail in high-end interior and exterior construction.' },
            { n: '03', title: 'Structural Engineering', desc: 'Advanced structural solutions that allow for daring, gravity-defying designs.' },
          ].map((s) => (
            <div
              key={s.n}
              data-service-row
              className="flex flex-col md:flex-row justify-between py-12 border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors px-4"
            >
              <span className="text-xs font-bold py-2">{s.n}</span>
              <h4 className="text-3xl md:text-5xl serif hover:italic transition-all">{s.title}</h4>
              <p className="md:w-1/3 text-sm text-gray-500 py-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
                className="w-full grayscale hover:grayscale-0 transition duration-700"
                alt="Private Residence Malibu"
              />
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest border-b pb-4">
              <span>Private Residence / Malibu</span>
              <span className="italic">2023</span>
            </div>
          </div>
          <div className="space-y-6 md:mt-40">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                className="w-full grayscale hover:grayscale-0 transition duration-700"
                alt="The Sky Loft London"
              />
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-widest border-b pb-4">
              <span>The Sky Loft / London</span>
              <span className="italic">2022</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-[#0f0f0f] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-8xl serif italic mb-12">
            Let&apos;s build the<br />exceptional.
          </h2>
          <p className="text-gray-400 mb-12 text-lg font-light tracking-wide">
            Currently accepting inquiries for 2024–2025 luxury projects worldwide.
          </p>
          <a
            href="mailto:office@apex.com"
            className="text-xl md:text-2xl border-b-2 border-white pb-2 hover:text-[#C5A059] hover:border-[#C5A059] transition-all"
          >
            Start a Conversation
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-10 bg-[#0f0f0f] text-white flex flex-col md:flex-row justify-between items-end border-t border-gray-800">
        <div className="text-4xl font-bold tracking-tighter">APEX</div>
        <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 mt-10 md:mt-0">
          &copy; 2024 Apex Construction Group. Built for the Discerning.
        </div>
      </footer>

    </div>
  )
}
