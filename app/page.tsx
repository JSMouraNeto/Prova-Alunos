import Link from "next/link";

const modules = [
  {
    href: "/study",
    number: "01",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden>
        <rect x="2.5" y="3" width="15" height="11" rx="2" />
        <path d="M6 7.5h8M6 10.5h5" strokeLinecap="round" />
        <path d="M7 17h6" strokeLinecap="round" />
        <path d="M10 14v3" strokeLinecap="round" />
      </svg>
    ),
    title: "Flashcards",
    description: "20 cartões com conceitos, fórmulas e explicações. Vire o card para revelar a resposta.",
    badge: "35 cards",
    cta: null,
  },
  {
    href: "/mindmap",
    number: "02",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden>
        <circle cx="10" cy="10" r="2.5" />
        <path d="M10 5V7.5M10 12.5V15M5 10H7.5M12.5 10H15" strokeLinecap="round" />
        <circle cx="10" cy="5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="10" cy="15" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="10" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Mapa Mental",
    description: "Visualize as conexões entre Átomo, Corrente, Ohm, Potência, Circuitos e Sistemas Digitais.",
    badge: "14 nós",
    cta: null,
  },
  {
    href: "/quiz",
    number: "03",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden>
        <path d="M3 5h14M3 9h9M3 13h6" strokeLinecap="round" />
        <circle cx="15" cy="13.5" r="3" />
        <path d="M13.8 13.5l.9.9 1.8-1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Prova",
    description: "40 questões cobrindo toda a ementa: lei de Ohm, portas lógicas, álgebra booleana, flip-flops, MUX/DEMUX, comparadores e somadores.",
    badge: "40 questões",
    cta: "Iniciar prova",
  },
];

const topics = [
  "Estrutura Atômica",
  "Tensão & Corrente",
  "Fontes de Tensão",
  "Lei de Ohm",
  "Potência Elétrica",
  "Circuito Série",
  "Circuito Paralelo",
  "Circuito Misto",
  "Sistemas Digitais",
  "Clock & Pulsos",
  "Portas Lógicas",
  "Álgebra Booleana",
  "Flip-Flops",
  "Circuitos Combinacionais",
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24">

      {/* Hero */}
      <div className="mb-14 animate-fade-up">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-7 px-3 py-1.5 border border-blue-200 dark:border-blue-900 rounded-full bg-blue-50 dark:bg-blue-950">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
          ICET-UFAM · 1º Período · Engenharia de Software
        </span>

        <h1 className="font-mono text-8xl sm:text-[9rem] font-black tracking-tight text-slate-900 dark:text-white leading-none mb-4">
          ICD
        </h1>

        <p className="text-xl sm:text-2xl text-slate-400 dark:text-slate-500 font-light">
          Introdução aos Circuitos Digitais
        </p>
      </div>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-1.5 mb-14 animate-fade-up">
        {topics.map((t) => (
          <span
            key={t}
            className="text-[11px] font-medium text-slate-400 dark:text-slate-600 px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 mb-5 animate-fade-up">
        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-600">
          Módulos
        </span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
        <span className="text-[10px] text-slate-300 dark:text-slate-700 font-mono">3</span>
      </div>

      {/* Module cards */}
      <div className="space-y-2 animate-fade-up">
        {modules.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group relative flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50 dark:hover:bg-slate-800 hover:shadow-sm transition-all duration-200"
          >
            {/* Ghost number — decorative */}
            <span
              className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 font-mono font-black text-slate-100 dark:text-slate-800 select-none pointer-events-none leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
              aria-hidden
            >
              {m.number}
            </span>

            {/* Icon square */}
            <div className="relative z-10 flex-shrink-0 w-11 h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200">
              {m.icon}
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white text-[15px] leading-tight mb-0.5">
                {m.title}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                {m.description}
              </p>
            </div>

            {/* CTA */}
            <div className="relative z-10 flex-shrink-0 flex items-center gap-2.5">
              <span className="hidden sm:block text-xs text-slate-300 dark:text-slate-700 font-mono">
                {m.badge}
              </span>
              {m.cta ? (
                <span className="px-4 py-1.5 bg-orange-500 group-hover:bg-orange-600 text-white text-xs font-bold tracking-wide rounded-lg transition-colors whitespace-nowrap">
                  {m.cta}
                </span>
              ) : (
                <span className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all duration-200 text-sm">
                  →
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-16 text-xs text-slate-300 dark:text-slate-700 font-mono">
        ICD · Prof. Carlos Freitas · ICET-UFAM
      </p>
    </div>
  );
}
