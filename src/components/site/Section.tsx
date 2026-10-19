import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { trackSectionOnce } from "@/lib/tracking";

export function Section({ id, name, className, children }: { id: string; name: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          trackSectionOnce(name);
          el.querySelectorAll(".reveal").forEach((r) => r.classList.add("is-visible"));
          io.disconnect();
        }
      }),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name]);
  return (
    <section ref={ref} id={id} className={cn("relative px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, light, center = true }: { eyebrow?: string; title: ReactNode; subtitle?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={cn("reveal mb-12 max-w-3xl md:mb-16", center && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow mb-4", light && "text-copper")}>{eyebrow}</p>}
      <h2 className={cn("text-3xl leading-tight md:text-5xl", light ? "text-cream-foreground" : "text-cream")}>{title}</h2>
      <div className={cn("my-6 h-px w-16 bg-copper-gradient", center && "mx-auto")} />
      {subtitle && <p className={cn("text-base leading-relaxed md:text-lg", light ? "text-cream-foreground/75" : "text-muted-foreground")}>{subtitle}</p>}
    </div>
  );
}
