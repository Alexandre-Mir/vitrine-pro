"use client";

import { useState, useRef, FormEvent } from "react";
import {
  MapPin,
  Loader2,
  CheckCircle2,
  CreditCard,
  User,
  ShoppingBag,
  ArrowLeft,
  Search,
} from "lucide-react";
import Button from "../components/ui/Button";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import formatCurrency from "@/utils/format-currency";
import FallbackImage from "../components/FallbackImage";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const numeroRef = useRef<HTMLInputElement>(null);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove não numéricos
    const rawValue = e.target.value.replace(/\D/g, "");
    
    // Formatação visual: 00000-000
    let formattedCep = rawValue;
    if (rawValue.length > 5) {
      formattedCep = `${rawValue.slice(0, 5)}-${rawValue.slice(5, 8)}`;
    }

    setFormData((prev) => ({ ...prev, cep: formattedCep }));

    // Se atingiu 8 caracteres limpos, busca na API
    if (rawValue.length === 8) {
      setIsFetchingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${rawValue}/json/`);
        const data = await res.json();

        if (data.erro) {
          throw new Error("CEP não encontrado");
        }

        setFormData((prev) => ({
          ...prev,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          estado: data.uf || "",
        }));

        // Foca automaticamente no campo Número após o delay natural do state update
        setTimeout(() => {
          numeroRef.current?.focus();
        }, 100);

      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setIsFetchingCep(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    // Simulação de transação
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus("success");
    clearCart();
  }

  if (status === "success") {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in pt-[var(--header-height)]">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground tracking-tight">
          Pedido Confirmado! 🎉
        </h1>
        <p className="text-subtitle font-medium mb-2 text-lg">
          Obrigado pela sua compra.
        </p>
        <p className="text-sm text-subtitle/80 leading-relaxed max-w-md mb-8">
          A automação de preenchimento via CEP que implementamos evitou que você
          tivesse que digitar seu Endereço, Bairro, Cidade e Estado na mão. Isso
          salva dezenas de segundos cruciais do cliente e despenca as taxas de abandono!
        </p>
        <Link href="/">
          <Button className="px-8">Voltar para a Página Inicial</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/20 pb-20 pt-[calc(var(--header-height)*1.5)]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-primary hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Finalizar Compra
            </h1>
            <p className="text-subtitle mt-1">
              Preencha seus dados para completar o pedido.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Coluna do Formulário (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
            
            {/* Bloco de Contato */}
            <section className="bg-background border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-accent-bg/10 dark:bg-accent/10 text-accent-bg dark:text-accent rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <h2 className="text-xl font-semibold text-primary">
                  1. Dados Pessoais
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-primary mb-2">
                    Nome Completo
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:border-accent-bg dark:focus:border-accent focus:ring-2 focus:ring-accent-bg focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-accent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:border-accent-bg dark:focus:border-accent focus:ring-2 focus:ring-accent-bg focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-accent transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Bloco de Endereço */}
            <section className="bg-background border border-border rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-accent-bg/10 dark:bg-accent/10 text-accent-bg dark:text-accent rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-primary">
                    2. Endereço de Entrega
                  </h2>
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded">ViaCEP Ativo</span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="relative w-full sm:w-1/2">
                  <label htmlFor="cep" className="block text-sm font-medium text-primary mb-2">
                    CEP
                  </label>
                  <div className="relative">
                    <input
                      id="cep"
                      name="cep"
                      type="text"
                      maxLength={9}
                      required
                      value={formData.cep}
                      onChange={handleCepChange}
                      placeholder="00000-000"
                      className="w-full bg-background border border-border rounded-xl py-3 pl-4 pr-10 outline-none focus:border-accent-bg dark:focus:border-accent focus:ring-2 focus:ring-accent-bg focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-accent transition-all font-mono"
                    />
                    {isFetchingCep ? (
                      <Loader2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary animate-spin" />
                    ) : (
                      <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-subtitle" />
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-5">
                  <div className="sm:col-span-3">
                    <label htmlFor="rua" className="block text-sm font-medium text-primary mb-2">
                      Rua
                    </label>
                    <input
                      id="rua"
                      name="rua"
                      type="text"
                      required
                      value={formData.rua}
                      onChange={handleInputChange}
                      className="w-full bg-secondary/30 disabled:opacity-70 border border-border rounded-xl py-3 px-4 outline-none focus:border-accent-bg/50 dark:focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="numero" className="block text-sm font-medium text-primary mb-2">
                      Número
                    </label>
                    <input
                      id="numero"
                      name="numero"
                      ref={numeroRef}
                      type="text"
                      required
                      value={formData.numero}
                      onChange={handleInputChange}
                      className="w-full bg-background border-2 border-border focus:border-green-500 rounded-xl py-3 px-4 outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="complemento" className="block text-sm font-medium text-primary mb-2">
                      Complemento <span className="text-subtitle font-normal">(Opcional)</span>
                    </label>
                    <input
                      id="complemento"
                      name="complemento"
                      type="text"
                      value={formData.complemento}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-border rounded-xl py-3 px-4 outline-none focus:border-accent-bg/50 dark:focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="bairro" className="block text-sm font-medium text-primary mb-2">
                      Bairro
                    </label>
                    <input
                      id="bairro"
                      name="bairro"
                      type="text"
                      required
                      value={formData.bairro}
                      onChange={handleInputChange}
                      className="w-full bg-secondary/30 disabled:opacity-70 border border-border rounded-xl py-3 px-4 outline-none focus:border-accent-bg/50 dark:focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Cidade / UF
                    </label>
                    <div className="flex gap-2 w-full">
                      <input
                        name="cidade"
                        type="text"
                        required
                        value={formData.cidade}
                        onChange={handleInputChange}
                        className="w-[70%] bg-secondary/30 disabled:opacity-70 border border-border rounded-xl py-3 px-4 outline-none"
                      />
                      <input
                        name="estado"
                        type="text"
                        maxLength={2}
                        required
                        value={formData.estado}
                        onChange={handleInputChange}
                        className="w-[30%] bg-secondary/30 disabled:opacity-70 border border-border rounded-xl py-3 px-4 outline-none text-center uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Resumo do Pedido (1/3) */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-background border border-border rounded-2xl p-6 sticky top-[calc(var(--header-height)+2rem)] shadow-sm flex flex-col h-fit">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 bg-accent-bg/10 dark:bg-accent/10 text-accent-bg dark:text-accent rounded-full flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="text-xl font-semibold text-primary">
                  Resumo
                </h2>
              </div>
              
              {items.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-subtitle">Seu carrinho está vazio.</p>
                  <Link href="/" className="text-accent-bg dark:text-accent text-sm font-medium hover:underline mt-2 inline-block">
                    Continuar comprando
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="flex flex-col gap-4 mb-6 max-h-[30vh] overflow-y-auto pr-2 scrollbar-hide">
                    {items.map((item) => (
                      <li key={item.id} className="flex gap-3 items-center">
                        <div className="relative w-12 h-12 bg-white rounded-lg overflow-hidden shrink-0 border border-border">
                          <FallbackImage src={item.image} alt={item.title} fill className="object-contain p-2" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-sm font-medium line-clamp-1">{item.title}</span>
                          <span className="text-xs text-subtitle">{item.quantity}x {formatCurrency(item.price)}</span>
                        </div>
                        <span className="text-sm font-bold">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="border-t border-border pt-4 mb-6 space-y-2">
                    <div className="flex justify-between text-sm text-subtitle">
                      <span>Subtotal</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-subtitle">
                      <span>Frete (ViaCEP)</span>
                      <span className="text-green-600 font-medium">Grátis</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-border/50 mt-2">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <Button 
                      type="submit" 
                      className="w-full gap-2 relative overflow-hidden" 
                      disabled={status === "loading" || items.length === 0}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Processando...
                        </>
                      ) : (
                        <>
                          <CreditCard size={18} /> Confirmar Pedido
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
