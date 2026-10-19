// ============================================================
// CONFIGURAÇÃO GLOBAL DE CONTATOS
// Preencha apenas com dígitos: DDD + número (ex.: "67999999999").
// Enquanto estiver "PREENCHER", os botões não abrem links falsos.
// ============================================================
export const WHATSAPP_NUMBER = "67984013668";
export const PHONE_NUMBER = "67984013668";

// URL do vídeo explicativo (MP4/WebM) e legendas (.vtt). Deixe "" até enviar.
export const VIDEO_URL = "";
export const VIDEO_CAPTIONS_URL = "";
export const YOUTUBE_VIDEO_ID = "1usOUXGf204";

const digits = (v: string) => v.replace(/\D/g, "");
export const isConfigured = (v: string) => digits(v).length >= 10;

export function whatsappHref(message: string): string | undefined {
  if (!isConfigured(WHATSAPP_NUMBER)) return undefined;
  return `https://wa.me/55${digits(WHATSAPP_NUMBER)}?text=${encodeURIComponent(message)}`;
}

export function phoneHref(): string | undefined {
  if (!isConfigured(PHONE_NUMBER)) return undefined;
  return `tel:+55${digits(PHONE_NUMBER)}`;
}

export const DEFAULT_MESSAGE =
  "Olá, Dra. Raphaela. Preciso de orientação jurídica sobre uma prisão em flagrante.";
