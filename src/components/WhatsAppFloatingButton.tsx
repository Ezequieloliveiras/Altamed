import Image from "next/image";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const message =
  "Olá! Gostaria de mais informações sobre os produtos da ALTAMED.";

export function WhatsAppFloatingButton() {
  return (
    <a
      className="whatsapp-floating-button"
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <span className="whatsapp-floating-tooltip" role="tooltip">
        Fale conosco pelo WhatsApp
      </span>
      <Image
        src="/images/whatsapp.svg"
        alt=""
        width={28}
        height={28}
        aria-hidden="true"
      />
    </a>
  );
}
