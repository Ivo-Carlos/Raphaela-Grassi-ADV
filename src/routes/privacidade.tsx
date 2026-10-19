import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Raphaela Grassi Advocacia" },
      { name: "description", content: "Como o site de Raphaela Grassi — Advocacia e Consultoria trata dados de navegação e contatos." },
      { property: "og:title", content: "Política de Privacidade | Raphaela Grassi Advocacia" },
      { property: "og:description", content: "Tratamento de dados de navegação e contatos no site da Dra. Raphaela Grassi." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl px-5 py-20 text-muted-foreground">
      <h1 className="mb-8 text-4xl text-cream">Política de Privacidade</h1>
      <div className="space-y-4 leading-relaxed">
        <p>Este site tem caráter informativo. Ao clicar nos botões de WhatsApp ou telefone, você é direcionado a esses serviços, e as informações que compartilhar serão tratadas com sigilo profissional.</p>
        <p>Podemos utilizar ferramentas de medição (como Google Analytics e Google Ads) para entender o uso do site, registrando dados de navegação como páginas visitadas e cliques em botões de contato.</p>
        <p>Para dúvidas sobre seus dados, entre em contato pelos canais indicados no site.</p>
      </div>
      <Link to="/" className="mt-10 inline-block text-rose hover:underline">← Voltar ao início</Link>
    </main>
  ),
});
