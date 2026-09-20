import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { 
  GraduationCap, BookOpen, Sparkles, CheckCircle2
} from 'lucide-react'
import { TextScramble } from '@/components/shared/TextScramble'
import GithubCalendarWrapper from '@/components/shared/GithubCalendarWrapper'

export default function About() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate grid pattern
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: 20,
          y: 15,
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      // Section heading clipPath reveal
      gsap.fromTo('.about-heading',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-heading',
            start: 'top 75%',
            scrub: false,
          }
        }
      )

      // Bio paragraphs stagger fade-up
      gsap.fromTo('.bio-paragraph',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bio-paragraph',
            start: 'top 75%',
            scrub: false,
          }
        }
      )

      // Skill items stagger fade-up
      gsap.fromTo('.skill-category-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            scrub: false,
          }
        }
      )

      // Education card reveal
      gsap.fromTo('.education-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.education-card',
            start: 'top 80%',
            scrub: false,
          }
        }
      )

      // GitHub calendar fade-up
      gsap.fromTo('.github-calendar',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.github-calendar',
            start: 'top 75%',
            scrub: false,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Skills Categories configuration reflecting actual technical areas
  const SKILL_CATEGORIES = [
    {
      title: 'Languages',
      badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
      skills: [
        { name: 'Java', icon: 'https://skillicons.dev/icons?i=java' },
        { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=javascript' },
        { name: 'HTML', icon: 'https://skillicons.dev/icons?i=html' },
        { name: 'CSS', icon: 'https://skillicons.dev/icons?i=css' },
      ],
    },
    {
      title: 'Frontend',
      badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5',
      skills: [
        { name: 'React.js', icon: 'https://skillicons.dev/icons?i=react' },
        { name: 'EJS', icon: 'https://skillicons.dev/icons?i=nodejs' },
        { name: 'Vite', icon: 'https://skillicons.dev/icons?i=vite' },
        { name: 'Bootstrap', icon: 'https://skillicons.dev/icons?i=bootstrap' },
        { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind' },
        { name: 'React Router', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg' },
        { name: 'Axios', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg' },
        { name: 'Redux', icon: 'https://skillicons.dev/icons?i=redux' },
      ],
    },
    {
      title: 'Backend',
      badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
      skills: [
        { name: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs' },
        { name: 'Express.js', icon: 'https://skillicons.dev/icons?i=express' },
        { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg' },
      ],
    },
    {
      title: 'Databases',
      badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/5',
      skills: [
        { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb' },
        { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql' },
      ],
    },
    {
      title: 'Tools',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/5',
      skills: [
        { name: 'Git', icon: 'https://skillicons.dev/icons?i=git' },
        { name: 'GitHub', icon: 'https://skillicons.dev/icons?i=github' },
        { name: 'VS Code', icon: 'https://skillicons.dev/icons?i=vscode' },
        { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman' },
        { name: 'Render', icon: 'https://skillicons.dev/icons?i=heroku' },
        { name: 'Vercel', icon: 'https://skillicons.dev/icons?i=vercel' },
      ],
    },
    {
      title: 'Concepts',
      badgeColor: 'border-[#CBA35C]/30 text-[#CBA35C] bg-[#CBA35C]/5',
      skills: [
        { name: 'DSA', icon: 'https://skillicons.dev/icons?i=java' },
        { name: 'OOP', icon: 'https://skillicons.dev/icons?i=java' },
        { name: 'REST APIs', icon: 'https://skillicons.dev/icons?i=postman' },
        { name: 'MVC', icon: 'https://skillicons.dev/icons?i=nodejs' },
        { name: 'Authentication', icon: 'https://skillicons.dev/icons?i=auth0' },
        { name: 'JWT', icon: 'https://skillicons.dev/icons?i=security' },
        { name: 'CRUD', icon: 'https://skillicons.dev/icons?i=mongodb' },
        { name: 'API Development', icon: 'https://skillicons.dev/icons?i=postman' },
        { name: 'Database Design', icon: 'https://skillicons.dev/icons?i=mysql' },
      ],
    },
    {
      title: 'Currently Learning',
      badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5',
      skills: [
        { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts' },
        { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
        { name: 'CI/CD', icon: 'https://skillicons.dev/icons?i=githubactions' },
        { name: 'AI Integration', icon: 'https://skillicons.dev/icons?i=bots' },
      ],
    },
  ]

  const coursework = [
    'Data Structures & Algorithms (DSA)',
    'Object-Oriented Programming (OOP)',
    'REST APIs & API Development',
    'MVC Architecture',
    'Database Management Systems (DBMS)',
    'CRUD Operations',
    'Database Design',
    'Operating Systems',
    'Computer Networks',
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-28 px-6 md:px-12 bg-[#090909] overflow-hidden"
    >
      {/* Dot grid pattern background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #333333 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-[.2em] text-[#CBA35C] mb-3 block">
              <TextScramble text="002 / Overview" />
            </span>
            <h2 className="about-heading font-['var(--font-cormorant)'] text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-tight text-[#F5F5F5]">
              About Me
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] max-w-xs leading-relaxed">
            Crafting efficient backend services, robust database architectures, and intuitive web experiences.
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-8 space-y-6">
            <p className="bio-paragraph font-['var(--font-inter)'] text-lg md:text-xl font-light text-[#F5F5F5] leading-relaxed">
              Hello! I'm <span className="text-[#CBA35C] font-normal">Jayesh Choudhary</span>, a software developer focused on building scalable, reliable, and secure web applications with <span className="text-[#F5F5F5] font-medium">Java</span> and the <span className="text-[#F5F5F5] font-medium">MERN Stack</span> (MongoDB, Express.js, React.js, Node.js).
            </p>
            <p className="bio-paragraph font-['var(--font-inter)'] text-base text-[#9B9B9B] leading-relaxed">
              My engineering philosophy revolves around writing clean, modular code and understanding systems from first principles. Whether designing document-oriented architectures like <span className="text-[#CBA35C]">JiluDB</span> from scratch in Java or deploying production-ready platforms like <span className="text-[#CBA35C]">Telegram Drive</span> and <span className="text-[#CBA35C]">BillNest</span>, I focus on performance, robust error handling, and high maintainability.
            </p>
            <p className="bio-paragraph font-['var(--font-inter)'] text-base text-[#9B9B9B] leading-relaxed">
              I have a solid foundation in Computer Science fundamentals—specializing in Data Structures & Algorithms, Object-Oriented Programming, MVC architecture, and database design. I enjoy turning complex business requirements into seamless, user-centric web applications.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center space-y-4 bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CBA35C]/5 rounded-full blur-2xl pointer-events-none" />
            <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-[#CBA35C] block">
              Quick Highlights
            </span>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#CBA35C] shrink-0 mt-1" />
                <span className="font-['var(--font-inter)'] text-sm text-[#F5F5F5]">
                  Full-stack MERN & Java Developer
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#CBA35C] shrink-0 mt-1" />
                <span className="font-['var(--font-inter)'] text-sm text-[#9B9B9B]">
                  Production applications with live deployments
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#CBA35C] shrink-0 mt-1" />
                <span className="font-['var(--font-inter)'] text-sm text-[#9B9B9B]">
                  Strong theoretical & practical CS foundation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Academic Background */}
        <div className="education-card bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] rounded-2xl p-8 md:p-10 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#CBA35C]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative z-10">
            <div>
              <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-[#CBA35C] mb-2 block">
                [ Academic Foundation ]
              </span>
              <h3 className="font-['var(--font-cormorant)'] text-3xl md:text-4xl font-bold text-[#F5F5F5]">
                Education & Qualifications
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#090909] border border-[#232323] rounded-full text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B]">
                Computer Applications
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
            {/* Master's Degree MCA */}
            <div className="p-6 rounded-xl bg-[#090909]/80 border border-[#232323] hover:border-[#CBA35C]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-2.5 bg-[#CBA35C]/10 border border-[#CBA35C]/30 rounded-xl text-[#CBA35C]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] border border-[#232323] rounded-full text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    2026 – 2028
                  </span>
                </div>
                <h4 className="font-['var(--font-cormorant)'] text-2xl font-bold text-[#F5F5F5] mb-1">
                  Master of Computer Applications (MCA)
                </h4>
                <p className="font-['var(--font-dm-mono)'] text-xs text-[#CBA35C] uppercase tracking-wider mb-2">
                  PES University, Bangalore
                </p>
                <p className="font-['var(--font-inter)'] text-xs text-[#9B9B9B] leading-relaxed">
                  Advanced studies in scalable software architecture, distributed systems, and computer applications.
                </p>
              </div>
            </div>

            {/* Bachelor's Degree BCA */}
            <div className="p-6 rounded-xl bg-[#090909]/80 border border-[#232323] hover:border-[#CBA35C]/50 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-2.5 bg-[#CBA35C]/10 border border-[#CBA35C]/30 rounded-xl text-[#CBA35C]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#CBA35C]/10 border border-[#CBA35C]/30 rounded-full text-xs font-['var(--font-dm-mono)'] text-[#CBA35C] font-semibold">
                      CGPA: 7.72
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] border border-[#232323] rounded-full text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B]">
                      <span className="w-2 h-2 rounded-full bg-[#CBA35C]" />
                      2026
                    </span>
                  </div>
                </div>
                <h4 className="font-['var(--font-cormorant)'] text-2xl font-bold text-[#F5F5F5] mb-1">
                  Bachelor of Computer Applications (BCA)
                </h4>
                <p className="font-['var(--font-dm-mono)'] text-xs text-[#CBA35C] uppercase tracking-wider mb-2">
                  OM SAI DEGREE COLLEGE • Bangalore University
                </p>
                <p className="font-['var(--font-inter)'] text-xs text-[#9B9B9B] leading-relaxed">
                  Strong foundational curriculum in software development, data structures, and database management.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#232323] pt-6 relative z-10">
            <div className="flex items-center gap-2 mb-4 text-[#F5F5F5] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#CBA35C]" />
              <span>Concepts & Relevant Coursework</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#090909] border border-[#232323] text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B] hover:text-[#F5F5F5] hover:border-[#CBA35C]/40 transition-colors"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#CBA35C]" />
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Technologies Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-[#CBA35C] mb-2 block">
              [ Tech Stack ]
            </span>
            <h3 className="font-['var(--font-cormorant)'] text-3xl md:text-5xl font-bold text-[#F5F5F5] mb-3">
              Skills & Technologies
            </h3>
            <p className="font-['var(--font-inter)'] text-sm text-[#9B9B9B]">
              Comprehensive technical toolkit across frontend, backend, database architectures, and development workflows.
            </p>
          </div>

          <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILL_CATEGORIES.map((category, index) => {
              const isCurrentlyLearning = index === SKILL_CATEGORIES.length - 1;
              return (
                <div
                  key={category.title}
                  className={`skill-category-card bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] rounded-xl p-5 sm:p-6 hover:border-[#CBA35C]/50 transition-all duration-300 group h-full flex flex-col justify-between ${
                    isCurrentlyLearning
                      ? 'md:col-span-2 md:w-[calc(50%-0.625rem)] md:mx-auto lg:w-full lg:col-span-1 lg:col-start-2 lg:mx-0'
                      : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#232323]">
                      <h4 className="font-['var(--font-cormorant)'] text-xl font-bold text-[#F5F5F5] group-hover:text-[#CBA35C] transition-colors">
                        {category.title}
                      </h4>
                      <span className={`text-[10px] uppercase font-['var(--font-dm-mono)'] px-2.5 py-0.5 rounded-full border ${category.badgeColor}`}>
                        {category.skills.length} skills
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex flex-col items-center justify-center py-2.5 px-2.5 rounded-lg bg-[#090909]/70 border border-[#232323] hover:border-[#CBA35C]/60 hover:bg-[#1a1a1a] transition-all duration-200"
                        >
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform"
                          />
                          <span className="font-['var(--font-dm-mono)'] text-[11px] text-[#9B9B9B] text-center leading-tight break-words">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
        </div>

        {/* GitHub Contribution Calendar */}
        <div className="github-calendar w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-widest text-[#CBA35C] mb-2 block">
              [ Open Source & Code Activity ]
            </span>
            <h3 className="font-['var(--font-cormorant)'] text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2">
              GitHub Contributions
            </h3>
            <p className="font-['var(--font-inter)'] text-sm text-[#9B9B9B] max-w-xl mx-auto">
              Consistently building projects, learning new technologies, and contributing code every week.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#232323] rounded-2xl p-6 md:p-8 flex flex-col items-center">
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <GithubCalendarWrapper
                username="choudharyjayesh668"
                year={new Date().getFullYear()}
              />
            </div>
            <div className="mt-6 pt-4 border-t border-[#232323] w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['var(--font-dm-mono)'] text-[#9B9B9B]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CBA35C]" />
                github.com/choudharyjayesh668
              </span>
              <a
                href="https://github.com/choudharyjayesh668"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CBA35C] hover:underline"
              >
                View GitHub Profile →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
