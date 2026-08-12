import { defineField, defineType } from "sanity";

export const technicalCatalog = defineType({
  name: "technicalCatalog",
  title: "Catálogo técnico",
  type: "document",
  groups: [
    { name: "basic", title: "Informações principais", default: true },
    { name: "files", title: "Arquivos" },
    { name: "visibility", title: "Exibição" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título do catálogo",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Endereço do catálogo",
      description: "Gerado a partir do título.",
      type: "slug",
      group: "basic",
      options: { source: "titulo", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "especialidade",
      title: "Especialidade",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição curta",
      type: "text",
      rows: 3,
      group: "basic",
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "capa",
      title: "Capa do catálogo",
      description: "Imagem exibida no card do catálogo técnico.",
      type: "image",
      group: "files",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "arquivoPdf",
      title: "Arquivo PDF",
      type: "file",
      group: "files",
      options: {
        accept: "application/pdf",
      },
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "ativo",
      title: "Exibir catálogo no site",
      description:
        "Desative esta opção para ocultar temporariamente o catálogo técnico.",
      type: "boolean",
      group: "visibility",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "especialidade",
      media: "capa",
    },
  },
});
