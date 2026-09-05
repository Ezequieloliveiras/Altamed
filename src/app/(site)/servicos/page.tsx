import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  HeartPulse,
  Hospital,
  ShieldCheck,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Serviços Médicos",
  description:
    "Serviços médicos e hospitalares com atendimento especializado, apoio técnico e soluções para rotinas clínicas e cirúrgicas.",
};

const services = [
  {
    title: "Atendimento médico especializado",
    description:
      "Apoio consultivo para compreender demandas clínicas e direcionar soluções adequadas para cada necessidade.",
    Icon: Stethoscope,
  },
  {
    title: "Suporte hospitalar e cirúrgico",
    description:
      "Acompanhamento técnico para equipes, centros cirúrgicos e instituições que precisam de agilidade e segurança operacional.",
    Icon: Hospital,
  },
  {
    title: "Planejamento de materiais",
    description:
      "Organização de itens, indicações e prioridades para rotinas médicas com foco em disponibilidade e eficiência.",
    Icon: ClipboardCheck,
  },
  {
    title: "Orientação para equipes",
    description:
      "Treinamento e alinhamento técnico sobre uso, aplicação e cuidados com produtos médicos e hospitalares.",
    Icon: UsersRound,
  },
];

const highlights = [
  "Atendimento próximo para hospitais, clínicas e profissionais de saúde.",
  "Experiência com soluções para o ambiente cirúrgico.",
  "Indicação responsável conforme a necessidade de cada serviço.",
];

export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="services-hero-media" aria-hidden="true">
          <Image
            src="/images/hero-cirurgico.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="container services-hero-content">
          <p className="eyebrow">Serviços médicos</p>
          <h1>Apoio especializado para rotinas clínicas e hospitalares.</h1>
          <p>
            Unimos atendimento consultivo, conhecimento técnico e soluções
            hospitalares para ajudar sua equipe a escolher, organizar e utilizar
            recursos com mais segurança.
          </p>
          <div className="services-hero-actions">
            <WhatsAppButton label="Solicitar atendimento" />
            <Link className="services-secondary-link" href="/produtos">
              Ver produtos <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section container services-section">
        <div className="services-section-heading">
          <div>
            <p className="eyebrow">Como ajudamos</p>
            <h2>Serviços pensados para o dia a dia médico.</h2>
          </div>
          <p>
            Cada atendimento é conduzido a partir da necessidade real da
            instituição ou profissional, com foco em clareza, suporte e
            continuidade.
          </p>
        </div>

        <div className="services-grid">
          {services.map(({ title, description, Icon }) => (
            <article className="service-card" key={title}>
              <span className="service-card-icon">
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-band">
        <div className="container services-band-grid">
          <div>
            <p className="eyebrow">Padrão Altamed</p>
            <h2>Atendimento técnico, próximo e organizado.</h2>
          </div>
          <div className="services-checklist">
            {highlights.map((highlight) => (
              <p key={highlight}>
                <ShieldCheck aria-hidden="true" />
                <span>{highlight}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section container services-cta">
        <div>
          <HeartPulse aria-hidden="true" />
          <p className="eyebrow">Fale com a equipe</p>
          <h2>Precisa estruturar um atendimento ou serviço médico?</h2>
          <p>
            Converse com a Altamed para entendermos sua demanda e indicarmos o
            melhor caminho.
          </p>
        </div>
        <WhatsAppButton label="Chamar no WhatsApp" />
      </section>
    </>
  );
}
