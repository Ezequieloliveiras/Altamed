import { defineField, defineType } from "sanity";

export const supplier = defineType({
  name: "supplier",
  title: "Fornecedor",
  type: "document",
  groups: [
    { name: "basic", title: "Informações principais", default: true },
    { name: "visibility", title: "Exibição" },
  ],
  fields: [
    defineField({
      name: "nome",
      title: "Nome do fornecedor",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "basic",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto alternativo da logo",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Site do fornecedor",
      type: "url",
      group: "basic",
    }),
    defineField({
      name: "ordem",
      title: "Ordem de exibição",
      description: "Números menores aparecem primeiro no ticker.",
      type: "number",
      group: "visibility",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "ativo",
      title: "Exibir fornecedor no site",
      type: "boolean",
      group: "visibility",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Ordem do carousel",
      name: "carouselOrder",
      by: [{ field: "ordem", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "nome", media: "logo", active: "ativo" },
    prepare({ title, media, active }) {
      return {
        title,
        media,
        subtitle: active ? "Ativo" : "Inativo",
      };
    },
  },
});
