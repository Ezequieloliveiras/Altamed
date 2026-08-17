import { defineArrayMember, defineField, defineType } from "sanity";

const imageFields = [
  defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
];

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Quem Somos",
  type: "document",
  groups: [
    { name: "hero", title: "Abertura", default: true },
    { name: "institution", title: "Institucional" },
    { name: "highlights", title: "Pilares e diferenciais" },
    { name: "gallery", title: "Galeria" },
    { name: "closing", title: "Atuação e contato" },
  ],
  fields: [
    defineField({ name: "title", title: "Título interno", type: "string", initialValue: "Quem Somos", validation: (Rule) => Rule.required() }),
    defineField({ name: "eyebrow", title: "Texto superior", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "Título de abertura", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Descrição de abertura", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "heroImage", title: "Imagem de abertura", type: "image", options: { hotspot: true }, fields: imageFields, group: "hero" }),
    defineField({ name: "aboutTitle", title: "Título institucional", type: "string", group: "institution" }),
    defineField({ name: "aboutContent", title: "Texto institucional", description: "Use uma linha em branco para separar parágrafos.", type: "text", rows: 8, group: "institution" }),
    defineField({ name: "aboutImage", title: "Imagem institucional", type: "image", options: { hotspot: true }, fields: imageFields, group: "institution" }),
    defineField({ name: "mission", title: "Missão", type: "text", rows: 3, group: "highlights" }),
    defineField({ name: "vision", title: "Visão", type: "text", rows: 3, group: "highlights" }),
    defineField({ name: "values", title: "Valores", type: "text", rows: 3, group: "highlights" }),
    defineField({ name: "differentials", title: "Diferenciais", type: "array", group: "highlights", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required() }), defineField({ name: "description", title: "Descrição", type: "text", rows: 2 })], preview: { select: { title: "title", subtitle: "description" } } })] }),
    defineField({ name: "gallery", title: "Galeria da empresa", type: "array", group: "gallery", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "image", title: "Imagem", type: "image", options: { hotspot: true }, fields: imageFields, validation: (Rule) => Rule.required() }), defineField({ name: "title", title: "Título", type: "string" }), defineField({ name: "description", title: "Descrição", type: "text", rows: 2 }), defineField({ name: "order", title: "Ordem de exibição", type: "number", initialValue: 0 })], preview: { select: { title: "title", media: "image", order: "order" }, prepare: ({ title, media, order }) => ({ title: title || "Imagem da galeria", media, subtitle: typeof order === "number" ? `Ordem ${order}` : undefined }) } })] }),
    defineField({ name: "stats", title: "Indicadores", description: "A seção só aparece quando houver ao menos um item.", type: "array", group: "closing", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "value", title: "Indicador", type: "string", validation: (Rule) => Rule.required() }), defineField({ name: "label", title: "Legenda", type: "string", validation: (Rule) => Rule.required() })], preview: { select: { title: "value", subtitle: "label" } } })] }),
    defineField({ name: "areas", title: "Áreas de atuação", type: "array", group: "closing", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", title: "Nome da área", type: "string", validation: (Rule) => Rule.required() })], preview: { select: { title: "title" } } })] }),
    defineField({ name: "ctaTitle", title: "Título do contato", type: "string", group: "closing" }),
    defineField({ name: "ctaDescription", title: "Descrição do contato", type: "text", rows: 3, group: "closing" }),
    defineField({ name: "ctaButtonLabel", title: "Texto do botão", type: "string", group: "closing" }),
  ],
  preview: { prepare: () => ({ title: "Quem Somos", subtitle: "Conteúdo da página institucional" }) },
});
