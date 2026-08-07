"use client";
export function SearchProducts({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      Buscar produtos
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Nome, código ou marca"
      />
    </label>
  );
}
