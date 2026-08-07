import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
        <div className="container">
          <p className="eyebrow">Precisão que cuida</p>
          <h1>Equipamentos e soluções para a área cirúrgica.</h1>
          <p>
            Produtos selecionados para apoiar profissionais de saúde com
            segurança, qualidade e confiança.
          </p>
          <Link className="button" href="/produtos">
            Ver produtos
          </Link>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <p className="eyebrow">Encontre por área</p>
          <h2>Categorias</h2>
        </div>
        <div className="categories">
          {categories?.length ? (
            categories.map((category) => (
              <Link
                key={category._id}
                href={`/produtos?categoria=${category.slug}`}
              >
                <strong>{category.name}</strong>
                <span>{category.description || "Conheça os produtos"}</span>
              </Link>
            ))
          ) : (
            <p className="empty">As categorias estarão disponíveis em breve.</p>
          )}
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <div className="section-heading row">
            <div>
              <p className="eyebrow">Seleção Altamed</p>
              <h2>Produtos em destaque</h2>
            </div>
            <Link className="text-link" href="/produtos">
              Ver catálogo completo →
            </Link>
          </div>
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
        <div>
          <p className="eyebrow">Sobre a Altamed</p>
          <h2>Parceria para uma rotina cirúrgica mais eficiente.</h2>
        </div>
        <p>
          Trabalhamos com materiais e equipamentos que atendem às necessidades
          de hospitais, clínicas e profissionais, oferecendo atendimento próximo
          e soluções confiáveis.
        </p>
        <Link className="text-link" href="/sobre">
          Conheça nossa empresa →
        </Link>
      </section>
      <section className="contact-call">
        <div className="container">
          <div>
            <h2>Precisa de orientação para escolher um produto?</h2>
            <p>Nossa equipe está pronta para ajudar.</p>
          </div>
          <WhatsAppButton label="Falar pelo WhatsApp" />
        </div>
      </section>
    </>
  );
}
