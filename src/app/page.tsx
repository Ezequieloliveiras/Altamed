import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InstitutionalHighlights } from "@/components/InstitutionalHighlights";
import { Reveal } from "@/components/Reveal";
import { getCategories, getFeaturedProducts } from "@/sanity/fetch";

export const revalidate = 60;
export default async function Home() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Precisão que cuida</p>
          <h1>
            Tecnologia e precisão
            <br />
            para o ambiente
            <br />
            cirúrgico
          </h1>
          <p>
            Soluções e equipamentos selecionados para oferecer qualidade,
            segurança e eficiência aos profissionais da saúde.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/produtos">
              Conheça nossos produtos
            </Link>
            <Link className="button button-outline" href="/contato">
              Fale conosco
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <Reveal className="section-heading">
          <p className="eyebrow">Encontre por área</p>
          <h2>Categorias</h2>
        </Reveal>
        <div className="categories">
          {categories?.length ? (
            categories.map((category, index) => (
              <Reveal key={category._id} delay={index * 80}>
                <Link href={`/produtos?categoria=${category.slug}`}>
                  <strong>{category.name}</strong>
                  <span>{category.description || "Conheça os produtos"}</span>
                  <em>Ver produtos →</em>
                </Link>
              </Reveal>
            ))
          ) : (
            <p className="empty">As categorias estarão disponíveis em breve.</p>
          )}
        </div>
      </section>
      <InstitutionalHighlights />
      <section className="section surface">
        <div className="container">
          <Reveal className="section-heading row">
            <div>
              <p className="eyebrow">Seleção Altamed</p>
              <h2>Produtos em destaque</h2>
            </div>
            <Link className="text-link" href="/produtos">
              Ver catálogo completo →
            </Link>
          </Reveal>
          {featured?.length ? (
            <ProductGrid products={featured} />
          ) : (
            <p className="empty">
              Cadastre produtos em destaque no Studio para exibi-los aqui.
            </p>
          )}
        </div>
      </section>
      <section className="section container institutional">
        <Reveal>
          <p className="eyebrow">Sobre a Altamed</p>
          <h2>Parceria para uma rotina cirúrgica mais eficiente.</h2>
        </Reveal>
        <Reveal delay={100}>
          <p>
            Trabalhamos com materiais e equipamentos que atendem às necessidades
            de hospitais, clínicas e profissionais, oferecendo atendimento
            próximo e soluções confiáveis.
          </p>
          <Link className="text-link" href="/sobre">
            Conheça nossa empresa <span>→</span>
          </Link>
        </Reveal>
      </section>
      <section className="contact-call">
        <Reveal className="container cta-inner">
          <div>
            <h2>Precisa de orientação para escolher um produto?</h2>
            <p>Nossa equipe está pronta para ajudar.</p>
          </div>
          <WhatsAppButton label="Falar pelo WhatsApp" />
        </Reveal>
      </section>
    </>
  );
}
