import type { Metadata } from "next";
import { CatalogNavigation } from "@/components/catalog/CatalogNavigation";
import { Catalogue } from "@/components/Catalogue";
import { getCategories, getProducts } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Catálogo de equipamentos e materiais cirúrgicos Altamed.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <section className="section container">
      <div className="section-heading">
        <h1>Produtos</h1>
        <p>Encontre soluções para sua necessidade.</p>
      </div>
      <CatalogNavigation active="products" />
      {products ? (
        <Catalogue products={products} categories={categories || []} />
      ) : (
        <p className="empty">
          Não foi possível carregar o catálogo neste momento. Tente novamente
          mais tarde.
        </p>
      )}
    </section>
  );
}
