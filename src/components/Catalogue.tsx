"use client";
import { useMemo, useState } from "react";
import type { Category, Product } from "@/sanity/types";
import { ProductGrid } from "./ProductGrid";
import { SearchProducts } from "./SearchProducts";
import { CategoryFilter } from "./CategoryFilter";
export function Catalogue({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: Category[];
  initialCategory: string;
}) {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState(() =>
    categories.some((item) => item.slug === initialCategory) ? initialCategory : "",
  );
  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const search = `${p.name} ${p.code || ""} ${p.brand || ""}`
          .toLocaleLowerCase()
          .includes(term.toLocaleLowerCase());
        return search && (!category || p.category?.slug === category);
      }),
    [products, term, category],
  );
  const hasFilters = Boolean(term || category);
  const clearFilters = () => {
    setTerm("");
    setCategory("");
  };
  return (
    <>
      <div className="catalogue-controls">
        <SearchProducts value={term} onChange={setTerm} />
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />
      </div>
      <div className="catalogue-results" aria-live="polite">
        <p>
          {term
            ? `Resultados para “${term}”`
            : `${filtered.length} ${filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}`}
        </p>
        {hasFilters && (
          <button className="clear-filters" onClick={clearFilters} type="button">
            Limpar filtros
          </button>
        )}
      </div>
      {filtered.length ? (
        <ProductGrid products={filtered} />
      ) : (
        <p className="empty">
          Nenhum produto encontrado. Ajuste sua busca ou escolha outra
          categoria.
        </p>
      )}
    </>
  );
}
