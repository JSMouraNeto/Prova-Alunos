"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/study",   label: "Flashcards" },
  { href: "/mindmap", label: "Mapa Mental" },
  { href: "/quiz",    label: "Prova" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-white/80 dark:bg-[#0d1117]/85 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/80"
      aria-label="Navegação principal"
    >
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 group"
          aria-label="ICD — Introdução aos Circuitos Digitais"
        >
          <span className="font-mono text-sm font-black tracking-widest text-slate-900 dark:text-white uppercase">
            ICD
          </span>
          <span className="hidden sm:block text-[11px] text-slate-400 dark:text-slate-600 mt-px font-medium">
            Circuitos Digitais
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1" role="list">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="listitem"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === l.href
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70"
              }`}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden animate-slide-down border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md px-6 pt-2 pb-4 space-y-0.5"
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`flex items-center h-10 text-sm rounded-lg px-2 ${
              pathname === "/"
                ? "text-blue-600 dark:text-blue-400 font-semibold"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Início
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center h-10 text-sm rounded-lg px-2 ${
                pathname === l.href
                  ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
