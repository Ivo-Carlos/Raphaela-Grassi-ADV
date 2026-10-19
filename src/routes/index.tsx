import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Lock, Scale, MapPin, Gavel, Leaf, Landmark, ShieldAlert, Wallet, FileSearch, KeyRound, FileText, Phone, ChevronDown,
} from "lucide-react";
import logo from "@/assets/logo.webp";
import photo from "@/assets/home-raphaela.webp";
import aboutPhoto from "@/assets/about-raphaela.webp";
import { ContactButton, ContactPair, WhatsAppIcon } from "@/components/site/ContactButtons";
import { Section, SectionHeading } from "@/components/site/Section";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { DEFAULT_MESSAGE, phoneHref, whatsappHref } from "@/config/contact";
import { track } from "@/lib/tracking";

const TITLE = "Advogada Criminalista em Campo Grande MS | Flagrante | Raphaela Grassi";
const DESC = "Assistência jurídica em prisões em flagrante, audiências de custódia e defesa criminal em Campo Grande/MS. Dra. Raphaela Grassi — OAB/MS 31.969.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: "Raphaela Grassi — Advocacia e Consultoria",
        description: DESC,
        areaServed: { "@type": "City", name: "Campo Grande", containedInPlace: "Mato Grosso do Sul" },
        address: { "@type": "PostalAddress", addressLocality: "Campo Grande", addressRegion: "MS", addressCountry: "BR" },
        employee: { "@type": "Person", name: "Raphaela Grassi", jobTitle: "Advogada", identifier: "OAB/MS 31.969" },
      }),
    }],
  }),
  component: Index,
});

const msg = (s: string) => `Olá, Dra. Raphaela. Preciso de orientação jurídica sobre ${s}.`;

const CARDS = [
  { icon: Gavel, t: "Prisão em flagrante", d: "Acompanhamento jurídico desde os primeiros procedimentos relacionados à prisão.", m: "uma prisão em flagrante" },
  { icon: Leaf, t: "Flagrante por tráfico de drogas", d: "Assistência jurídica em prisões e investigações relacionadas à Lei de Drogas.", m: "um flagrante por tráfico de drogas" },
  { icon: Landmark, t: "Audiência de custódia", d: "Orientação e atuação na apresentação da pessoa presa à autoridade judicial.", m: "uma audiência de custódia" },
  { icon: ShieldAlert, t: "Violência doméstica", d: "Assistência jurídica em situações envolvendo prisão, investigação e medidas legais.", m: "um caso de violência doméstica" },
  { icon: Wallet, t: "Furto, roubo e receptação", d: "Defesa criminal em procedimentos relacionados a crimes patrimoniais.", m: "um caso de furto, roubo ou receptação" },
  { icon: FileSearch, t: "Investigação policial", d: "Acompanhamento jurídico em depoimentos, intimações e inquéritos.", m: "uma investigação policial" },
  { icon: KeyRound, t: "Pedido de liberdade", d: "Análise das possibilidades legais de liberdade e das medidas cabíveis.", m: "um pedido de liberdade" },
  { icon: FileText, t: "Outras situações criminais", d: "Orientação jurídica em outras situações envolvendo prisões e procedimentos criminais.", m: "uma situação criminal" },
];

const STEPS = [
  ["01", "Entre em contato", "Fale pelo WhatsApp ou telefone e informe brevemente a situação."],
  ["02", "Explique o ocorrido", "Informe o que aconteceu, onde a pessoa está e quais informações já possui."],
  ["03", "Análise jurídica", "A advogada analisa as circunstâncias e identifica as possibilidades jurídicas cabíveis."],
  ["04", "Orientação e acompanhamento", "São esclarecidos os próximos passos e as possibilidades de atuação no caso."],
];

const FAQ = [
  ["O que fazer quando um familiar é preso em flagrante?", "Mantenha a calma, procure saber para qual delegacia a pessoa foi levada e reúna dados básicos, como nome completo, documento e o que se sabe sobre o ocorrido. O contato com uma advogada criminalista permite avaliar a situação e orientar sobre os procedimentos cabíveis."],
  ["A pessoa presa tem direito a advogado na delegacia?", "Sim. A Constituição Federal assegura à pessoa presa o direito à assistência de advogado e o direito de permanecer em silêncio. A advogada pode acompanhar a pessoa durante os procedimentos realizados na delegacia."],
  ["Como funciona uma audiência de custódia?", "Em regra, a pessoa presa em flagrante deve ser apresentada a um juiz em até 24 horas. Na audiência, são analisadas a legalidade da prisão e a necessidade de sua manutenção, podendo ser avaliadas medidas como a liberdade provisória, conforme cada caso."],
  ["É possível obter liberdade após uma prisão em flagrante?", "A lei prevê hipóteses de liberdade provisória, com ou sem fiança, e de medidas cautelares diversas da prisão. A possibilidade depende das circunstâncias concretas, e nenhum resultado pode ser garantido antecipadamente."],
  ["O que acontece depois da prisão em flagrante?", "Após a lavratura do auto de prisão, o caso é comunicado ao Judiciário e ocorre a audiência de custódia. Em seguida, pode haver inquérito policial e eventual processo, etapas em que o acompanhamento jurídico pode ser importante."],
  ["Quais informações devo passar para a advogada?", "Nome completo da pessoa, local onde ela se encontra, data e horário aproximados do ocorrido, o que foi informado à família e eventuais documentos. Não é necessário conhecer termos jurídicos."],
  ["A advogada pode acompanhar procedimentos na delegacia?", "Sim. A atuação de advogada é permitida em procedimentos policiais, como depoimentos e interrogatórios, observadas as regras legais. A viabilidade de atendimento é verificada no momento do contato."],
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-rose/15 transition-all duration-300 ${scrolled ? "bg-ink/80 backdrop-blur-lg" : "bg-ink"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 md:h-20">
        <a href="#inicio" className="shrink-0" aria-label="Raphaela Grassi — início">
          <img src={logo.url} alt="Raphaela Grassi Advocacia e Consultoria" width={800} height={173} className="h-9 w-auto md:h-11" />
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground lg:flex">
          <a href="#atuacao" className="transition-colors hover:text-rose">Atuação</a>
          <a href="#sobre" className="transition-colors hover:text-rose">Sobre</a>
          <a href="#duvidas" className="transition-colors hover:text-rose">Dúvidas</a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ContactButton section="header" kind="phone" label="Ligar" className="min-h-11 px-4 py-2 text-xs" />
          <ContactButton section="header" kind="whatsapp" label="WhatsApp" className="min-h-11 px-4 py-2 text-xs" />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-hero pt-16 md:pt-20">
      <div className="pointer-events-none absolute -right-40 top-10 h-[600px] w-[600px] rounded-full bg-copper/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-end gap-6 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 py-7 md:py-20 lg:py-28">
          <p className="eyebrow mb-4 md:mb-5">Advocacia criminal em Campo Grande/MS</p>
          <h1 className="text-[2.15rem] leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            <span className="text-copper-gradient italic">Prisão em flagrante?</span> Sua defesa começa com orientação jurídica.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
            Um familiar foi preso ou está sendo conduzido à delegacia? A Dra. Raphaela Grassi oferece assistência jurídica criminal, com análise individual do caso e acompanhamento dos procedimentos cabíveis.
          </p>
          <aside className="mt-4 flex max-w-xl items-start gap-3 rounded-md border border-rose/40 bg-wine px-4 py-3 md:mt-5" aria-label="Atendimento no local">
            <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-readable" />
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-relaxed text-cream">Atendimento no local do flagrante ou na delegacia</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Possibilidade de deslocamento imediato após o contato, conforme a disponibilidade e as circunstâncias do caso.</p>
            </div>
          </aside>
          <ContactPair section="hero" className="mt-5 md:mt-6" />
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground md:mt-8">
            {[[Lock, "Atendimento sigiloso"], [Scale, "Defesa criminal"], [MapPin, "Campo Grande/MS"]].map(([I, t]) => {
              const Icon = I as typeof Lock;
              return <li key={t as string} className="flex items-center gap-2"><Icon className="h-4 w-4 text-rose" />{t as string}</li>;
            })}
          </ul>
        </div>
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="absolute inset-x-6 bottom-0 top-16 rounded-t-full border border-rose/25" />
          <img
            src={photo.url}
            alt="Dra. Raphaela Grassi, advogada criminalista em Campo Grande/MS"
            width={585} height={942}
            fetchPriority="high"
            className="relative h-[620px] w-full object-cover object-top [mask-image:radial-gradient(ellipse_70%_75%_at_50%_35%,black_55%,transparent_100%)]"
          />
          <div className="absolute bottom-10 left-0 rounded-md border border-rose/30 bg-ink/80 px-5 py-3 backdrop-blur">
            <p className="font-display text-lg text-cream">Dra. Raphaela Grassi</p>
            <p className="text-xs tracking-widest text-rose">OAB/MS 31.969</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Situations() {
  return (
    <Section id="atuacao" name="situacoes" className="bg-ink">
      <SectionHeading eyebrow="Áreas de atuação" title="Em quais situações a assistência criminal pode ser necessária?" subtitle="Cada situação exige uma análise jurídica individual. Conheça alguns casos em que o acompanhamento de uma advogada criminalista pode ser importante." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ icon: Icon, t, d, m }, i) => (
          <article key={t} style={{ transitionDelay: `${i * 60}ms` }} className="reveal group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rose/60 hover:shadow-soft">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-rose/30 text-rose transition-colors group-hover:bg-rose/10">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <h3 className="text-xl text-cream">{t}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d}</p>
            <ContactButton section="situacoes" kind="whatsapp" label="Falar pelo WhatsApp" subject={t} message={msg(m)} className="mt-6 min-h-12 w-full px-3 py-3 text-sm" />
          </article>
        ))}
      </div>
      <ContactPair section="situacoes_rodape" whatsappLabel="Falar com a advogada" phoneLabel="Ligar agora" className="mt-14 justify-center" />
    </Section>
  );
}

function Video() {
  return (
    <Section id="video" name="video" className="bg-wine">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal"><VideoPlayer /></div>
        <div className="reveal">
          <SectionHeading center={false} eyebrow="Vídeo explicativo" title="Entenda a importância da defesa nos primeiros momentos de uma prisão." subtitle="A Dra. Raphaela Grassi explica como funciona a assistência jurídica em situações de flagrante e por que cada caso precisa de uma avaliação individual." />
          <ContactPair section="video" whatsappLabel="Preciso de orientação — WhatsApp" message={msg("uma prisão em flagrante (vi seu vídeo)")} />
        </div>
      </div>
    </Section>
  );
}

function Steps() {
  return (
    <Section id="atendimento" name="como_funciona" className="bg-surface-light">
      <SectionHeading light eyebrow="Atendimento" title="Como funciona o atendimento jurídico?" subtitle="Informações claras ajudam a compreender a situação e identificar os próximos passos possíveis." />
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(([n, t, d], i) => (
          <li key={n} style={{ transitionDelay: `${i * 80}ms` }} className="reveal relative border-t border-copper/40 pt-6">
            <span className="font-display text-6xl text-copper">{n}</span>
            <h3 className="mt-3 text-xl text-cream-foreground">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-foreground/70">{d}</p>
          </li>
        ))}
      </ol>
      <p className="reveal mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-cream-foreground md:text-lg">
        Cada situação exige uma análise individual e uma orientação jurídica adequada desde os primeiros procedimentos.
      </p>
      <ContactPair section="como_funciona" light className="mt-8 justify-center" />
    </Section>
  );
}

function About() {
  return (
    <Section id="sobre" name="sobre" className="overflow-hidden bg-wine">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-lg border border-rose/30" />
          <img src={aboutPhoto.url} alt="Retrato da Dra. Raphaela Grassi, OAB/MS 31.969" loading="lazy" width={832} height={1248} className="relative aspect-[4/5] w-full rounded-lg object-cover object-top shadow-soft" />
        </div>
        <div className="reveal">
          <p className="eyebrow mb-4">Sobre a advogada</p>
          <h2 className="text-3xl leading-tight text-cream md:text-5xl">Conheça a Dra. Raphaela Grassi</h2>
          <div className="my-6 h-px w-16 bg-copper-gradient" />
          <div className="mb-6 border-l-2 border-copper pl-4">
            <p className="font-display text-2xl text-cream">Raphaela Grassi</p>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Advocacia e Consultoria</p>
            <p className="mt-1 text-sm font-semibold tracking-widest text-rose">OAB/MS 31.969</p>
          </div>
          <p className="leading-relaxed text-muted-foreground md:text-lg">
            A Dra. Raphaela Grassi atua na advocacia e consultoria jurídica, com atendimento pautado na responsabilidade profissional, no sigilo e na análise individualizada de cada situação. Seu trabalho busca oferecer orientação clara e acompanhamento jurídico adequado às particularidades de cada caso.
          </p>
          {/* Campos editáveis: adicione formação, trajetória e informações profissionais confirmadas aqui. */}
          <ContactPair section="sobre" whatsappLabel="Falar com a Dra. Raphaela" phoneLabel="Ligar agora" className="mt-8" />
        </div>
      </div>
    </Section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="duvidas" name="faq" className="bg-ink">
      <SectionHeading eyebrow="Dúvidas" title="Dúvidas frequentes sobre prisão em flagrante" />
      <div className="reveal mx-auto max-w-3xl divide-y divide-border border-y border-border">
        {FAQ.map(([q, a], i) => (
          <div key={q}>
            <h3 className="font-sans">
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-cream transition-colors hover:text-rose md:text-lg">
                {q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-rose transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden leading-relaxed text-muted-foreground">{a}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-xs text-muted-foreground/70">As respostas têm caráter informativo e não substituem a análise individual do caso.</p>
      <ContactPair section="faq" className="mt-10 justify-center" />
    </Section>
  );
}

function FinalCta() {
  return (
    <Section id="contato" name="cta_final" className="bg-hero py-28 md:py-36">
      <div className="reveal mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-5">Contato</p>
        <h2 className="text-3xl leading-tight text-cream md:text-5xl">Em uma prisão em flagrante, <span className="text-accent-readable">cada momento importa.</span></h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Precisa de assistência jurídica na delegacia? Entre em contato com a Dra. Raphaela Grassi para apresentar a situação e verificar a possibilidade de atendimento e deslocamento imediato ao local.</p>
        <p className="mx-auto mt-5 flex max-w-xl items-start justify-center gap-2 text-sm leading-relaxed text-muted-foreground"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent-readable" />Atendimento em Campo Grande/MS e região, conforme disponibilidade.</p>
        <ContactPair section="cta_final" whatsappLabel="Conversar pelo WhatsApp" className="mt-10 justify-center" />
        <p className="mt-10 font-display text-lg text-cream">Raphaela Grassi — OAB/MS 31.969</p>
        <p className="text-sm text-muted-foreground">Campo Grande/MS</p>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-rose/15 bg-ink px-5 pb-28 pt-14 sm:px-8 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <img src={logo.url} alt="Raphaela Grassi Advocacia e Consultoria" loading="lazy" width={800} height={173} className="h-10 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Raphaela Grassi — Advocacia e Consultoria<br />OAB/MS 31.969 · Campo Grande/MS</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Contato</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href={whatsappHref(DEFAULT_MESSAGE) ?? "#contato"} onClick={() => track("click_whatsapp", { section_name: "footer", button_text: "WhatsApp", contact_type: "whatsapp" })} className="hover:text-rose">WhatsApp</a></li>
            <li><a href={phoneHref() ?? "#contato"} onClick={() => track("click_phone", { section_name: "footer", button_text: "Telefone", contact_type: "phone" })} className="hover:text-rose">Telefone</a></li>
          </ul>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Informações</p>
          <Link to="/privacidade" className="hover:text-rose">Política de privacidade</Link>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} Raphaela Grassi. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function FloatingContacts() {
  const wa = () => track("click_whatsapp", { section_name: "flutuante", button_text: "WhatsApp", contact_type: "whatsapp" });
  const ph = () => track("click_phone", { section_name: "flutuante", button_text: "Ligar agora", contact_type: "phone" });
  const guard = (href?: string) => (e: React.MouseEvent) => { if (!href) { e.preventDefault(); alert("Número de contato ainda não configurado."); } };
  const waHref = whatsappHref(DEFAULT_MESSAGE), phHref = phoneHref();
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 md:flex">
        <a href={phHref ?? "#"} onClick={(e) => { guard(phHref)(e); if (phHref) ph(); }} aria-label="Ligar para a advogada" className="contact-target flex h-14 w-14 items-center justify-center rounded-full bg-copper-gradient text-primary-foreground shadow-copper transition-transform hover:scale-110"><Phone className="h-6 w-6" /></a>
        <a href={waHref ?? "#"} target="_blank" rel="noopener noreferrer" onClick={(e) => { guard(waHref)(e); if (waHref) wa(); }} aria-label="Falar pelo WhatsApp" className="contact-target flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-cream shadow-soft transition-transform hover:scale-110"><WhatsAppIcon className="h-7 w-7" /></a>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-rose/20 bg-ink/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a href={phHref ?? "#"} onClick={(e) => { guard(phHref)(e); if (phHref) ph(); }} className="contact-target flex min-h-12 items-center justify-center gap-2 rounded-md bg-copper-gradient text-sm font-semibold uppercase tracking-normal text-primary-foreground transition hover:brightness-110"><Phone className="h-5 w-5" />Ligar</a>
        <a href={waHref ?? "#"} target="_blank" rel="noopener noreferrer" onClick={(e) => { guard(waHref)(e); if (waHref) wa(); }} className="contact-target flex min-h-12 items-center justify-center gap-2 rounded-md bg-whatsapp text-sm font-semibold uppercase tracking-normal text-cream transition hover:brightness-110"><WhatsAppIcon className="h-5 w-5" />WhatsApp</a>
      </div>
    </>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Situations />
        <Video />
        <Steps />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
