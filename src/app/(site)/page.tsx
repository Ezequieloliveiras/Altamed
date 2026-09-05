import Link from "next/link";
import Image from "next/image";
import { HomeHeroCarousel } from "@/components/HomeHeroCarousel";
import { ProductGrid } from "@/components/ProductGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { InstitutionalHighlights } from "@/components/InstitutionalHighlights";
import { Reveal } from "@/components/Reveal";
import { SupplierCarousel } from "@/components/SupplierCarousel";
import { urlFor } from "@/sanity/image";
import {
  getCategories,
  getFeaturedProducts,
  getHomeHeroSlides,
  getSuppliers,
} from "@/sanity/fetch";
import type { SanityImage } from "@/sanity/types";

export const revalidate = 60;

function getCategoryImageUrl(image?: SanityImage) {
  try {
    return image?.asset
      ? urlFor(image).width(720).height(420).fit("crop").url()
      : undefined;
  } catch {
    return undefined;
  }
}

export default async function Home() {
  const [heroSlides, featured, categories, suppliers] = await Promise.all([
    getHomeHeroSlides(),
    getFeaturedProducts(),
    getCategories(),
    getSuppliers(),
  ]);
  const suppliersWithLogos =
    suppliers?.filter((supplier) => supplier.logo?.asset) ?? [];
  return (
    <>
      <HomeHeroCarousel slides={heroSlides || []} />
      {suppliersWithLogos.length ? (
        <section className="suppliers-section" aria-label="Nossos Parceiros">
          <div className="container">
            <Reveal className="suppliers-heading">
              <p className="eyebrow">Nossos Parceiros</p>
              {/* <p>
                Soluções de fabricantes selecionados para diferentes necessidades do ambiente cirúrgico.
              </p> */}
            </Reveal>
            <SupplierCarousel suppliers={suppliersWithLogos} />
          </div>
        </section>
      ) : null}
      <section className="section container categories-section">
        <Reveal className="section-heading">
          <p className="eyebrow">Encontre por área</p>
          <h2>Soluções por especialidade</h2>
          <p>
            Explore nosso portfólio de produtos e soluções para diferentes
            necessidades do ambiente cirúrgico.
          </p>
        </Reveal>
        <div className="categories">
          {categories?.length ? (
            categories.map((category, index) => {
              const imageUrl = getCategoryImageUrl(category.image);

              return (
                <Reveal key={category._id} delay={index * 80}>
                  <Link
                    className={`category-card ${
                      imageUrl ? "category-card-has-image" : ""
                    }`}
                    href={`/produtos?categoria=${category.slug}`}
                  >
                    {imageUrl ? (
                      <div className="category-card-media">
                        <Image
                          src={imageUrl}
                          alt={
                            category.image?.alt?.trim() ||
                            `Imagem da especialidade ${category.name}`
                          }
                          fill
                          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 33vw"
                        />
                      </div>
                    ) : null}
                    <div className="category-card-content">
                      <strong>{category.name}</strong>
                      <span>
                        {category.description || "Conheça os produtos"}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })
          ) : (
            <p className="empty">As categorias estarão disponíveis em breve.</p>
          )}
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <Reveal className="featured-heading">
            <div>
              <p className="eyebrow">Seleção Altamed</p>
              <h2>Produtos em destaque</h2>
            </div>
            <Link className="text-link featured-catalog-link" href="/produtos">
              Ver catálogo completo <span>→</span>
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
      <InstitutionalHighlights />
      <section className="section container institutional about-section">
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
          <Link className="text-link" href="/quemsomos">
            Conheça nossa empresa <span>→</span>
          </Link>
        </Reveal>
      </section>
      <section className="contact-call">
        <Reveal className="container cta-inner cta-card">
          <div>
            <h2>Precisa de orientação para escolher um produto?</h2>
            <p>
              Nossa equipe está pronta para entender sua necessidade e indicar a
              solução mais adequada.
            </p>
          </div>
          <WhatsAppButton label="Falar com um especialista" />
        </Reveal>
      </section>
    </>
  );
}
