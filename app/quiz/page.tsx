"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { quizQuestions, QuizQuestion, QuizTable } from "@/app/lib/data";
import MathText from "@/app/components/MathText";
import LogicGate from "@/app/components/LogicGate";

type AnswerState = { chosen: string; correct: boolean };

const SESSION_SIZE = 10;
const EASY_COUNT   = 3;   // "difícil"
const HARD_COUNT   = SESSION_SIZE - EASY_COUNT;  // "muito difícil"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleOptions(q: QuizQuestion): QuizQuestion {
  const correctText = q.options.find((o) => o.id === q.correct)!.text;
  const shuffled = shuffle(q.options).map((o, i) => ({
    id: String.fromCharCode(97 + i),
    text: o.text,
  }));
  const newCorrect = shuffled.find((o) => o.text === correctText)!.id;
  return { ...q, options: shuffled, correct: newCorrect };
}

function getSession(): QuizQuestion[] {
  const easy = quizQuestions.filter((q) => q.difficulty === "difícil");
  const hard = quizQuestions.filter((q) => q.difficulty === "muito difícil");
  return shuffle([
    ...shuffle(easy).slice(0, EASY_COUNT),
    ...shuffle(hard).slice(0, HARD_COUNT),
  ]).map(shuffleOptions);
}

function TruthTable({ table }: { table: QuizTable }) {
  const highlightSet = new Set(table.highlights ?? []);
  return (
    <div className="mb-5 overflow-x-auto">
      <table className="text-sm border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr>
            {table.headers.map((h) => (
              <th
                key={h}
                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-mono font-bold text-center text-slate-700 dark:text-slate-300 text-xs"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => {
            const hi = highlightSet.has(ri);
            return (
              <tr key={ri} className={hi ? "bg-blue-50 dark:bg-blue-950" : ""}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-3 py-1 border border-slate-200 dark:border-slate-700 font-mono text-center text-xs ${
                      hi
                        ? "text-blue-700 dark:text-blue-300 font-semibold"
                        : "text-slate-500 dark:text-slate-500"
                    }`}
                  >
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

export default function QuizPage() {
  const [session, setSession]     = useState<QuizQuestion[] | null>(null);
  const [idx, setIdx]             = useState(0);
  const [answers, setAnswers]     = useState<Record<string, AnswerState>>({});
  const [hintVisible, setHintVisible] = useState<Record<string, boolean>>({});
  const [finished, setFinished]   = useState(false);

  useEffect(() => {
    setSession(getSession());
  }, []);

  if (!session) return null;

  const q        = session[idx];
  const answered = answers[q.id];
  const score    = Object.values(answers).filter((a) => a.correct).length;
  const hintShown = !!hintVisible[q.id];
  const total    = session.length;

  function choose(optionId: string) {
    if (answered) return;
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { chosen: optionId, correct: optionId === q.correct },
    }));
  }

  function next() {
    if (idx < total - 1) setIdx((i) => i + 1);
    else setFinished(true);
  }

  function restart() {
    setSession(getSession());
    setIdx(0);
    setAnswers({});
    setHintVisible({});
    setFinished(false);
  }

  function optionClass(optId: string): string {
    const base =
      "group w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 ";
    if (!answered) {
      return (
        base +
        "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
      );
    }
    if (optId === q.correct) {
      return base + "border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-300 animate-correct";
    }
    if (optId === answered.chosen && !answered.correct) {
      return base + "border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 animate-wrong";
    }
    return base + "border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700";
  }

  function letterClass(optId: string): string {
    const base = "w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold uppercase flex-shrink-0 mt-0.5 transition-colors ";
    if (!answered) {
      return base + "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-400";
    }
    if (optId === q.correct)
      return base + "bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-300";
    if (optId === answered.chosen && !answered.correct)
      return base + "bg-red-200 dark:bg-red-900 text-red-600 dark:text-red-300";
    return base + "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700";
  }

  /* ── Results ──────────────────────────────────────── */
  if (finished) {
    const pct    = Math.round((score / total) * 100);
    const passed = pct >= 70;

    const catStats = session.reduce((acc, qq) => {
      if (!acc[qq.category]) acc[qq.category] = { correct: 0, total: 0 };
      acc[qq.category].total++;
      if (answers[qq.id]?.correct) acc[qq.category].correct++;
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);
    const catEntries = Object.entries(catStats).sort(
      ([, a], [, b]) => a.correct / a.total - b.correct / b.total
    );

    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-up">
        <div className="mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-3">
            Resultado Final
          </p>
          <div className="flex items-end gap-4 mb-4">
            <span
              className="font-mono font-black text-slate-900 dark:text-white leading-none"
              style={{ fontSize: "4rem" }}
            >
              {score}
            </span>
            <span className="text-2xl text-slate-300 dark:text-slate-700 font-light mb-2">
              / {total}
            </span>
            <span
              className={`mb-2 text-lg font-bold ${
                passed
                  ? "text-green-600 dark:text-green-400"
                  : "text-orange-500 dark:text-orange-400"
              }`}
            >
              {pct}%
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                passed ? "bg-blue-600" : "bg-orange-500"
              }`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p
            className={`text-sm font-medium ${
              passed
                ? "text-green-600 dark:text-green-400"
                : "text-orange-500 dark:text-orange-400"
            }`}
          >
            {passed
              ? "Aprovado — bom trabalho!"
              : "Revise os flashcards e tente novamente."}
          </p>
        </div>

        {/* Per-question review */}
        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600 uppercase mb-4">
            Revisão desta sessão
          </p>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
            {session.map((qq, i) => {
              const ok = answers[qq.id]?.correct;
              return (
                <div key={qq.id} className="flex items-start gap-3 py-3 text-sm">
                  <span
                    className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5 ${
                      ok
                        ? "bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400"
                        : "bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400"
                    }`}
                  >
                    {ok ? "✓" : "✗"}
                  </span>
                  <span className="font-mono text-[11px] text-slate-300 dark:text-slate-700 flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-600 dark:text-slate-400 leading-snug line-clamp-1">
                      {qq.question.split("\n")[0]}
                    </span>
                    <span
                      className={`ml-2 text-[10px] font-medium ${
                        qq.difficulty === "muito difícil"
                          ? "text-red-400 dark:text-red-500"
                          : "text-orange-400 dark:text-orange-500"
                      }`}
                    >
                      {qq.difficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Per-category breakdown */}
        <div className="mb-10">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600 uppercase mb-4">
            Por Categoria
          </p>
          <div className="space-y-2.5">
            {catEntries.map(([cat, stats]) => {
              const catPct = stats.total > 0 ? stats.correct / stats.total : 0;
              const allCorrect = catPct === 1;
              const allWrong   = catPct === 0;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700 dark:text-slate-300">{cat}</span>
                    <span className={`text-xs font-mono font-semibold ${allCorrect ? "text-green-600 dark:text-green-400" : allWrong ? "text-red-500 dark:text-red-400" : "text-orange-500 dark:text-orange-400"}`}>
                      {stats.correct}/{stats.total}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${allCorrect ? "bg-green-500" : allWrong ? "bg-red-400" : "bg-orange-400"}`}
                      style={{ width: `${catPct * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={restart}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold tracking-wide rounded-xl transition-colors"
          >
            Nova sessão
          </button>
          <Link
            href="/study"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Revisar flashcards →
          </Link>
        </div>
      </div>
    );
  }

  /* ── Question screen ──────────────────────────────── */
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 sm:py-14 animate-fade-up">

      {/* Progress strip — 10 squares */}
      <div
        className="flex gap-1 mb-8"
        role="progressbar"
        aria-valuenow={idx + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        {session.map((qq, i) => {
          const ans = answers[qq.id];
          return (
            <div
              key={qq.id}
              className={`flex-1 h-1.5 rounded-full transition-all duration-200 ${
                i < idx && ans
                  ? ans.correct
                    ? "bg-green-500 dark:bg-green-600"
                    : "bg-red-400 dark:bg-red-500"
                  : i === idx
                  ? "bg-blue-600"
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
            />
          );
        })}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-1">
            {q.category}
          </p>
          <div className="flex items-baseline gap-3">
            <span
              className="font-mono font-black text-slate-100 dark:text-slate-800 select-none leading-none"
              style={{ fontSize: "3.5rem" }}
              aria-hidden
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="space-y-0.5">
              <p className="text-xs text-slate-400 dark:text-slate-600">
                de {total} questões
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {score} acerto{score !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 border rounded-full flex-shrink-0 mt-1 ${
            q.difficulty === "muito difícil"
              ? "text-red-500 dark:text-red-400 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950"
              : "text-orange-500 dark:text-orange-400 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950"
          }`}
        >
          {q.difficulty}
        </span>
      </div>

      {/* Question + gate + hint toggle */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-1 min-w-0 space-y-4">
          <p className="text-slate-800 dark:text-slate-100 text-base sm:text-lg leading-relaxed font-medium whitespace-pre-line">
            <MathText text={q.question} />
          </p>
          {/* Logic gate diagram — exibido abaixo do enunciado */}
          {q.gate && (
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <LogicGate type={q.gate} />
            </div>
          )}
        </div>
        <button
          onClick={() =>
            setHintVisible((p) => ({ ...p, [q.id]: !p[q.id] }))
          }
          title={hintShown ? "Ocultar dica" : "Mostrar dica de fórmula"}
          aria-pressed={hintShown}
          className={`flex-shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center text-base transition-all hover:scale-105 focus-visible:outline-2 ${
            hintShown
              ? "lamp-active border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-950"
              : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 opacity-40 hover:opacity-70"
          }`}
        >
          💡
        </button>
      </div>

      {/* Truth table */}
      {q.table && <TruthTable table={q.table} />}

      {/* Footnote — glossário do conceito cobrado */}
      {q.footnote && (
        <div className="mb-5 px-3 py-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
            {q.footnote}
          </p>
        </div>
      )}

      {hintShown && (
        <div className="mb-6 border-l-2 border-orange-400 dark:border-orange-600 pl-4 py-1 animate-pop rounded-r-lg bg-orange-50 dark:bg-orange-950">
          <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed whitespace-pre-line">
            <MathText text={q.hint} />
          </p>
        </div>
      )}

      {/* Options */}
      <div className="space-y-2 mb-8" role="list">
        {q.options.map((opt) => (
          <button
            key={opt.id}
            role="listitem"
            onClick={() => choose(opt.id)}
            disabled={!!answered}
            className={optionClass(opt.id)}
          >
            <span className={letterClass(opt.id)}>{opt.id}</span>
            <span className="text-sm leading-relaxed pt-0.5">
              <MathText text={opt.text} />
            </span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div
          className={`border-l-2 pl-4 py-2 mb-8 animate-fade-up rounded-r-lg ${
            answered.correct
              ? "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950"
              : "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-950"
          }`}
        >
          <p
            className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${
              answered.correct
                ? "text-green-600 dark:text-green-500"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {answered.correct ? "Correto" : "Incorreto"}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
            <MathText text={q.explanation} />
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={next}
          disabled={!answered}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold tracking-wide rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {idx < total - 1 ? "Próxima →" : "Ver resultado →"}
        </button>
      </div>
    </div>
  );
}
