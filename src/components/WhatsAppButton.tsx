"use client";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = { productName?: string; label?: string };
export function WhatsAppButton({
  productName,
  label = "Solicitar informações",
}: Props) {
  const message = productName
    ? `Olá, vim através do site com o produto ${productName} e gostaria de mais informações.`
    : "Olá, gostaria de mais informações.";
  return (
    <a
      className="button"
      target="_blank"
      rel="noreferrer"
      href={buildWhatsAppUrl(message)}
    >
      {label}
    </a>
  );
}
