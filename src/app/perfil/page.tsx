"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Star,
  Truck,
  Edit3,
  Shield,
} from "lucide-react";
import Button from "../components/ui/Button";

// Dados simulados do perfil
const userProfile = {
  name: "Alexandre Miranda",
  email: "alexandre@email.com",
  joinDate: "Membro desde Jan 2025",
  avatar: null, // Sem avatar real por enquanto
};

const orderHistory = [
  {
    id: "#VP-2026-0342",
    date: "25/02/2026",
    status: "Entregue",
    statusColor: "text-green-600 bg-green-100",
    total: "R$ 349,90",
    items: 3,
  },
  {
    id: "#VP-2026-0298",
    date: "18/02/2026",
    status: "Em trânsito",
    statusColor: "text-blue-600 bg-blue-100",
    total: "R$ 127,50",
    items: 1,
  },
  {
    id: "#VP-2026-0215",
    date: "02/02/2026",
    status: "Entregue",
    statusColor: "text-green-600 bg-green-100",
    total: "R$ 589,00",
    items: 2,
  },
];

const menuItems = [
  { icon: Package, label: "Meus Pedidos", count: 3 },
  { icon: Heart, label: "Lista de Desejos", count: 12 },
  { icon: MapPin, label: "Endereços", count: 2 },
  { icon: CreditCard, label: "Pagamento" },
  { icon: Bell, label: "Notificações", count: 5 },
  { icon: Shield, label: "Segurança" },
  { icon: Settings, label: "Configurações" },
];

const stats = [
  { icon: ShoppingBag, value: "24", label: "Pedidos" },
  { icon: Star, value: "4.8", label: "Avaliação" },
  { icon: Heart, value: "12", label: "Favoritos" },
  { icon: Truck, value: "3", label: "Em andamento" },
];

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState("pedidos");

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header do Perfil */}
      <section className="relative bg-secondary overflow-hidden">
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(45deg, var(--primary) 25%, transparent 25%), linear-gradient(-45deg, var(--primary) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--primary) 75%), linear-gradient(-45deg, transparent 75%, var(--primary) 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 relative">
          <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full bg-accent-bg flex items-center justify-center shadow-lg ring-4 ring-background">
                <span className="text-white text-4xl lg:text-5xl font-bold">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
              <button
                className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-md hover:bg-[#f9e3ae] transition-colors cursor-pointer"
                aria-label="Editar avatar"
              >
                <Edit3 size={14} className="text-black" />
              </button>
            </div>

            {/* Info */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                {userProfile.name}
              </h1>
              <p className="mt-1 text-subtitle">{userProfile.email}</p>
              <p className="mt-1 text-xs text-subtitle/70">
                {userProfile.joinDate}
              </p>
            </div>

            {/* Ação rápida */}
            <Button variant="primary" size="default" className="gap-2">
              <Edit3 size={14} />
              Editar Perfil
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-background/80 backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 border border-border shadow-sm"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-accent-bg" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs text-subtitle mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Menu */}
          <aside className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-colors duration-200 text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-subtitle group-hover:text-accent-bg transition-colors duration-300"
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium text-primary">
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span className="text-xs bg-secondary text-subtitle px-2.5 py-1 rounded-full group-hover:bg-accent/20 group-hover:text-accent-bg transition-colors duration-300">
                      {item.count}
                    </span>
                  )}
                  <ChevronRight
                    size={14}
                    className="text-subtitle/40 group-hover:text-accent-bg transition-colors duration-300"
                  />
                </button>
              );
            })}

            <hr className="border-border my-4" />

            <button className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-200 text-left group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-secondary group-hover:bg-red-100 dark:group-hover:bg-red-900/30 flex items-center justify-center transition-colors duration-300">
                <LogOut
                  size={18}
                  className="text-subtitle group-hover:text-red-500 transition-colors duration-300"
                />
              </div>
              <span className="flex-1 text-sm font-medium text-primary group-hover:text-red-500 transition-colors duration-300">
                Sair da conta
              </span>
            </button>
          </aside>

          {/* Conteúdo principal */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary tracking-tight">
                Pedidos Recentes
              </h2>
              <Link
                href="#"
                className="text-xs font-medium tracking-widest uppercase text-accent-bg hover:underline"
              >
                Ver Todos
              </Link>
            </div>

            {/* Lista de pedidos */}
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="group p-6 rounded-2xl border border-border bg-background hover:shadow-lg hover:border-accent-bg/20 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                        <Package size={20} className="text-subtitle" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-sm">
                          {order.id}
                        </p>
                        <p className="text-xs text-subtitle mt-0.5">
                          {order.date} • {order.items}{" "}
                          {order.items === 1 ? "item" : "itens"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span
                        className={`text-xs font-medium px-3 py-1.5 rounded-full ${order.statusColor}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-bold text-primary text-sm">
                        {order.total}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-subtitle/40 group-hover:text-accent-bg transition-colors duration-300 hidden sm:block"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Card de aviso */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                  <Bell size={18} className="text-accent-bg" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm">
                    Ative as notificações
                  </h3>
                  <p className="text-xs text-subtitle mt-1">
                    Receba alertas sobre promoções exclusivas, atualizações de
                    pedidos e novidades da Vitrine Pro.
                  </p>
                  <Button variant="primary" size="sm" className="mt-3 gap-1.5">
                    Ativar
                    <Bell size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
