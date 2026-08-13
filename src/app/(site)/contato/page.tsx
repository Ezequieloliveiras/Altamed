import type { Metadata } from "next";
import { WhatsAppButton } from "@/components/WhatsAppButton";
export const metadata: Metadata = { title: "Contato" };
export default function Contact() {
  return (
    <section className="section container contact-page">
      <div>
        <p className="eyebrow">Fale conosco</p>
        <h1>Contato</h1>
        <p>
          Entre em contato para tirar dúvidas ou solicitar informações sobre
          nossos produtos.
        </p>
      </div>
      <address>
        <p>
          <strong>Telefone</strong>
          <br />
          (00) 0000-0000
        </p>
        <p>
          <strong>WhatsApp</strong>
          <br />
          (00) 00000-0000
        </p>
        <p>
          <strong>E-mail</strong>
          <br />
          <a href="mailto:contato@altamed.com.br">contato@altamed.com.br</a>
        </p>
        <p>
          <strong>Endereço</strong>
          <br />
          Consulte nossa equipe para atendimento em sua região.
        </p>
        <WhatsAppButton label="Chamar no WhatsApp" />
      </address>
    </section>
  );
}
