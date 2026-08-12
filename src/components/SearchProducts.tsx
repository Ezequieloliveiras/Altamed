"use client";
export function SearchProducts({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="catalogue-field catalogue-search">
      Buscar produtos
      <span className="search-input-wrap">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.2 4.2" />
        </svg>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por nome, código ou marca"
        />
      </span>
    </label>
  );
}
