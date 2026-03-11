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
              className="flex gap-4 items-start border-b border-border pb-6 last:border-0"
            >
              <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-border">
                <FallbackImage
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
                      className="w-6 h-6 flex items-center justify-center rounded text-subtitle hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 cursor-pointer"
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
                      className="w-6 h-6 flex items-center justify-center rounded text-subtitle hover:bg-background hover:text-foreground transition-colors disabled:opacity-50 cursor-pointer"
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
          
          {checkoutState === "review" && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex flex-col gap-1.5 animate-fade-in">
              <strong className="font-bold">Atenção: Variação de Catálogo</strong>
              <p>Os preços de alguns itens foram atualizados em nosso servidor desde que foram adicionados. Por favor, revise o novo Total.</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              className="w-full overflow-hidden relative transition-all"
              onClick={handleFakeCheckout}
              disabled={checkoutState === "loading"}
            >
              {checkoutState === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Verificando Disponibilidade e Valores...
                </span>
              ) : checkoutState === "review" ? (
                "Estou ciente e desejo Finalizar a Compra"
              ) : (
                "Prosseguir para o Checkout"
              )}
            </Button>
            
            {checkoutState === "review" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCheckoutState("idle");
                  setHasReviewed(false);
                }}
              >
                Voltar e Revisar o Carrinho
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
