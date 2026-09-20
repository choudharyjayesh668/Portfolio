import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerTitle,
    DrawerClose,
    DrawerHeader,
} from "@/components/ui/drawer";
import { Award, ExternalLink, X } from "lucide-react";
import { TextScramble } from "@/components/shared/TextScramble";
import { Button } from "@/components/ui/button";
import { ACHIEVEMENTS_CONFIG } from "@/lib/achievements";

export default function Achievements() {
    const sectionRef = useRef(null);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading clip reveal
            gsap.fromTo(
                ".achievements-heading",
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".achievements-heading",
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                },
            );

            // Achievement cards stagger fade-up
            gsap.fromTo(
                ".achievement-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".achievements-grid",
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="achievements"
            ref={sectionRef}
            className="relative min-h-screen py-28 px-6 md:px-12 bg-[#090909] overflow-hidden"
        >
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
                    <div>
                        <span className="font-['var(--font-dm-mono)'] text-xs uppercase tracking-[.2em] text-[#CBA35C] mb-3 block">
                            <TextScramble text="005 / Milestones" />
                        </span>
                        <h2 className="achievements-heading font-['var(--font-cormorant)'] text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-tight text-[#F5F5F5]">
                            Key Highlights
                        </h2>
                    </div>
                    <p className="mt-4 md:mt-0 font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] max-w-xs leading-relaxed">
                        Recognition, engineering milestones, open-source work, and key accomplishments.
                    </p>
                </div>

                {/* Achievements grid */}
                <div className="achievements-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ACHIEVEMENTS_CONFIG.map((achievement) => (
                        <Drawer
                            key={achievement.id}
                            onOpenChange={(open) => {
                                if (open) setSelectedAchievement(achievement);
                            }}
                        >
                            <DrawerTrigger asChild>
                                <div className="cursor-pointer h-full">
                                    <Card className="achievement-card group relative bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] hover:border-[#CBA35C]/60 transition-all duration-300 rounded-2xl overflow-hidden h-full flex flex-col justify-between">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#CBA35C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        <CardContent className="p-6 md:p-8 flex flex-col justify-between h-full relative z-10">
                                            <div>
                                                <div className="flex justify-between items-center mb-5">
                                                    <div className="p-2.5 bg-[#090909] border border-[#232323] rounded-xl text-[#CBA35C]">
                                                        <Award className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-['var(--font-dm-mono)'] text-xs text-[#9B9B9B] px-2.5 py-1 bg-[#090909] rounded-full border border-[#232323]">
                                                        {achievement.date}
                                                    </span>
                                                </div>

                                                <h3 className="font-['var(--font-cormorant)'] text-2xl font-bold text-[#F5F5F5] mb-2 group-hover:text-[#CBA35C] transition-colors min-h-[3.5rem] flex items-center">
                                                    {achievement.title}
                                                </h3>
                                                <p className="text-xs text-[#CBA35C] font-['var(--font-dm-mono)'] uppercase tracking-wider mb-3">
                                                    {achievement.issuer}
                                                </p>
                                                <p className="font-['var(--font-inter)'] text-sm text-[#9B9B9B] leading-relaxed mb-6">
                                                    {achievement.description}
                                                </p>
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap gap-1.5 mb-5 min-h-[1.75rem] items-center">
                                                    {achievement.tags.map((tag) => (
                                                        <Badge
                                                            key={tag}
                                                            variant="secondary"
                                                            className="font-['var(--font-dm-mono)'] text-[10px] bg-[#090909] border border-[#232323] text-[#9B9B9B]"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-2 text-[#CBA35C] font-['var(--font-dm-mono)'] text-xs uppercase tracking-wider group-hover:gap-3 transition-all pt-3 border-t border-[#232323]/60">
                                                    <span>View details</span>
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </DrawerTrigger>

                            <DrawerContent className="bg-[#090909] border-[#232323] max-h-[85vh] text-[#F5F5F5]">
                                <DrawerTitle className="sr-only">
                                    {selectedAchievement?.title || "Achievement Details"}
                                </DrawerTitle>
                                <div className="max-w-2xl mx-auto p-6 md:p-8 overflow-y-auto pb-24">
                                    <DrawerHeader className="px-0 pt-0">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-2 flex-wrap">
                                                {selectedAchievement?.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="secondary"
                                                        className="font-['var(--font-dm-mono)'] text-[10px] uppercase tracking-wider bg-[#111111] border border-[#232323] text-[#CBA35C]"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <DrawerClose asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-full hover:bg-neutral-800 text-[#9B9B9B]"
                                                >
                                                    <X className="w-5 h-5" />
                                                </Button>
                                            </DrawerClose>
                                        </div>
                                        <h3 className="font-['var(--font-cormorant)'] text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-2 leading-tight">
                                            {selectedAchievement?.title}
                                        </h3>
                                        <p className="font-['var(--font-dm-mono)'] text-sm text-[#CBA35C]">
                                            {selectedAchievement?.issuer} • {selectedAchievement?.date}
                                        </p>
                                    </DrawerHeader>

                                    <div className="space-y-6 pt-4">
                                        <div className="bg-[#111111] p-6 rounded-xl border border-[#232323]">
                                            <p className="font-['var(--font-inter)'] text-sm md:text-base text-[#9B9B9B] leading-relaxed">
                                                {selectedAchievement?.longDescription}
                                            </p>
                                        </div>

                                        {selectedAchievement?.link && (
                                            <div>
                                                <a
                                                    href={selectedAchievement.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#CBA35C] text-[#090909] font-['var(--font-dm-mono)'] text-xs uppercase font-semibold tracking-wider rounded-lg hover:bg-[#d6b575] transition-colors"
                                                >
                                                    View on GitHub
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    ))}
                </div>
            </div>
        </section>
    );
}
