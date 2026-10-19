import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_MESSAGE, phoneHref, whatsappHref } from "@/config/contact";
import { track } from "@/lib/tracking";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.3 11.3 0 0 0 5.76 1.47h.01c6.25 0 11.34-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

const base =
  "contact-target inline-flex min-h-12 max-w-full items-center justify-center gap-3 rounded-md px-5 py-3 text-sm font-semibold uppercase leading-relaxed tracking-normal text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  whatsapp: "bg-copper-gradient text-primary-foreground shadow-copper hover:brightness-110 hover:-translate-y-0.5",
  phone: "border border-muted-foreground/70 text-cream hover:bg-rose/10 hover:border-rose",
  phoneLight: "border border-cream-foreground/40 text-cream-foreground hover:bg-copper/10 hover:border-copper",
};

type Props = {
  section: string;
  label: string;
  kind: "whatsapp" | "phone";
  message?: string | undefined;
  subject?: string | undefined;
  light?: boolean | undefined;
  className?: string;
};

export function ContactButton({ section, label, kind, message = DEFAULT_MESSAGE, subject, light, className }: Props) {
  const href = kind === "whatsapp" ? whatsappHref(message) : phoneHref();
  const variant = kind === "whatsapp" ? variants.whatsapp : light ? variants.phoneLight : variants.phone;
  const onClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault();
      alert("Número de contato ainda não configurado.");
      return;
    }
    track(kind === "whatsapp" ? "click_whatsapp" : "click_phone", {
      section_name: section,
      button_text: label,
      contact_type: kind,
      ...(subject ? { card_subject: subject } : {}),
    });
  };
  return (
    <a
      href={href ?? "#"}
      onClick={onClick}
      target={kind === "whatsapp" ? "_blank" : undefined}
      rel={kind === "whatsapp" ? "noopener noreferrer" : undefined}
      className={cn(base, variant, className)}
    >
      {kind === "whatsapp" ? <WhatsAppIcon className="h-5 w-5 shrink-0" /> : <Phone className="h-5 w-5 shrink-0" />}
      {label}
    </a>
  );
}

export function ContactPair({
  section, whatsappLabel = "Falar pelo WhatsApp", phoneLabel = "Ligar para a advogada", message, light, className,
}: { section: string; whatsappLabel?: string; phoneLabel?: string; message?: string; light?: boolean; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <ContactButton section={section} kind="whatsapp" label={whatsappLabel} message={message} />
      <ContactButton section={section} kind="phone" label={phoneLabel} light={light} />
    </div>
  );
}
