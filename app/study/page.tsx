"use client";
import { useState, useMemo } from "react";
import { studyCards, QuizTable } from "@/app/lib/data";
import MathText from "@/app/components/MathText";
import LogicGate from "@/app/components/LogicGate";

function CardTable({ table }: { table: QuizTable }) {
  const highlighted = new Set(table.highlights ?? []);
  return (
    <div className="overflow-x-auto">
      <table className="text-xs border-collapse rounded-lg overflow-hidden w-full">
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th key={h} className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-mono font-bold text-center text-slate-700 dark:text-slate-300">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => {
            const hi = highlighted.has(ri);
            return (
              <tr key={ri} className={hi ? "bg-blue-50 dark:bg-blue-950" : ""}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-3 py-1 border border-slate-200 dark:border-slate-700 font-mono text-center ${hi ? "text-blue-700 dark:text-blue-300 font-semibold" : "text-slate-500 dark:text-slate-500"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const ALL = "Todos";

export default function StudyPage() {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(studyCards.map((c) => c.category)));
    return [ALL, ...cats];
  }, []);

  const [activeCategory, setActiveCategory] = useState(ALL);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? studyCards
        : studyCards.filter((c) => c.category === activeCategory),
    [activeCategory]
  );

  const card = filtered[index] ?? filtered[0];

  function changeCategory(cat: string) {
    setActiveCategory(cat);
    setIndex(0);
    setFlipped(false);
  }

  function prev() {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  }

  function next() {
    setFlipped(false);
    setIndex((i) => Math.min(filtered.length - 1, i + 1));
  }

  if (!card) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 sm:py-14 animate-fade-up">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-1">
            Estudo
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Flashcards
          </h1>
        </div>

        {/* Counter */}
        <div className="text-right flex-shrink-0">
          <p className="font-mono font-black text-slate-900 dark:text-white leading-none" style={{ fontSize: "1.75rem" }}>
            {String(index + 1).padStart(2, "0")}
            <span className="text-base font-normal text-slate-300 dark:text-slate-700">
              /{String(filtered.length).padStart(2, "0")}
            </span>
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-0.5 max-w-[120px] text-right leading-tight">
            {card.category}
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 mb-8" role="group" aria-label="Filtrar por categoria">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-blue-600 dark:bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flip card */}
      <div
        className={`card-scene mb-5 cursor-pointer select-none ${flipped ? "flipped" : ""}`}
        style={{ height: "clamp(260px, 38vh, 320px)" }}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? "Virar para a pergunta" : "Virar para a resposta"}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
      >
        <div className="card-inner">
          {/* Front */}
          <div className="card-face bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center gap-5 px-8 py-10 sm:px-12 text-center">
            <p className="text-slate-800 dark:text-slate-100 font-medium text-base sm:text-lg leading-relaxed max-w-lg">
              <MathText text={card.front} />
            </p>
            {card.formula && (
              <code className="font-mono text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 px-3.5 py-1.5 rounded-lg">
                {card.formula}
              </code>
            )}
            <p className="absolute bottom-4 text-[11px] text-slate-300 dark:text-slate-700 flex items-center gap-1.5 select-none">
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                <path d="M6 1v4.5M6 4.5L4 2.5M6 4.5L8 2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 8h8" strokeLinecap="round" />
                <path d="M3 10h6" strokeLinecap="round" />
              </svg>
              clique para virar
            </p>
          </div>

          {/* Back */}
          <div className="card-face card-face-back bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-start justify-center gap-3 px-8 py-10 sm:px-12">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${card.textColor} ${card.color}`}
            >
              {card.category}
            </span>
            <div className="text-slate-700 dark:text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line flex-1 min-h-0 overflow-auto w-full">
              {card.back}
            </div>
            {card.formula && (
              <code className="font-mono text-xs text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-700 pt-2.5 w-full">
                {card.formula}
              </code>
            )}
          </div>
        </div>
      </div>

      {/* Extra reference — table and gate, shown only when card is flipped */}
      {flipped && (card.table || card.gate) && (
        <div className="mb-5 animate-pop space-y-3">
          {card.gate && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <LogicGate type={card.gate} w={120} />
              <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Símbolo padrão ANSI da porta <span className="font-bold font-mono">{card.gate}</span>
              </div>
            </div>
          )}
          {card.table && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 px-3 pt-2.5">
                Tabela de Referência
              </p>
              <div className="p-3">
                <CardTable table={card.table} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Card anterior"
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            <path d="M10 4L6 8l4 4" />
          </svg>
        </button>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          {flipped ? "Ver pergunta" : "Ver resposta"}
        </button>

        <button
          onClick={next}
          disabled={index === filtered.length - 1}
          aria-label="Próximo card"
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 rounded-full"
          style={{ width: `${((index + 1) / filtered.length) * 100}%` }}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={filtered.length}
        />
      </div>

      {/* Progress dots — jump navigation */}
      <div className="mt-3 flex flex-wrap gap-1 justify-center" role="group" aria-label="Navegar por card">
        {filtered.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setFlipped(false); }}
            aria-label={`Ir para card ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`rounded-full transition-all duration-200 focus-visible:outline-2 ${
              i === index
                ? "w-4 h-1.5 bg-blue-600"
                : i < index
                ? "w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                : "w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
