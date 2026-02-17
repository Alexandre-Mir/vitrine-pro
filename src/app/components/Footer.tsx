"use client";

import {
  ChevronRight,
  GithubIcon,
  LinkedinIcon,
  Loader2,
  Check,
} from "lucide-react";
import { useState, FormEvent } from "react";
import Button from "./ui/Button";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus("success");
    setEmail("");

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  }

  return (
    <footer className="bg-background text-primary py-16 ">
      <div className="md:px-14 md:max-w-full max-w-xs mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-rows-2 gap-12 lg:gap-16">
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Sobre </h4>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Molestiae temporibus reiciendis modi repellat dolorem placeat
              quidem facilis voluptatum repellendus, voluptatem sunt alias quis
              ab distinctio aspernatur reprehenderit illo veritatis optio.
            </p>
          </div>
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Lorem ipsum</h4>
            <ul className="mt-5 flex flex-col gap-2">
              <li>
                <Link href="/">Shop</Link>
              </li>
              <li>
                <Link href="/">Bundle + Save</Link>
              </li>
              <li>
                <Link href="/about">Sobre</Link>
              </li>
              <li>
                <Link href="/contact">Contato</Link>
              </li>
            </ul>
          </div>
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Lorem ipsum</h4>
            <ul className="mt-5 flex flex-col gap-2">
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/">Envios e Devoluções</Link>
              </li>
              <li>
                <Link href="/">Termos de Serviço</Link>
              </li>
              <li>
                <Link href="/">Política de Privacidade</Link>
              </li>
            </ul>
          </div>
          <div className="flex-col flex">
            <h4 className="tracking-tight font-bold text-xl">Newsletter</h4>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="max-w-[304px] flex-nowrap flex flex-row mt-5"
            >
              <input
                className="bg-background border border-primary h-14 w-full py-3 pl-5 rounded-l-full text-primary placeholder:text-primary outline-none disabled:opacity-50"
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status !== "idle"}
              />
              <Button
                type="submit"
                variant="outline"
                size="none"
                className="rounded-r-full w-14 disabled:opacity-100"
                aria-label="Assinar newsletter"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <Loader2 size={20} className="m-auto animate-spin" />
                ) : status === "success" ? (
                  <Check size={20} className="m-auto text-green-600" />
                ) : (
                  <ChevronRight size={20} className="m-auto" />
                )}
              </Button>
            </form>
          </div>
          <div className="h1-logo mt-10 lg:text-[10rem] md:text-[8rem] text-[4rem] self-end flex place-content-center col-span-full leading-none text-nowrap">
            <span>Vitrine Pro</span>
          </div>
        </div>
      </div>
      <div className="md:px-14 mt-4 md:max-w-full max-w-xs mx-auto flex md:justify-between flex-col md:flex-row justify-center ">
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/seu-perfil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
        </div>
        <div className="mt-1">
          <span className="text-sm">
            © 2026 Vitrine Pro. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
