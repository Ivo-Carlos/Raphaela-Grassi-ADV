// Camada de eventos para GTM / GA4 / Google Ads via window.dataLayer.
// Instale o GTM depois e crie gatilhos para estes eventos.
declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

const fired = new Map<string, number>();

export function track(event: string, params: Record<string, unknown> = {}, dedupeMs = 1500) {
  if (typeof window === "undefined") return;
  const key = event + JSON.stringify(params);
  const now = Date.now();
  if ((fired.get(key) ?? 0) > now - dedupeMs) return; // evita conversões duplicadas por duplo clique
  fired.set(key, now);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

const seenSections = new Set<string>();
export function trackSectionOnce(section: string) {
  if (seenSections.has(section)) return;
  seenSections.add(section);
  track("section_view", { section_name: section }, 0);
}
