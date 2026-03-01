import { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  Globe,
  Heart,
  Leaf,
  Shield,
  ShoppingBag,
  Truck,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre | Vitrine Pro",
  description:
    "Conheça a Vitrine Pro: nossa história, missão e os valores que guiam cada decisão. Descubra por que milhares de clientes confiam em nós.",
  openGraph: {
    title: "Sobre | Vitrine Pro",
    description:
      "Conheça a Vitrine Pro: nossa história, missão e os valores que guiam cada decisão.",
    type: "website",
  },
};

const values = [
  {
    icon: Heart,
    title: "Paixão pelo cliente",
    description:
      "Cada decisão que tomamos começa com uma pergunta: como isso beneficia nossos clientes?",
  },
  {
    icon: Shield,
    title: "Confiança & Segurança",
    description:
      "Priorizamos a segurança dos seus dados e transações em cada etapa da sua experiência.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description:
      "Estamos comprometidos com práticas sustentáveis, desde a seleção de produtos até a entrega.",
  },
  {
    icon: Zap,
    title: "Inovação Constante",
    description:
      "Investimos em tecnologia de ponta para oferecer a melhor experiência de compra online.",
  },
];

const stats = [
  { value: "50K+", label: "Clientes satisfeitos" },
  { value: "10K+", label: "Produtos disponíveis" },
  { value: "99%", label: "Avaliações positivas" },
  { value: "24h", label: "Suporte disponível" },
];

const timeline = [
  {
    year: "2022",
    title: "Início da jornada",
    description:
      "A Vitrine Pro nasceu da visão de democratizar o acesso a produtos de qualidade com preços justos.",
  },
  {
    year: "2023",
    title: "Expansão nacional",
    description:
      "Alcançamos todas as regiões do Brasil, com logística eficiente e envio rápido para cada canto do país.",
  },
  {
    year: "2024",
    title: "Tecnologia e inovação",
    description:
      "Lançamos nossa plataforma com Next.js, oferecendo velocidade e performance incomparáveis.",
  },
  {
    year: "2025",
    title: "Comunidade global",
    description:
      "Ultrapassamos 50 mil clientes e nos tornamos referência em e-commerce de alta performance.",
  },
];

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary py-20 lg:py-32">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, var(--primary) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--primary) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-medium tracking-widest uppercase text-accent-bg mb-4">
              Nossa história
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-primary tracking-tight leading-tight">
              Mais do que uma loja.
              <br />
              <span className="text-accent-bg">Uma experiência.</span>
            </h1>
            <p className="mt-6 text-lg text-subtitle max-w-2xl leading-relaxed">
              A Vitrine Pro nasceu da vontade de transformar o e-commerce
              brasileiro. Acreditamos que comprar online deve ser tão prazeroso
              quanto visitar a melhor loja da cidade.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Estatísticas */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-2xl bg-background border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-3xl lg:text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-subtitle">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Missão */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-bg">
              Nossa missão
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Conectando pessoas aos produtos que amam
            </h2>
            <p className="mt-6 text-subtitle leading-relaxed">
              Acreditamos que cada pessoa merece acesso a produtos de qualidade,
              com transparência de preços e uma experiência de compra que
              encanta. Nossa missão é ser a ponte entre os melhores produtos do
              mundo e o consumidor brasileiro.
            </p>
            <p className="mt-4 text-subtitle leading-relaxed">
              Investimos pesado em tecnologia, curadoria de produtos e logística
              para que cada compra seja uma experiência memorável, do clique à
              entrega na sua porta.
            </p>
          </div>

          {/* Cards de diferencial */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-secondary flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Truck size={22} className="text-accent-bg" />
              </div>
              <h3 className="text-sm font-semibold text-primary">
                Entrega Rápida
              </h3>
              <p className="text-xs text-subtitle">
                Envio expresso para todo o Brasil
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <ShoppingBag size={22} className="text-accent-bg" />
              </div>
              <h3 className="text-sm font-semibold text-primary">
                Produtos Curados
              </h3>
              <p className="text-xs text-subtitle">
                Seleção premium de qualidade
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Globe size={22} className="text-accent-bg" />
              </div>
              <h3 className="text-sm font-semibold text-primary">
                Alcance Nacional
              </h3>
              <p className="text-xs text-subtitle">
                Presente em todos os estados
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Award size={22} className="text-accent-bg" />
              </div>
              <h3 className="text-sm font-semibold text-primary">
                Qualidade Garantida
              </h3>
              <p className="text-xs text-subtitle">
                Produtos certificados e garantidos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-secondary/30 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-accent-bg">
              O que nos guia
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Nossos Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-8 rounded-2xl bg-background border border-border group hover:border-accent-bg/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-primary group-hover:text-accent-bg transition-colors duration-300"
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-primary">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-subtitle leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-widest uppercase text-accent-bg">
            Nossa trajetória
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            Uma história de evolução
          </h2>
        </div>
        <div className="relative">
          {/* Linha central */}
          <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-start gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Ponto na timeline */}
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-bg border-4 border-background z-10 mt-1.5" />

                {/* Card */}
                <div
                  className={`ml-12 lg:ml-0 lg:w-[calc(50%-2rem)] ${index % 2 === 1 ? "lg:mr-auto" : "lg:ml-auto"}`}
                >
                  <div className="p-6 rounded-2xl bg-secondary/50 border border-border hover:bg-secondary transition-colors duration-300">
                    <span className="text-sm font-bold text-accent-bg">
                      {item.year}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-subtitle leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="bg-accent-bg rounded-2xl p-10 lg:p-16 text-center">
          <Users size={40} className="mx-auto text-white/80" />
          <h2 className="mt-6 text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Faça parte da nossa comunidade
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Junte-se a milhares de clientes que já descobriram uma forma melhor
            de comprar online.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 bg-accent hover:bg-[#f9e3ae] text-black uppercase tracking-widest rounded-lg font-medium py-3 px-8 text-xs transition-all"
          >
            Explorar Produtos
          </Link>
        </div>
      </section>
    </main>
  );
}
