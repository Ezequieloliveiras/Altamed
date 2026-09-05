import { defineField, defineType } from "sanity";
export const category = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome da categoria",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço da categoria",
      type: "slug",
      options: { source: "nome", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "imagem",
      title: "Imagem do card",
      description: "Imagem exibida no card da especialidade na página inicial.",
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
  preview: {
    select: {
      title: "nome",
      subtitle: "descricao",
      media: "imagem",
    },
  },
});
