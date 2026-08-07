const highlights = [
  {
    icon: "✦",
    title: "Tecnologia aplicada",
    description:
      "Equipamentos e soluções selecionados para atender às exigências do ambiente cirúrgico.",
  },
  {
    icon: "✓",
    title: "Qualidade e segurança",
    description:
      "Produtos selecionados com foco em confiabilidade, desempenho e segurança.",
  },
  {
    icon: "+",
    title: "Atendimento especializado",
    description:
      "Suporte próximo para encontrar soluções adequadas a cada instituição.",
  },
];

export function InstitutionalHighlights() {
  return (
    <section className="quality-section" aria-labelledby="quality-title">
      <div className="container">
        <Reveal className="quality-intro">
          <p className="quality-label">
            <span aria-hidden="true">✦</span>
            Qualidade e tecnologia
          </p>
          <h2 id="quality-title">
            Precisão, tecnologia e confiança
            <br />
            em cada solução
          </h2>
          <p>
            A ALTAMED oferece soluções e equipamentos voltados ao ambiente
            cirúrgico, reunindo qualidade, tecnologia e confiabilidade para
            apoiar profissionais e instituições de saúde.
          </p>
        </Reveal>

        <Reveal className="quality-card-reveal" delay={100}>
          <div className="quality-card">
            <div className="quality-highlights">
              {highlights.map((highlight) => (
                <article className="quality-item" key={highlight.title}>
                  <span className="quality-icon" aria-hidden="true">
                    {highlight.icon}
                  </span>
                  <div>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
import { Reveal } from "./Reveal";
