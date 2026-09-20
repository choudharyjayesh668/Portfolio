import { useParams, Link, useNavigate } from "react-router-dom";
import { ACHIEVEMENTS_CONFIG } from "@/lib/achievements";
import { X, Award, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CertificatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const achievement = ACHIEVEMENTS_CONFIG.find((a) => a.id === id);

  if (!achievement) {
    return (
      <main className="relative min-h-screen w-full bg-[#090909] text-[#F5F5F5] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-['var(--font-cormorant)'] font-bold mb-4">Certificate Not Found</h1>
        <p className="text-sm font-['var(--font-dm-mono)'] text-[#9B9B9B] mb-6">
          The requested certificate or milestone could not be found.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-[#CBA35C] text-[#090909] hover:bg-[#d6b575] font-['var(--font-dm-mono)'] text-xs uppercase"
        >
          Return Home
        </Button>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full bg-[#090909] text-[#F5F5F5] flex items-center justify-center overflow-hidden p-6 md:p-12">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#090909] via-[#111111] to-[#090909] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#CBA35C]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation UI */}
      <div className="absolute top-0 left-0 w-full z-20 p-6 md:p-10 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <Link to="/#achievements">
          <Button variant="ghost" className="text-[#F5F5F5] hover:bg-white/10 gap-2 font-['var(--font-dm-mono)'] uppercase tracking-widest text-xs">
            <ChevronLeft className="w-4 h-4 text-[#CBA35C]" /> Back to Site
          </Button>
        </Link>
        <Link to="/#achievements">
          <Button variant="ghost" size="icon" className="text-[#9B9B9B] hover:text-[#F5F5F5] hover:bg-white/10 rounded-full" title="Close">
            <X className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-3xl pt-16 flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-[#111111] to-[#141414] border border-[#232323] p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden text-center">
          <div className="w-16 h-16 bg-[#CBA35C]/10 border border-[#CBA35C]/30 text-[#CBA35C] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8" />
          </div>

          <div className="flex justify-center gap-2 mb-4">
            {achievement.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-['var(--font-dm-mono)'] text-xs bg-[#090909] border border-[#232323] text-[#CBA35C]">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-['var(--font-cormorant)'] font-bold text-[#F5F5F5] mb-3">
            {achievement.title}
          </h1>
          <p className="text-[#CBA35C] font-['var(--font-dm-mono)'] text-sm mb-6 uppercase tracking-wider">
            {achievement.issuer} • {achievement.date}
          </p>

          <p className="text-[#9B9B9B] font-['var(--font-inter)'] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            {achievement.longDescription}
          </p>

          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#CBA35C] text-[#090909] font-['var(--font-dm-mono)'] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#d6b575] transition-all"
            >
              Verify Achievement
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
