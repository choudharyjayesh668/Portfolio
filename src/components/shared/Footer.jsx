import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { TextHoverEffect } from '@/components/ui/hover-footer'

export default function Footer() {
  const footerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer text on scroll - only when in viewport
      gsap.set('.footer-text', { opacity: 0, y: 50 })
      gsap.to('.footer-text',
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom 70%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="pt-16 pb-12 px-6 md:px-12 bg-[#090909] border-t border-[#232323]">
      <div ref={textRef} className="footer-text lg:flex hidden h-[24rem]">
        <TextHoverEffect text="JAYESH" className="w-full" />
      </div>
      <div className="footer-text lg:hidden py-6 text-center">
        <h1 className="font-['var(--font-cormorant)'] text-5xl md:text-7xl font-bold tracking-wider text-[#F5F5F5]">
          JAYESH
        </h1>
      </div>

      <div className="mt-8 pt-8 border-t border-[#232323]/60 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B]">
        <p>Designed & Developed by <span className="text-[#F5F5F5] font-medium">Jayesh Choudhary</span></p>
        <p>© 2026 All Rights Reserved.</p>
      </div>
    </footer>
  )
}
