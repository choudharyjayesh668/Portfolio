import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { ArrowRight, Download, Send } from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'
import { useMagnetic } from '@/hooks/useMagnetic'

export default function Hero() {
  const containerRef = useRef(null)
  const magneticProjects = useMagnetic()
  const magneticContact = useMagnetic()
  const magneticResume = useMagnetic()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Animate decorative orbs with smooth continuous movement
      gsap.to('.orb-1', {
        x: 100,
        y: -80,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.orb-2', {
        x: -80,
        y: 60,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.orb-3', {
        x: 60,
        y: 90,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Fade in orbs
      gsap.fromTo('.orb', { opacity: 0 }, { opacity: 0.6, duration: 2, stagger: 0.3 })

      // Clip-reveal each name line from below
      tl.to('.name-inner', {
        y: '0%',
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
      })
        .to('.hero-fade', {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
        }, '-=0.5')
        .to('.scroll-line', {
          scaleY: 1,
          duration: 0.9,
          ease: 'power2.inOut',
          transformOrigin: 'top',
        }, '-=0.4')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col justify-center items-center px-6 md:px-12 py-24 bg-[#090909] overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#090909] via-[#111111] to-[#090909]" />
      
      {/* Decorative orbs */}
      <div className="orb orb-1 absolute top-20 left-20 w-72 h-72 bg-[#CBA35C]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="orb orb-2 absolute bottom-32 right-32 w-96 h-96 bg-[#F5F5F5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="orb orb-3 absolute top-1/2 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Glow effect behind name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-[#CBA35C]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Availability badge */}
        <div className="hero-fade mb-6 inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-[#111111]/80 border border-[#232323] backdrop-blur-sm opacity-0 translate-y-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-['var(--font-dm-mono)'] text-[clamp(10px,1.2vw,12px)] uppercase tracking-wider text-[#9B9B9B]">
            AVAILABLE FOR INTERNSHIPS • FREELANCE • FULL-TIME
          </span>
        </div>

        {/* Name — clip reveal */}
        <h1 className="mb-4 font-['var(--font-cormorant)'] text-[clamp(44px,8vw,100px)] font-bold leading-[1.05] tracking-tight text-[#F5F5F5] text-center relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#CBA35C]/20 via-transparent to-[#CBA35C]/20 blur-xl opacity-40 pointer-events-none" />
          {['Jayesh', 'Choudhary'].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden relative mx-2">
              <span
                className="name-inner block translate-y-[110%] relative"
                style={{ fontStyle: i === 1 ? 'italic' : 'normal' }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Title */}
        <p className="hero-fade mb-3 font-['var(--font-cormorant)'] text-[clamp(22px,3.5vw,34px)] font-semibold text-[#CBA35C] opacity-0 translate-y-2 text-center">
          Software Developer | Java | MERN Stack
        </p>

        {/* Subtitle */}
        <p className="hero-fade mb-6 font-['var(--font-dm-mono)'] text-[clamp(11px,1.4vw,14px)] uppercase tracking-[.15em] text-[#9B9B9B] opacity-0 translate-y-2 text-center">
          FULL STACK DEVELOPER • BACKEND ENTHUSIAST • PROBLEM SOLVER
        </p>

        {/* Description */}
        <p className="hero-fade max-w-2xl font-['var(--font-inter)'] text-[clamp(14px,1.5vw,17px)] font-light leading-relaxed text-[#9B9B9B] opacity-0 translate-y-2 text-center mb-10">
          I build scalable full-stack web applications using MongoDB, Express.js, React, and Node.js. Passionate about clean architecture, intuitive user experiences, secure authentication, and solving real-world problems through software engineering.
        </p>

        {/* CTA Buttons */}
        <div className="hero-fade flex flex-wrap items-center justify-center gap-4 opacity-0 translate-y-2">
          <a
            ref={magneticProjects.ref}
            href="#projects"
            aria-label="View Projects"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-[#CBA35C] px-6 py-3.5 font-['var(--font-dm-mono)'] text-xs font-semibold uppercase tracking-wider text-[#090909] transition-all duration-300 hover:bg-[#d6b575] hover:shadow-lg hover:shadow-[#CBA35C]/20 hover:-translate-y-0.5"
          >
            <span ref={magneticProjects.innerRef} className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>

          <a
            ref={magneticContact.ref}
            href="#contact"
            aria-label="Contact Me"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-[#111111] border border-[#232323] px-6 py-3.5 font-['var(--font-dm-mono)'] text-xs font-semibold uppercase tracking-wider text-[#F5F5F5] transition-all duration-300 hover:border-[#CBA35C] hover:text-[#CBA35C] hover:-translate-y-0.5"
          >
            <span ref={magneticContact.innerRef} className="relative z-10 flex items-center gap-2">
              Contact Me
              <Send className="w-3.5 h-3.5" />
            </span>
          </a>

          <a
            ref={magneticResume.ref}
            href="/Jayesh-Choudhary-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Jayesh-Choudhary-Resume.pdf"
            aria-label="Download Resume"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-[#111111]/80 border border-[#232323] px-5 py-3.5 font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-[#9B9B9B] transition-all duration-300 hover:text-[#F5F5F5] hover:border-[#CBA35C]/60 hover:-translate-y-0.5"
          >
            <span ref={magneticResume.innerRef} className="relative z-10 flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-[#CBA35C]" />
              Download Resume
            </span>
          </a>
        </div>
      </div>

      {/* Scroll line accent */}
      <div className="scroll-line absolute bottom-0 left-1/2 -translate-x-1/2 w-px scale-y-0 bg-gradient-to-b from-[#CBA35C] via-[#232323] to-transparent h-20" />

      {/* Index label */}
      <span className="hero-fade absolute bottom-8 right-8 md:right-12 font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-[#9B9B9B]/50 opacity-0">
        <TextScramble text="001 / Hero" />
      </span>
    </section>
  )
}
