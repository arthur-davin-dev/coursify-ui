"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Plus_Jakarta_Sans, Kantumruy_Pro } from "next/font/google";
import { useTranslation } from "react-i18next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

export default function BannerCourse() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const bannerRef = useRef<HTMLElement>(null);
  
  const isKhmer = i18n.language === "kh";

  useEffect(() => {
    const els = bannerRef.current?.querySelectorAll("[data-reveal]");
    els?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(25px)";
      setTimeout(() => {
        htmlEl.style.transition = "opacity 0.7s cubic-bezier(0.2, 1, 0.3, 1), transform 0.7s cubic-bezier(0.2, 1, 0.3, 1)";
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      }, 150 + (100 * i));
    });
  }, [i18n.language]);

  return (
    <section
      ref={bannerRef}
      className={`${isKhmer ? kantumruy.className : jakarta.className} w-full overflow-hidden relative bg-background transition-colors duration-500`}
    >
      {/* ── Decorative Background Blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[0%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 bg-primary dark:opacity-10" />
        <div className="absolute bottom-[-10%] left-[5%] w-[450px] h-[450px] rounded-full blur-[100px] opacity-15 bg-accent dark:opacity-10" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-20 container mx-auto px-6 lg:px-12">
        
        {/* ── Left Side: Typography & CTAs ── */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          {/* Badge */}
          <div data-reveal className="inline-flex items-center gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/20 bg-primary/10 text-primary-600 dark:text-primary-400 flex items-center gap-2">
              <Sparkles size={14} />
              {t("Digital Course")}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 text-foreground tracking-tight">
            <span data-reveal className="block text-primary-600 dark:text-primary-500">
              {t("Search & review")}
            </span>
            <span data-reveal className="block">
              {t("your")} <span className="text-accent-600 dark:text-accent-400">{t("favorite Course")}</span>
            </span>
          </h1>

          {/* Description */}
          <p data-reveal className="text-muted-foreground leading-relaxed mb-10 text-lg lg:text-xl max-w-[540px] mx-auto lg:mx-0">
            {t("HeroDescription")}
          </p>

          {/* Actions */}
          <div data-reveal className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
            <button
              onClick={() => router.push("/courses")}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 active:scale-95 flex items-center gap-2"
            >
              {t("Explore Course")}
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => router.push("/about")}
              className="px-8 py-4 rounded-xl border border-border bg-secondary/50 text-secondary-foreground font-bold text-sm transition-all hover:bg-secondary active:scale-95"
            >
              {t("About us")}
            </button>
          </div>

          {/* Stats Bar */}
          <div data-reveal className="flex items-center justify-center lg:justify-start gap-10 mt-12 border-t border-border pt-8">
            {[
              { value: "1.2k+", label: t("Courses") },
              { value: "450+", label: t("Readers") },
              { value: "4.9★", label: "Rating" },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex flex-col">
                <span className="text-2xl font-black text-foreground">{value}</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Side: Image/Illustration ── */}
        <div data-reveal className="relative lg:w-1/2 flex justify-center items-center">
          {/* Animated Dashed Circle */}
          <div className="absolute w-[85%] aspect-square rounded-full border-2 border-dashed border-primary/20 animate-[spin_40s_linear_infinite]" />
          
          <div className="relative z-10 w-full max-w-[500px] animate-[hero-float_5s_ease-in-out_infinite]">
            <Image
              src="/bro.png"
              alt="Hero Illustration"
              width={600}
              height={600}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
      `}</style>
    </section>
  );
}