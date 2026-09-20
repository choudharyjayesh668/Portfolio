import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
} from "@/components/ui/drawer";
import { ArrowUpRight, CheckCircle, ExternalLink } from "lucide-react";
import { TextScramble } from "@/components/shared/TextScramble";

// ============================================
// PROJECTS CONFIGURATION - Jayesh Choudhary
// ============================================
const PROJECTS_CONFIG = [
    {
        id: "1",
        number: "01",
        title: "Telegram Drive",
        description:
            "A secure cloud storage platform powered by Telegram where users can upload, organize, rename, move, delete, and manage files inside folders with secure authentication.",
        longDescription:
            "Telegram Drive transforms Telegram's cloud architecture into a full-fledged cloud storage management platform. Users can effortlessly upload large files, organize them hierarchically in folders, search items in real-time, and manage their cloud assets securely.",
        features: [
            "JWT Authentication",
            "Folder Management",
            "File Upload",
            "File Rename",
            "Delete Files & Folders",
            "Real-time Search",
            "Responsive UI",
            "Cloud Storage Integration",
            "Protected Dashboard",
        ],
        tech: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JWT",
            "Cloudinary",
            "Telegram API",
            "Tailwind CSS",
        ],
        year: "2026",
        link: "https://telegram-drive-sepia.vercel.app/",
        sourceCode: "https://github.com/choudharyjayesh668/Telegram-Drive",
    },
    {
        id: "2",
        number: "02",
        title: "URL Shortener",
        description:
            "A modern URL shortening platform allowing users to generate short links with authentication, custom aliases, analytics, and QR code generation.",
        longDescription:
            "A lightweight yet powerful URL shortening system built with robust backend logic. Offers instant redirection, custom aliases, click rate analytics, automated QR code generation, and protected dashboard management.",
        features: [
            "Authentication",
            "Custom URLs",
            "QR Code Generation",
            "Click Analytics",
            "Dashboard",
            "Link Management",
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "JavaScript", "Tailwind CSS"],
        year: "2026",
        link: "https://url-shortner-seven-blush-49.vercel.app/",
        sourceCode: "https://github.com/choudharyjayesh668/url-shortner",
    },
    {
        id: "3",
        number: "03",
        title: "JiluDB",
        description:
            "A lightweight document-oriented NoSQL database written from scratch in Java with hierarchical storage, in-memory caching, custom serialization, and file persistence.",
        longDescription:
            "JiluDB is a lightweight document-oriented NoSQL database built from scratch in Java to master low-level storage engines and database internals. Designed with a clean hierarchical architecture (Database → Collection → Document), it uses Java HashMaps (Database: HashMap<String, Collection>, Collection: HashMap<String, Document>, Document: HashMap<String, Object>) for fast key-value storage. Features full CRUD support (put, get, remove, containsKey), custom serialization, and robust file persistence with save() and load() operations.",
        features: [
            "Database → Collection → Document Architecture",
            "Java HashMap In-Memory Storage",
            "Key-Value Document Model (HashMap<String, Object>)",
            "Full CRUD Operations (put, get, remove, containsKey)",
            "Custom Serialization & File I/O Persistence",
            "save() and load() Functionality",
            "Robust Error Handling & Data Integrity",
            "OOP & Data Structures Foundation",
        ],
        tech: ["Java", "OOP", "Data Structures", "HashMaps", "Serialization", "File I/O"],
        year: "2026",
        sourceCode: "https://github.com/choudharyjayesh668/JiluDB",
    },
    {
        id: "4",
        number: "04",
        title: "BillNest",
        description:
            "A complete billing, quotation, and inventory management system built for businesses (including Lakshmi Industries) to efficiently manage customers, products, invoices, and sales.",
        longDescription:
            "BillNest simplifies billing and inventory operations for modern businesses with a clean dashboard, secure JWT authentication, and real-time sales & inventory tracking. Implemented for Lakshmi Industries to streamline quotation generation, invoice creation, and business accounting.",
        features: [
            "Secure JWT Authentication",
            "Customer Management",
            "Product Management",
            "Invoice & Quotation Generation",
            "Billing Dashboard",
            "Sales History & Money Tracking",
            "Inventory Management",
            "Search & Filters",
            "Responsive Design",
            "Protected Admin Dashboard",
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API", "EJS"],
        year: "2026",
        link: "https://billnest-sh5t.onrender.com/",
        sourceCode: "https://github.com/choudharyjayesh668/BillNest",
    },
    {
        id: "5",
        number: "05",
        title: "Personal Portfolio",
        description:
            "A modern developer portfolio showcasing projects, technical skills, experience, GitHub activity, achievements, and contact information with elegant UI and smooth animations.",
        longDescription:
            "A modern developer portfolio showcasing projects, technical skills, experience, GitHub activity, achievements, and contact information with elegant UI and smooth animations. Built with a component-driven React architecture, responsive design system, and refined interactive elements.",
        features: [
            "Elegant UI & Modern Dark Theme",
            "GSAP Animations & Micro-Interactions",
            "Interactive Project Showcase with Details Modal",
            "Technical Skills Matrix Across 7 Categories",
            "Live GitHub Contributions Calendar",
            "Key Highlights & Engineering Milestones",
            "Full Mobile & Desktop Responsiveness",
        ],
        tech: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "+1",
        ],
        year: "2026",
        sourceCode: "https://github.com/choudharyjayesh668/Portfolio",
    },
];

// ============================================
// EXPERIENCE CONFIGURATION - Jayesh Choudhary
// ============================================
const EXPERIENCE_CONFIG = [
    {
        company: "Self-Employed • Bangalore, India",
        role: "Freelance Software Developer",
        period: "2026",
        highlights: [
            "Developed BillNest, a full-stack billing and quotation management application using Node.js, Express.js, MongoDB, and EJS.",
            "Implemented billing, quotation generation, inventory management, and money management features.",
            "Designed REST APIs and MongoDB schemas to support business operations.",
        ],
    },
    {
        company: "Independent Projects",
        role: "Software Developer",
        period: "2025 – Present",
        highlights: [
            "Developed full-stack applications using React.js, Node.js, Express.js, and MongoDB.",
            "Built REST APIs, authentication systems, and database-driven applications.",
            "Applied OOP, DSA, MVC, CRUD, and database design concepts across projects.",
        ],
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = PROJECTS_CONFIG;
    const experience = EXPERIENCE_CONFIG;

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
                    ease: "sine.inOut",
                });
            }
            // Section heading clip reveal
            gsap.fromTo(
                ".projects-heading",
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".projects-heading",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );

            // Project cards stagger fade-up
            gsap.fromTo(
                ".project-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".projects-grid",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );

            // Timeline line draw
            gsap.fromTo(
                ".timeline-line",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    transformOrigin: "top",
                    scrollTrigger: {
                        trigger: ".timeline-line",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );

            // Timeline entries stagger reveal
            gsap.fromTo(
                ".timeline-entry",
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".timeline-entry",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative min-h-screen py-28 px-6 md:px-12 bg-[#090909] overflow-hidden"
        >
            {/* Grid pattern background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    ref={gridRef}
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #333333 1px, transparent 1px),
                               linear-gradient(to bottom, #333333 1px, transparent 1px)`,
                        backgroundSize: "48px 48px",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
                    <div>
                        <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-[.2em] text-[#CBA35C] mb-3 block">
                            <TextScramble text="003 / Selected Works" />
                        </span>
                        <h2 className="projects-heading font-['var(--font-cormorant)'] text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-tight text-[#F5F5F5]">
                            Featured Projects
                        </h2>
                    </div>
                    <p className="mt-4 md:mt-0 font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] max-w-xs leading-relaxed">
                        Full-stack web applications, database architectures, and distributed services built with modern technologies.
                    </p>
                </div>

                {/* Projects grid */}
                <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {projects.map((project, index) => (
                        <Drawer
                            key={project.id}
                            onOpenChange={(open) => {
                                if (open) setSelectedProject(project);
                            }}
                        >
                            <DrawerTrigger asChild>
                                <div
                                    className={`cursor-pointer h-full ${
                                        index === 4
                                            ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto"
                                            : ""
                                    }`}
                                >
                                    <Card className="project-card group relative bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] hover:border-[#CBA35C]/60 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col justify-between">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#CBA35C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <CardContent className="p-5 md:py-6 md:px-7 flex flex-col justify-between h-full relative z-10">
                                            <div>
                                                {project.image && (
                                                    <div
                                                        className="w-full overflow-hidden rounded-xl mb-4 border border-[#232323] bg-[#090909]"
                                                        style={{ aspectRatio: "16 / 9" }}
                                                    >
                                                        <img
                                                            src={project.image}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="font-['var(--font-dm-mono)'] text-xl md:text-2xl font-light text-[#CBA35C]">
                                                        {project.number}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] px-2.5 py-1 bg-[#090909] rounded-full border border-[#232323]">
                                                            {project.year}
                                                        </span>
                                                        <div className="p-1.5 bg-[#090909] border border-[#232323] rounded-full text-[#9B9B9B] group-hover:text-[#CBA35C] group-hover:border-[#CBA35C] transition-colors">
                                                            <ArrowUpRight className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="font-['var(--font-cormorant)'] text-xl md:text-2xl font-bold text-[#F5F5F5] mb-2 group-hover:text-[#CBA35C] transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="font-['var(--font-inter)'] text-xs md:text-sm text-[#9B9B9B] leading-relaxed mb-4">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap gap-1.5 mb-3.5">
                                                    {project.tech.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="font-['var(--font-dm-mono)'] text-[10px] bg-[#090909] border border-[#232323] text-[#9B9B9B]"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-2 text-[#CBA35C] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider group-hover:gap-3 transition-all pt-2.5 border-t border-[#232323]/50">
                                                    <span>View details</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </DrawerTrigger>

                            <DrawerContent className="bg-[#090909] border-[#232323] max-h-[85vh] text-[#F5F5F5]">
                                <DrawerTitle className="sr-only">
                                    {selectedProject?.title || "Project Details"}
                                </DrawerTitle>
                                <div className="max-w-2xl mx-auto p-6 md:p-8 overflow-y-auto pb-24">
                                    {selectedProject && (
                                        <>
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <span className="font-['var(--font-dm-mono)'] text-xs text-[#CBA35C] uppercase tracking-wider mb-2 block">
                                                        {selectedProject.number} • {selectedProject.year}
                                                    </span>
                                                    <h3 className="font-['var(--font-cormorant)'] text-3xl md:text-4xl font-bold text-[#F5F5F5]">
                                                        {selectedProject.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {selectedProject.image && (
                                                <div
                                                    className="w-full overflow-hidden rounded-xl mb-6 border border-[#232323] bg-[#111111]"
                                                    style={{ aspectRatio: "16 / 9" }}
                                                >
                                                    <img
                                                        src={selectedProject.image}
                                                        alt={selectedProject.title}
                                                        className="w-full h-full object-cover"
                                                        style={{ aspectRatio: "16 / 9", objectFit: "cover" }}
                                                    />
                                                </div>
                                            )}

                                            <div className="bg-[#111111] p-6 rounded-xl border border-[#232323] mb-6">
                                                <p className="font-['var(--font-inter)'] text-sm md:text-base text-[#9B9B9B] leading-relaxed">
                                                    {selectedProject.longDescription}
                                                </p>
                                            </div>

                                            <div className="mb-6">
                                                <h4 className="font-['var(--font-cormorant)'] text-xl font-bold text-[#F5F5F5] mb-3">
                                                    Key Features
                                                </h4>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                    {selectedProject.features.map(
                                                        (feature) => (
                                                            <li
                                                                key={feature}
                                                                className="flex items-center gap-2 text-xs font-['var(--font-inter)'] text-[#9B9B9B]"
                                                            >
                                                                <CheckCircle className="w-4 h-4 text-[#CBA35C] shrink-0" />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="mb-8">
                                                <h4 className="font-['var(--font-cormorant)'] text-xl font-bold text-[#F5F5F5] mb-3">
                                                    Tech Stack
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.tech.map(
                                                        (tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="secondary"
                                                                className="font-['var(--font-dm-mono)'] text-xs bg-[#111111] border border-[#232323] text-[#F5F5F5]"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                {selectedProject.link && selectedProject.link !== "#" && (
                                                    <a
                                                        href={selectedProject.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`View live demo of ${selectedProject.title}`}
                                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CBA35C] text-[#090909] font-['var(--font-dm-mono)'] text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#d6b575] transition-colors"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Live Demo
                                                    </a>
                                                )}
                                                {selectedProject.sourceCode && (
                                                    <a
                                                        href={selectedProject.sourceCode}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={`View source code of ${selectedProject.title}`}
                                                        className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#232323] bg-[#111111] text-[#F5F5F5] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider rounded-lg hover:border-[#CBA35C] hover:text-[#CBA35C] transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                        </svg>
                                                        GitHub Repo
                                                    </a>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </DrawerContent>
                        </Drawer>
                    ))}
                </div>

                {/* Experience timeline */}
                <div className="relative">
                    <span className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-[.2em] text-[#CBA35C] mb-4 block">
                        004 / Professional Journey
                    </span>
                    <h2 className="font-['var(--font-cormorant)'] text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-[#F5F5F5] mb-12">
                        Experience
                    </h2>

                    <div className="relative pl-8">
                        {/* Vertical timeline line */}
                        <div className="timeline-line absolute left-0 top-0 bottom-0 w-px bg-[#232323]" />

                        {/* Timeline entries */}
                        <div className="space-y-12">
                            {experience.map((item, index) => (
                                <div
                                    key={index}
                                    className="timeline-entry relative bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] rounded-2xl p-6 md:p-8"
                                >
                                    <div className="absolute -left-[41px] top-8 w-4 h-4 bg-[#090909] border-2 border-[#CBA35C] rounded-full" />
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-[#232323]">
                                        <div>
                                            <h3 className="font-['var(--font-cormorant)'] text-2xl font-bold text-[#F5F5F5]">
                                                {item.role}
                                            </h3>
                                            <p className="font-['var(--font-dm-mono)'] text-xs text-[#CBA35C] uppercase tracking-wider mt-1">
                                                {item.company}
                                            </p>
                                        </div>
                                        <span className="font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] px-3 py-1 bg-[#090909] rounded-full border border-[#232323] self-start sm:self-auto">
                                            {item.period}
                                        </span>
                                    </div>

                                    <ul className="space-y-2.5">
                                        {item.highlights.map((highlight, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2.5 text-sm font-['var(--font-inter)'] text-[#9B9B9B]"
                                            >
                                                <CheckCircle className="w-4 h-4 text-[#CBA35C] shrink-0 mt-0.5" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
