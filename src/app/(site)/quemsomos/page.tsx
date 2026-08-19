import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Handshake, Headset, ShieldCheck, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AboutGallery } from "@/components/AboutGallery";
import { Reveal } from "@/components/Reveal";
import { getAboutPage } from "@/sanity/fetch";
import { urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a Altamed, empresa especializada em produtos e soluções para o setor cirúrgico e hospitalar.",
};
const fallback = {
  eyebrow: "Quem somos",
  heroTitle: "Tecnologia, confiança e cuidado em cada solução.",
  heroDescription:
    "A Altamed atua na apresentação e fornecimento de produtos cirúrgicos e hospitalares, conectando soluções de qualidade a um atendimento próximo, técnico e responsável.",
  aboutTitle: "Compromisso que se traduz em cuidado.",
  aboutContent:
    "A Altamed é parceira de instituições e profissionais de saúde que valorizam segurança, qualidade e agilidade em sua rotina.\n\nSelecionamos produtos para o ambiente cirúrgico e hospitalar com atenção técnica, construindo relações próximas e transparentes em cada atendimento.",
  mission:
    "Contribuir para uma assistência em saúde mais segura e eficiente por meio de produtos confiáveis e suporte especializado.",
  vision:
    "Ser reconhecida pela confiança construída com clientes, parceiros e profissionais da saúde.",
  values:
    "Ética, proximidade, responsabilidade técnica e compromisso permanente com a qualidade.",
  differentials: [
    {
      title: "Seleção criteriosa",
      description: "Produtos adequados às exigências do ambiente cirúrgico.",
    },
    {
      title: "Atendimento consultivo",
      description: "Escuta atenta para compreender cada necessidade.",
    },
    {
      title: "Suporte especializado",
      description:
        "Conhecimento técnico e relacionamento próximo em toda a jornada.",
    },
  ],
  areas: [
    { title: "Hospitais" },
    { title: "Clínicas" },
    { title: "Centros cirúrgicos" },
    { title: "Profissionais da saúde" },
  ],
  ctaTitle: "Conte com a Altamed",
  ctaDescription:
    "Estamos prontos para apresentar soluções adequadas às necessidades da sua instituição.",
  ctaButtonLabel: "Fale com nossa equipe",
};
function imageUrl(image?: SanityImage, width = 1600) {
  return image?.asset
    ? urlFor(image).width(width).auto("format").quality(82).url()
    : undefined;
}
const differentialIcons: LucideIcon[] = [ShieldCheck, Handshake, Headset];
function getDifferentialIcon(
  title: string | undefined,
  index: number,
): LucideIcon {
  const normalizedTitle = title?.toLocaleLowerCase("pt-BR") || "";
  if (/seleção|qualidade|criteriosa|segurança/.test(normalizedTitle))
    return ShieldCheck;
  if (/atendimento|consult|relacionamento|parceria/.test(normalizedTitle))
    return Handshake;
  if (/suporte|especializado|acompanhamento/.test(normalizedTitle))
    return Headset;
  return differentialIcons[index % differentialIcons.length];
}
export default async function About() {
  const content = await getAboutPage();
  const data = { ...fallback, ...content };
  const heroImage = imageUrl(content?.heroImage, 1400);
  const aboutImage = imageUrl(content?.aboutImage, 1200);
  const gallery = (content?.gallery || []).flatMap((item) => {
    const src = imageUrl(item?.image, 1400);
    return src
      ? [
          {
            id: item?._key,
            src,
            alt:
              item?.image?.alt ||
              item?.title ||
              "Imagem institucional da Altamed",
            title: item?.title,
            description: item?.description,
          },
        ]
      : [];
  });
  const pillars = [
    ["Missão", data.mission],
    ["Visão", data.vision],
    ["Valores", data.values],
  ].filter(([, text]) => Boolean(text));
  const differentials = (data.differentials || []).filter(
    (item) => item?.title,
  );
  const areas = (data.areas || []).filter((area) => area?.title);
  const stats = (content?.stats || []).filter(
    (item) => typeof item?.value === "number" && item?.title,
  );
  return (
    <>
      <section
        className={`about-hero ${heroImage ? "about-hero-with-image" : ""}`}
      >
        <div className="container about-hero-grid">
          <Reveal className="about-hero-copy">
            <p className="eyebrow">{data.eyebrow}</p>
            <h1>{data.heroTitle}</h1>
            <p>{data.heroDescription}</p>
          </Reveal>
          {heroImage && (
            <Reveal className="about-hero-media" delay={100}>
              <Image
                src={heroImage}
                alt={content?.heroImage?.alt || "Altamed"}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 48vw"
              />
            </Reveal>
          )}
        </div>
      </section>
      <section className="section">
        <Reveal
          className={`container about-intro ${aboutImage ? "about-intro-with-image" : ""}`}
        >
          {aboutImage && (
            <div className="about-intro-media">
              <Image
                src={aboutImage}
                alt={content?.aboutImage?.alt || "Equipe Altamed"}
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />
            </div>
          )}
          <div>
            <p className="eyebrow">Sobre a Altamed</p>
            <h2>{data.aboutTitle}</h2>
            <div className="about-paragraphs">
              {data.aboutContent?.split(/\n\s*\n/).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
      {pillars.length > 0 && (
        <section className="about-pillars">
          <Reveal className="container about-pillars-grid">
            {pillars.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </Reveal>
        </section>
      )}
      {differentials.length > 0 && (
        <section className="section surface">
          <div className="container">
            <Reveal className="about-section-heading">
              <p className="eyebrow">Diferenciais</p>
              <h2>O que nos diferencia</h2>
            </Reveal>
            <Reveal className="about-differentials" delay={80}>
              {differentials.map((item, index) => {
                const Icon = getDifferentialIcon(item.title, index);
                return (
                  <article key={`${item.title}-${index}`}>
                    <Icon
                      className="about-differential-icon"
                      aria-hidden="true"
                      size={24}
                      strokeWidth={1.6}
                    />
                    <div>
                      <h3>{item.title}</h3>
                      {item.description && <p>{item.description}</p>}
                    </div>
                  </article>
                );
              })}
            </Reveal>
          </div>
        </section>
      )}
      {gallery.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal className="about-gallery-heading">
              <div>
                <p className="eyebrow">Nossa estrutura</p>
                <h2>Altamed em movimento</h2>
              </div>
              <p>Conheça um pouco mais da nossa rotina, equipe e atuação.</p>
            </Reveal>
            <Reveal delay={100}>
              <AboutGallery images={gallery} />
            </Reveal>
          </div>
        </section>
      )}
      {stats.length > 0 && (
        <section className="about-stats">
          <Reveal className="container">
            {stats.map((stat) => (
              <div key={stat._key || stat.title}>
                <strong>
                  <AnimatedCounter
                    value={stat.value ?? 0}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                  {stat.title && ` ${stat.title}`}
                </strong>
                {stat.description && <span>{stat.description}</span>}
              </div>
            ))}
          </Reveal>
        </section>
      )}
      {areas.length > 0 && (
        <section className="section">
          <Reveal className="container about-areas">
            <div>
              <p className="eyebrow">Área de atuação</p>
              <h2>Onde atuamos</h2>
              <p>
                Estamos presentes no dia a dia de instituições e profissionais
                que buscam soluções adequadas às suas necessidades.
              </p>
            </div>
            <ul>
              {areas.map((area, index) => (
                <li key={`${area.title}-${index}`}>{area.title}</li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}
      <section className="about-cta">
        <Reveal className="container">
          <div>
            <p className="eyebrow">Vamos conversar</p>
            <h2>{data.ctaTitle}</h2>
            <p>{data.ctaDescription}</p>
          </div>
          <Link className="button" href="/contato">
            {data.ctaButtonLabel}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
