"use client";
import { useMemo, useState } from "react";
import type { Category, Product } from "@/sanity/types";
import { ProductGrid } from "./ProductGrid";
import { SearchProducts } from "./SearchProducts";
import { CategoryFilter } from "./CategoryFilter";
export function Catalogue({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
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
