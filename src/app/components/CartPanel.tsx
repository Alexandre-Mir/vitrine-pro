import {
  ShoppingBag,
  X,
  Loader2,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import formatCurrency from "@/utils/format-currency";
import Button from "./ui/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  const { items, addToCart, removeFromCart, decreaseQuantity, clearCart } =
    useCart();
  const [parent] = useAutoAnimate();
  const [checkoutState, setCheckoutState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleFakeCheckout = () => {
    setCheckoutState("loading");
    // Simula o delay de um request para um gateway de pagamento real
    setTimeout(() => {
      setCheckoutState("success");
    }, 1500);
  };

  const handleFinishAndClose = () => {
    clearCart();
    onClose();
    // Pequeno delay para a animação de fechar antes de resetar o estado
    setTimeout(() => {
      setCheckoutState("idle");
    }, 500);
  };

  if (checkoutState === "success") {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center h-full min-h-[400px] px-6 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-foreground">
          Fluxo de Carrinho Concluído! 🚀
        </h3>
        <p className="text-subtitle font-medium mb-2">
          Obrigado por testar o aplicativo.
        </p>
        <p className="text-sm text-subtitle/80 leading-relaxed max-w-sm mb-8">
          O objetivo técnico desta etapa (Validação de Preços Server-Side e
          Sincronização de Estado via Context) foi demonstrado com sucesso.
          <br />
          <br />
          Em um produto real, esta ação iniciaria a transação via gateway de
          pagamento. Para manter o foco deste projeto em Performance e
          Arquitetura, o fluxo financeiro foi omitido.
        </p>
        <Button
          onClick={handleFinishAndClose}
          className="w-full sm:w-auto px-8"
        >
          Esvaziar Carrinho e Voltar à Loja
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-full min-h-[300px]">
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-50">
          <ShoppingBag size={48} strokeWidth={1} />
          <p>Seu carrinho está vazio</p>
        </div>
      ) : (
        <ul
          ref={parent}
          className="flex flex-col gap-6 overflow-y-auto max-h-[60vh] pr-2 scrollbar-hide"
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 items-start border-b border-border pb-6 last:border-0"
            >
              <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-border">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <h5 className="font-medium line-clamp-2 leading-tight">
                  {item.title}
                </h5>
                <p className="text-sm text-subtitle capitalize">
                  {item.category}
                </p>
                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-1 bg-secondary rounded-md px-1 py-0.5 border border-border/50">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded text-subtitle hover:bg-background hover:text-foreground transition-colors disabled:opacity-50"
                      aria-label="Diminuir quantidade"
                      disabled={checkoutState === "loading"}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-6 h-6 flex items-center justify-center rounded text-subtitle hover:bg-background hover:text-foreground transition-colors disabled:opacity-50"
                      aria-label="Aumentar quantidade"
                      disabled={checkoutState === "loading"}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="none"
                className="text-subtitle hover:text-primary ml-auto"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remover item"
                disabled={checkoutState === "loading"}
              >
                <X size={20} />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="border-t border-border mt-auto pt-6 bg-background/95 backdrop-blur-sm sticky bottom-0">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium uppercase tracking-widest">
              Total
            </span>
            <span className="text-xl font-bold">{formatCurrency(total)}</span>
          </div>
          <Button
            className="w-full overflow-hidden relative"
            onClick={handleFakeCheckout}
            disabled={checkoutState === "loading"}
          >
            {checkoutState === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Processando...
              </span>
            ) : (
              "Finalizar Compra"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
