import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sobre nós" };
export default function About() {
  return (
    <section className="section container prose">
      <p className="eyebrow">A Altamed</p>
      <h1>Soluções para quem cuida.</h1>
      <p>
        Somos uma empresa dedicada à apresentação e fornecimento de equipamentos
        e materiais para a área cirúrgica, conectando qualidade técnica a um
        atendimento próximo.
      </p>
      <h2>Missão</h2>
      <p>
        Contribuir para uma assistência em saúde mais segura e eficiente por
        meio de produtos confiáveis e suporte especializado.
      </p>
      <h2>Nossos diferenciais</h2>
      <ul>
        <li>Catálogo selecionado para o ambiente cirúrgico.</li>
        <li>Atendimento consultivo e humano.</li>
        <li>Compromisso com qualidade e transparência.</li>
      </ul>
      <h2>Área de atuação</h2>
      <p>
        Atendemos hospitais, clínicas, centros cirúrgicos e profissionais de
        saúde que buscam soluções adequadas à sua rotina.
      </p>
    </section>
  );
}
