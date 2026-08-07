"use client";
import type { Category } from "@/sanity/types";
export function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      Categoria
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todas as categorias</option>
        {categories.map((category) => (
          <option key={category._id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}
