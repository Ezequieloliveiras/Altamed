"use client";
type Props = { productName?: string; label?: string };
export function WhatsAppButton({
  productName,
  label = "Solicitar informações",
}: Props) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "");
  const message = productName
    ? `Olá, gostaria de mais informações sobre o produto: ${productName}`
    : "Olá, gostaria de mais informações.";
  if (!phone)
    return (
      <a className="button" href="/contato">
        {label}
      </a>
    );
  return (
    <a
      className="button"
      target="_blank"
      rel="noreferrer"
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
    >
      {label}
    </a>
  );
}
