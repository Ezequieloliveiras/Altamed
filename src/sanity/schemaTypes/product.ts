import { defineArrayMember, defineField, defineType } from "sanity";
export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  groups: [
    { name: "basic", title: "Informações principais", default: true },
    { name: "details", title: "Detalhes técnicos" },
    { name: "visibility", title: "Exibição" },
  ],
  fields: [
    defineField({
      name: "nome",
      title: "Nome do produto",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço do produto",
      description: "Gerado a partir do nome.",
      type: "slug",
      group: "basic",
      options: { source: "nome", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "codigo",
      title: "Código ou referência",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marca",
      title: "Fabricante ou marca",
      type: "string",
      group: "basic",
    }),
    defineField({
      name: "descricaoCurta",
      title: "Descrição curta",
      description: "Resumo usado nos cards e nas buscas (até 240 caracteres).",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "descricao",
      title: "Descrição completa",
      type: "text",
      rows: 7,
      group: "details",
    }),
    defineField({
      name: "imagens",
      title: "Imagens do produto",
      description:
        "A primeira imagem será a principal. Adicione texto alternativo para acessibilidade.",
      type: "array",
      group: "basic",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.min(1).warning("Recomendamos pelo menos uma imagem."),
    }),
    defineField({
      name: "especificacoes",
      title: "Especificações técnicas",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Característica",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Valor",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "key", subtitle: "value" } },
        }),
      ],
    }),
    defineField({
      name: "destaque",
      title: "Produto em destaque",
      description: "Exibir também na página inicial.",
      type: "boolean",
      group: "visibility",
      initialValue: false,
    }),
    defineField({
      name: "ativo",
      title: "Exibir produto no site",
      description:
        "Desative esta opção para ocultar temporariamente o produto do catálogo.",
      type: "boolean",
      group: "visibility",
      initialValue: true,
    }),
    defineField({
      name: "ordem",
      title: "Ordem de exibição",
      description: "Números menores aparecem primeiro.",
      type: "number",
      group: "visibility",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: { title: "nome", subtitle: "categoria.nome", media: "imagens.0" },
  },
});
