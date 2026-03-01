"use client";

import { useState, FormEvent } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";

const contactMethods = [
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@vitrinepro.com.br",
    description: "Resposta em até 24h úteis",
    href: "mailto:contato@vitrinepro.com.br",
  },
  {
    icon: Phone,
    title: "Telefone",
    value: "(61) 99999-9999",
    description: "Seg a Sex, 9h às 18h",
    href: "tel:+5561999999999",
  },
  {
    icon: MapPin,
    title: "Endereço",
    value: "Brasília – DF",
    description: "Sede Central",
    href: "#",
  },
  {
    icon: Clock,
    title: "Horário",
    value: "Seg a Sex, 9h - 18h",
    description: "Exceto feriados",
    href: "#",
  },
];

const faqItems = [
  {
    question: "Qual o prazo de entrega?",
    answer:
      "O prazo varia de acordo com a sua região. Em média, as entregas são realizadas entre 3 e 10 dias úteis após a confirmação do pagamento.",
  },
  {
    question: "Como posso rastrear meu pedido?",
    answer:
      "Após o envio do pedido, você receberá um e-mail com o código de rastreamento. Você pode acompanhar a entrega diretamente pelo nosso site ou app.",
  },
  {
    question: "Qual a política de trocas e devoluções?",
    answer:
      "Oferecemos 30 dias para troca ou devolução de produtos. O item deve estar em perfeitas condições e na embalagem original.",
  },
  {
    question: "Quais as formas de pagamento aceitas?",
    answer:
      "Aceitamos cartões de crédito (Visa, Mastercard, Elo), PIX, boleto bancário e carteiras digitais.",
  },
];

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    // Simulação de envio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus("success");
    setFormData({ nome: "", email: "", assunto: "", mensagem: "" });

    setTimeout(() => {
      setStatus("idle");
    }, 4000);
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <section className="relative bg-secondary py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-accent-bg/10 text-accent-bg px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
            <MessageCircle size={14} />
            Fale Conosco
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-primary tracking-tight">
            Contato
          </h1>
          <p className="mt-4 text-lg text-subtitle max-w-2xl mx-auto">
            Estamos aqui para ajudar. Envie sua mensagem e nossa equipe
            responderá o mais rápido possível.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Métodos de contato */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.title}
                href={method.href}
                className="group p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-lg hover:border-accent-bg/30 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-secondary group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-300">
                  <Icon
                    size={20}
                    className="text-primary group-hover:text-accent-bg transition-colors duration-300"
                  />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-primary">
                  {method.title}
                </h3>
                <p className="mt-1 text-sm text-primary font-medium">
                  {method.value}
                </p>
                <p className="mt-1 text-xs text-subtitle">
                  {method.description}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* Formulário + FAQ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Formulário */}
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-bg">
              Envie uma mensagem
            </span>
            <h2 className="mt-4 text-3xl font-bold text-primary tracking-tight">
              Como podemos ajudar?
            </h2>
            <p className="mt-3 text-subtitle">
              Preencha o formulário abaixo e entraremos em contato.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-nome"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Nome
                  </label>
                  <input
                    id="contact-nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    disabled={status !== "idle"}
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-primary placeholder:text-subtitle/50 outline-none focus:border-accent-bg/50 focus:ring-2 focus:ring-accent-bg/10 transition-all disabled:opacity-50"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={status !== "idle"}
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-primary placeholder:text-subtitle/50 outline-none focus:border-accent-bg/50 focus:ring-2 focus:ring-accent-bg/10 transition-all disabled:opacity-50"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-assunto"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Assunto
                </label>
                <input
                  id="contact-assunto"
                  type="text"
                  required
                  value={formData.assunto}
                  onChange={(e) =>
                    setFormData({ ...formData, assunto: e.target.value })
                  }
                  disabled={status !== "idle"}
                  className="w-full bg-background border border-border rounded-xl py-3 px-4 text-primary placeholder:text-subtitle/50 outline-none focus:border-accent-bg/50 focus:ring-2 focus:ring-accent-bg/10 transition-all disabled:opacity-50"
                  placeholder="Do que se trata?"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-mensagem"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-mensagem"
                  rows={5}
                  required
                  value={formData.mensagem}
                  onChange={(e) =>
                    setFormData({ ...formData, mensagem: e.target.value })
                  }
                  disabled={status !== "idle"}
                  className="w-full bg-background border border-border rounded-xl py-3 px-4 text-primary placeholder:text-subtitle/50 outline-none focus:border-accent-bg/50 focus:ring-2 focus:ring-accent-bg/10 transition-all resize-none disabled:opacity-50"
                  placeholder="Descreva como podemos ajudar..."
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Enviando...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={16} />
                    Mensagem Enviada!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar Mensagem
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* FAQ */}
          <div>
            <span className="text-xs font-medium tracking-widest uppercase text-accent-bg">
              Dúvidas frequentes
            </span>
            <h2 className="mt-4 text-3xl font-bold text-primary tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="mt-3 text-subtitle">
              Confira as respostas para as perguntas mais comuns.
            </p>

            <div className="mt-8 space-y-3">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-accent-bg/20"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="font-medium text-primary text-sm pr-4">
                      {item.question}
                    </span>
                    <ArrowRight
                      size={16}
                      className={`shrink-0 text-subtitle transition-transform duration-300 ${expandedFaq === index ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? "max-h-40 pb-5" : "max-h-0"}`}
                  >
                    <p className="px-5 text-sm text-subtitle leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
