import {
  ShoppingBag,
  X,
  Loader2,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";
import FallbackImage from "./FallbackImage";
import { useCart } from "@/context/cart-context";
import formatCurrency from "@/utils/format-currency";
import Button from "./ui/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateCartItems } from "../actions/validate-cart-items";
import { toast } from "sonner";

interface CartPanelProps {
  onClose: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  const {
    items,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    updateItemPrice,
    clearCart,
  } = useCart();
  const [parent] = useAutoAnimate();
  const [checkoutState, setCheckoutState] = useState<
    "idle" | "loading" | "review"
  >("idle");
  const [hasReviewed, setHasReviewed] = useState(false);
  const router = useRouter();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleFakeCheckout = async () => {
    // O usuário acabou de revisar do estado 'review', prosseguir!
    if (hasReviewed) {
      onClose();
      router.push("/checkout");
      setCheckoutState("idle");
      return;
    }

    setCheckoutState("loading");

    try {
      // Revalida TODOS os itens do carrinho contra o servidor em 1 request
      const result = await validateCartItems(items);

      if (!result.success || !result.data) {
        toast.error(result.error || "Falha ao validar itens. Tente novamente.");
        setCheckoutState("idle");
        return;
      }

      // Identifica itens com preço divergente e atualiza
      let priceChanges = 0;
      result.data.forEach((validation) => {
        const { id, isValid, freshProduct } = validation;
        if (!isValid && freshProduct) {
          updateItemPrice(id, freshProduct.price);
          priceChanges++;
        } else if (!isValid && !freshProduct) {
          // Trata caso de produto deletado (aqui apenas exibimos erro genérico ou aprimoramos lógica depois)
          priceChanges++; 
        }
      });

      if (priceChanges > 0) {
        toast.warning(
          `${priceChanges} ${priceChanges === 1 ? "item teve o preço atualizado" : "itens tiveram o preço atualizado"} devido a alta demanda.`,
        );
        // Interrompe o fluxo e pede permissão explícita
        setCheckoutState("review");
        setHasReviewed(true);
        return;
      }

      // Todos os preços válidos — prossegue com o checkout
      onClose();
      router.push("/checkout");
      setCheckoutState("idle");
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
      setCheckoutState("idle");
    }
  };

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
              className="flex gap-5 items-start bg-secondary/10 dark:bg-secondary/5 p-4 rounded-2xl border border-secondary/20 transition-all hover:border-secondary/40"
            >
              <div className="relative w-24 h-24 bg-white dark:bg-white/10 rounded-xl overflow-hidden shrink-0 border border-secondary/30 flex items-center justify-center p-2">
                <FallbackImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-2 mix-blend-multiply dark:mix-blend-normal"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5 h-full">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-primary line-clamp-2 leading-tight">
                    {item.title}
                  </h5>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-subtitle hover:text-red-500 transition-colors p-1"
                    aria-label="Remover item"
                    disabled={checkoutState === "loading"}
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-subtitle">
                  {item.category}
                </p>
                <div className="flex justify-between items-center mt-auto pt-2">
                  <div className="flex items-center bg-background dark:bg-secondary/20 rounded-full border border-border/60 shadow-sm p-0.5">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-primary hover:bg-secondary/40 transition-colors disabled:opacity-30 cursor-pointer"
                      aria-label="Diminuir quantidade"
                      disabled={checkoutState === "loading"}
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="text-sm font-bold w-7 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-primary hover:bg-secondary/40 transition-colors disabled:opacity-30 cursor-pointer"
                      aria-label="Aumentar quantidade"
                      disabled={checkoutState === "loading"}
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-primary">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="border-t border-border mt-auto pt-8 pb-4 bg-background/95 backdrop-blur-sm sticky bottom-0">
          <div className="flex justify-between items-center mb-8 px-2">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-subtitle">
              Subtotal
            </span>
            <span className="text-2xl font-extrabold tracking-tighter text-primary">
              {formatCurrency(total)}
            </span>
          </div>
          
          {checkoutState === "review" && (
            <div className="mb-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-xs p-4 rounded-2xl flex flex-col gap-1.5 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <strong className="font-bold">Atenção: Variação de Catálogo</strong>
              </div>
              <p className="opacity-80">Os preços de alguns itens foram atualizados em nosso servidor. Por favor, revise o novo Total antes de prosseguir.</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button
              className="w-full h-14 rounded-2xl text-base font-bold overflow-hidden relative transition-all shadow-lg shadow-accent/20 active:scale-[0.98]"
              onClick={handleFakeCheckout}
              disabled={checkoutState === "loading"}
            >
              {checkoutState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Validando Carrinho...
                </span>
              ) : checkoutState === "review" ? (
                "Estou ciente e desejo Finalizar"
              ) : (
                "Finalizar Compra"
              )}
            </Button>
            
            {checkoutState === "review" ? (
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl text-sm font-semibold border-secondary/60"
                onClick={() => {
                  setCheckoutState("idle");
                  setHasReviewed(false);
                }}
              >
                Voltar e Revisar
              </Button>
            ) : (
               <button 
                onClick={onClose}
                className="text-center text-xs font-bold uppercase tracking-widest text-subtitle hover:text-primary transition-colors py-2"
               >
                  Continuar Comprando
               </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
