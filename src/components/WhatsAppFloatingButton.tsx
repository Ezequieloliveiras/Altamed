import Image from "next/image";

const message =
  "Olá! Gostaria de mais informações sobre os produtos da ALTAMED.";

export function WhatsAppFloatingButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "");
  const href = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : "/contato";

  return (
    <a
      className="whatsapp-floating-button"
      href={href}
      target={phone ? "_blank" : undefined}
      rel={phone ? "noopener noreferrer" : undefined}
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
