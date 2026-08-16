import { defineField, defineType } from "sanity";

export const homeHeroSlide = defineType({
  name: "homeHeroSlide",
  title: "Banner da Home",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "media", title: "Imagens" },
    { name: "actions", title: "Botões" },
    { name: "visibility", title: "Exibição" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Texto superior",
      description: "Exemplo: PRECISÃO QUE CUIDA.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "imagemDesktop",
      title: "Imagem desktop",
      type: "image",
      group: "media",
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
      name: "imagemMobile",
      title: "Imagem mobile",
      description:
        "Opcional. Se não for preenchida, o site usa a imagem desktop.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "botaoPrincipalTexto",
      title: "Texto do botão principal",
      type: "string",
      group: "actions",
    }),
    defineField({
      name: "botaoPrincipalLink",
      title: "Link do botão principal",
      description: "Use uma rota interna, como /produtos, ou uma URL externa.",
      type: "string",
      group: "actions",
    }),
    defineField({
      name: "botaoSecundarioTexto",
      title: "Texto do botão secundário",
      type: "string",
      group: "actions",
    }),
    defineField({
      name: "botaoSecundarioLink",
      title: "Link do botão secundário",
      description: "Use uma rota interna, como /contato, ou uma URL externa.",
      type: "string",
      group: "actions",
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
      title: "Exibir banner no site",
      type: "boolean",
      group: "visibility",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "displayOrder",
      by: [
        { field: "ordem", direction: "asc" },
        { field: "titulo", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "titulo",
      media: "imagemDesktop",
      active: "ativo",
      order: "ordem",
    },
    prepare({ title, media, active, order }) {
      return {
        title,
        media,
        subtitle: `${active === false ? "Inativo" : "Ativo"}${
          typeof order === "number" ? ` · Ordem ${order}` : ""
        }`,
      };
    },
  },
});
