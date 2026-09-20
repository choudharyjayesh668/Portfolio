import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { gsap } from '@/lib/gsap'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, MapPin, Send, ExternalLink, Code2 } from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const spinnerRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading clip reveal
      gsap.fromTo('.contact-heading',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Contact info fade-up
      gsap.fromTo('.contact-info',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )

      // Form fade-up
      gsap.fromTo('.contact-form',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isSubmitting && spinnerRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'none',
      })
    } else if (spinnerRef.current) {
      gsap.killTweensOf(spinnerRef.current)
    }
  }, [isSubmitting])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Direct mailto redirect so the message goes directly to your email
      const subject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`)
      const body = encodeURIComponent(
        `Hi Jayesh,\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
      )
      const mailtoUrl = `mailto:jayeshchoudhary9503@gmail.com?subject=${subject}&body=${body}`

      // Trigger mail client
      window.location.href = mailtoUrl

      // Animate form to success state
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSuccess(true)
          gsap.fromTo(
            successRef.current,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            }
          )
        }
      })

      if (formRef.current) {
        tl.to(formRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
        })
      }
    } catch (err) {
      setError('An error occurred. Please try emailing directly at jayeshchoudhary9503@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-6 md:px-12 bg-[#090909] overflow-hidden"
    >
      {/* Glow ambient background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#CBA35C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-[.2em] text-[#CBA35C] mb-3 block">
              <TextScramble text="006 / Get In Touch" />
            </span>
            <h2 className="contact-heading font-['var(--font-cormorant)'] text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-tight text-[#F5F5F5]">
              Let's Connect
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] max-w-xs leading-relaxed">
            Have a project in mind, an opportunity, or want to discuss architecture? Drop me a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Info */}
          <div className="contact-info lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="font-['var(--font-cormorant)'] text-3xl font-bold text-[#F5F5F5]">
                Start a Conversation
              </h3>
              <p className="font-['var(--font-inter)'] text-sm text-[#9B9B9B] leading-relaxed">
                I'm actively seeking opportunities as a software developer, full-stack engineer, or backend developer. Let's build something meaningful together.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:jayeshchoudhary9503@gmail.com"
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] hover:border-[#CBA35C]/50 rounded-xl transition-all group"
              >
                <div className="p-3 bg-[#090909] border border-[#232323] rounded-lg text-[#CBA35C] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-wider text-[#9B9B9B] block">
                    Email
                  </span>
                  <span className="font-['var(--font-dm-mono)'] text-xs text-[#F5F5F5] group-hover:text-[#CBA35C] transition-colors">
                    jayeshchoudhary9503@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] rounded-xl">
                <div className="p-3 bg-[#090909] border border-[#232323] rounded-lg text-[#CBA35C]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-wider text-[#9B9B9B] block">
                    Location
                  </span>
                  <span className="font-['var(--font-dm-mono)'] text-xs text-[#F5F5F5]">
                    Bangalore, Karnataka, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social profiles */}
            <div className="space-y-3">
              <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-[#9B9B9B] block">
                Connect Online
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/choudharyjayesh668"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                  className="flex items-center gap-2 p-3 bg-[#090909] border border-[#232323] rounded-xl text-[#9B9B9B] hover:text-[#F5F5F5] hover:border-[#CBA35C]/40 transition-all text-xs font-['var(--font-dm-mono)']"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/jayesh-choudhary-8b7201360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                  className="flex items-center gap-2 p-3 bg-[#090909] border border-[#232323] rounded-xl text-[#9B9B9B] hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-all text-xs font-['var(--font-dm-mono)']"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* LeetCode */}
                <a
                  href="https://leetcode.com/u/Jayeshchoudhary9503/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LeetCode profile"
                  className="flex items-center gap-2 p-3 bg-[#090909] border border-[#232323] rounded-xl text-[#9B9B9B] hover:text-[#FFA116] hover:border-[#FFA116]/40 transition-all text-xs font-['var(--font-dm-mono)']"
                >
                  <Code2 className="w-4 h-4" />
                  <span>LeetCode</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jayeshchoudhayy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Instagram profile"
                  className="flex items-center gap-2 p-3 bg-[#090909] border border-[#232323] rounded-xl text-[#9B9B9B] hover:text-[#E4405F] hover:border-[#E4405F]/40 transition-all text-xs font-['var(--font-dm-mono)']"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="contact-form lg:col-span-3">
            {!isSuccess ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] rounded-2xl p-6 md:p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-[#9B9B9B]">
                      Name
                    </label>
                    <Input
                      {...register('name')}
                      placeholder="Your name"
                      className="bg-[#090909] border-[#232323] text-[#F5F5F5] placeholder:text-[#9B9B9B]/50 font-['var(--font-inter)'] focus:border-[#CBA35C] transition-colors h-14 rounded-xl"
                    />
                    {errors.name && (
                      <p className="font-['var(--font-dm-mono)'] text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-[#9B9B9B]">
                      Email
                    </label>
                    <Input
                      {...register('email')}
                      placeholder="your@email.com"
                      type="email"
                      className="bg-[#090909] border-[#232323] text-[#F5F5F5] placeholder:text-[#9B9B9B]/50 font-['var(--font-inter)'] focus:border-[#CBA35C] transition-colors h-14 rounded-xl"
                    />
                    {errors.email && (
                      <p className="font-['var(--font-dm-mono)'] text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider text-[#9B9B9B]">
                    Message
                  </label>
                  <Textarea
                    {...register('message')}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    rows={5}
                    className="bg-[#090909] border-[#232323] text-[#F5F5F5] placeholder:text-[#9B9B9B]/50 font-['var(--font-inter)'] resize-none focus:border-[#CBA35C] transition-colors rounded-xl"
                  />
                  {errors.message && (
                    <p className="font-['var(--font-dm-mono)'] text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                {error && (
                  <p className="font-['var(--font-dm-mono)'] text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Send contact form message"
                  className="w-full bg-[#CBA35C] text-[#090909] hover:bg-[#d6b575] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider py-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#CBA35C]/20 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 ref={spinnerRef} className="mr-2 h-4 w-4" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div
                ref={successRef}
                className="bg-gradient-to-br from-[#111111] to-[#141414] border border-[#CBA35C]/40 rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 bg-[#CBA35C]/15 rounded-full flex items-center justify-center mx-auto mb-6 text-[#CBA35C]">
                  <Send className="w-8 h-8" />
                </div>
                <div className="font-['var(--font-cormorant)'] text-3xl font-bold text-[#F5F5F5] mb-3">
                  Message Sent!
                </div>
                <p className="font-['var(--font-inter)'] text-[#9B9B9B] mb-8 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you for reaching out. I've received your message and will get back to you promptly.
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    gsap.fromTo(formRef.current,
                      { opacity: 0, scale: 0.95 },
                      {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                      }
                    )
                  }}
                  aria-label="Send another message"
                  className="bg-[#CBA35C] text-[#090909] hover:bg-[#d6b575] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider rounded-xl font-semibold cursor-pointer"
                >
                  Send Another Message
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
