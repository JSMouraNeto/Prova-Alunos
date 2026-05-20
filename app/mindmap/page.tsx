"use client";
import { useState } from "react";
import { mindNodes, mindmapCenter, mindLinks, MindNode } from "@/app/lib/data";

function getNode(id: string): MindNode | undefined {
  return mindNodes.find((n) => n.id === id);
}

export default function MindmapPage() {
  const [selected, setSelected] = useState<MindNode | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 sm:py-14 animate-fade-up">

      {/* Header */}
      <div className="pb-6 mb-8 border-b border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-500 uppercase mb-1">
          Visualização
        </p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Mapa Mental
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Clique em um nó para ver os conceitos do tópico
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* SVG map */}
        <div className="w-full lg:flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <svg viewBox="0 0 1200 830" className="w-full h-auto">
            {mindLinks.map((link, i) => {
              const fromNode = link.from === "center" ? mindmapCenter : getNode(link.from);
              const toNode   = link.to   === "center" ? mindmapCenter : getNode(link.to);
              if (!fromNode || !toNode) return null;
              const col = link.from !== "center"
                ? (getNode(link.from)?.color ?? "#cbd5e1")
                : (getNode(link.to)?.color   ?? "#cbd5e1");
              return (
                <line
                  key={i}
                  x1={fromNode.cx} y1={fromNode.cy}
                  x2={toNode.cx}   y2={toNode.cy}
                  stroke={col} strokeWidth="1.5" opacity="0.18"
                />
              );
            })}

            {/* Center node */}
            <g className="mm-node" onClick={() => setSelected(null)} role="button" aria-label="Centro — Eletrônica e Sistemas Digitais">
              <circle cx={mindmapCenter.cx} cy={mindmapCenter.cy} r={72} fill="#2563eb" opacity="0.07" />
              <circle cx={mindmapCenter.cx} cy={mindmapCenter.cy} r={62} fill="#2563eb" />
              <text x={mindmapCenter.cx} y={mindmapCenter.cy - 11} textAnchor="middle" fill="#fff"    fontSize="13" fontWeight="700">Eletrônica</text>
              <text x={mindmapCenter.cx} y={mindmapCenter.cy + 6}  textAnchor="middle" fill="#bfdbfe" fontSize="11">&amp; Sistemas</text>
              <text x={mindmapCenter.cx} y={mindmapCenter.cy + 23} textAnchor="middle" fill="#bfdbfe" fontSize="11">Digitais</text>
            </g>

            {mindNodes.map((node) => {
              const sel   = selected?.id === node.id;
              const lines = node.label.split("\n");
              return (
                <g
                  key={node.id}
                  className="mm-node"
                  onClick={() => setSelected(sel ? null : node)}
                  role="button"
                  aria-label={node.label.replace("\n", " ")}
                  aria-pressed={sel}
                >
                  <circle
                    cx={node.cx} cy={node.cy}
                    r={sel ? node.r + 5 : node.r}
                    fill={node.color}
                    opacity={sel ? 1 : 0.82}
                    stroke={sel ? "#fff" : "none"}
                    strokeWidth={sel ? 2.5 : 0}
                    style={{ transition: "all 0.2s ease" }}
                  />
                  {sel && (
                    <circle
                      cx={node.cx} cy={node.cy}
                      r={node.r + 12}
                      fill={node.color}
                      opacity="0.12"
                      style={{ transition: "all 0.2s ease" }}
                    />
                  )}
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={node.cx}
                      y={node.cy - (lines.length - 1) * 7 + li * 15}
                      textAnchor="middle"
                      fill={node.textColor}
                      fontSize="11"
                      fontWeight="600"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-72 flex-shrink-0">
          {selected ? (
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 animate-pop overflow-hidden">
              {/* Colored top strip */}
              <div className="h-1.5" style={{ backgroundColor: selected.color }} />
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                    {selected.label.replace("\n", " ")}
                  </h2>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Fechar painel"
                    className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm leading-none"
                  >
                    ×
                  </button>
                </div>

                {selected.formula && (
                  <code
                    className="block font-mono text-sm px-3.5 py-2 rounded-lg"
                    style={{
                      backgroundColor: selected.color + "18",
                      color: selected.color,
                      border: `1px solid ${selected.color}30`,
                    }}
                  >
                    {selected.formula}
                  </code>
                )}

                <ul className="space-y-2.5">
                  {selected.concepts.map((c, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-snug">
                      <span
                        className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                        style={{ backgroundColor: selected.color }}
                      />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl px-6 py-10 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                  <circle cx="10" cy="10" r="2.5" />
                  <path d="M10 5V7.5M10 12.5V15M5 10H7.5M12.5 10H15" strokeLinecap="round" />
                  <circle cx="10" cy="5" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="10" cy="15" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="5" cy="10" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
                Selecione um nó para ver os conceitos do tópico
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
