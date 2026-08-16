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
          <a href="tel:+5573999663801">(73) 99966-3801</a>
        </p>
        <p>
          <strong>WhatsApp</strong>
          <br />
          <a href="https://wa.me/5527999967774">(27) 99996-7774</a>
        </p>
        <p>
          <strong>E-mail</strong>
          <br />
          <a href="mailto:hospitalaraltamed@gmail.com">
            hospitalaraltamed@gmail.com
          </a>
        </p>
        <p>
          <strong>CNPJ</strong>
          <br />
          51.735.818/0001-93
        </p>
        <p>
          <strong>Endereço</strong>
          <br />
          Av. Presidente Getúlio Vargas, 4618, Sala 4
          <br />
          Santa Rita, Teixeira de Freitas – BA, CEP 45985-333
        </p>
        <WhatsAppButton label="Chamar no WhatsApp" />
      </address>
    </section>
  );
}
