"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);
  const options = [{ _id: "all", name: "Todas as categorias", slug: "" }, ...categories];
  const selected = options.find((option) => option.slug === value) ?? options[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!fieldRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const select = (slug: string) => {
    onChange(slug);
    setOpen(false);
  };

  return (
    <div className="catalogue-field catalogue-category" ref={fieldRef}>
      <span id="category-label">Categoria</span>
      <button
        aria-controls="category-options"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby="category-label category-value"
        className="category-trigger"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        type="button"
      >
        <span id="category-value">{selected.name}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>
      {open && (
        <div aria-labelledby="category-label" className="category-options" id="category-options" role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.slug === value}
              className={option.slug === value ? "selected" : ""}
              key={option._id}
              onClick={() => select(option.slug)}
              role="option"
              type="button"
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
