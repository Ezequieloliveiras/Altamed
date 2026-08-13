import type { Metadata } from "next";
import { CatalogNavigation } from "@/components/catalog/CatalogNavigation";
import { TechnicalCatalogGrid } from "@/components/catalog/TechnicalCatalogGrid";
import { getTechnicalCatalogs } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Catálogos Técnicos",
  description:
    "Consulte os catálogos técnicos de produtos e especialidades da Altamed.",
};

export const revalidate = 60;

export default async function TechnicalCatalogsPage() {
  const catalogs = await getTechnicalCatalogs();

  return (
    <section className="section container">
      <div className="section-heading">
        <h1>Catálogos Técnicos</h1>
        <p>Consulte nossos materiais técnicos completos por especialidade.</p>
      </div>
      <CatalogNavigation active="technical" />
      {catalogs?.length ? (
        <TechnicalCatalogGrid catalogs={catalogs} />
      ) : (
        <p className="empty">Nenhum catálogo técnico disponível no momento.</p>
      )}
    </section>
  );
}
