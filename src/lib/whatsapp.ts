const DEFAULT_WHATSAPP_PHONE = "5527999967774";

export function getWhatsAppPhone() {
  return (
    process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") ||
    DEFAULT_WHATSAPP_PHONE
  );
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${getWhatsAppPhone()}?text=${encodeURIComponent(message)}`;
}
