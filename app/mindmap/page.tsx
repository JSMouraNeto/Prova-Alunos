"use client";
import { useState } from "react";
import { mindNodes, mindmapCenter, mindLinks, MindNode } from "@/app/lib/data";
import LogicGate, { GateType } from "@/app/components/LogicGate";

function getNode(id: string): MindNode | undefined {
  return mindNodes.find((n) => n.id === id);
}

/* Extrai a primeira fórmula curta (antes do primeiro | ou =  repetido) */
function shortFormula(f: string | undefined): string | undefined {
  if (!f) return undefined;
  const part = f.split("|")[0].trim().split("  ")[0].trim();
  const eqParts = part.split(" = ");
  const candidate = eqParts.length > 2
    ? eqParts[0] + " = " + eqParts[1]
    : part;
  return candidate.length <= 22 ? candidate : undefined;
}

/* Bezier quadrático curvo: control point perpendicular ao midpoint */
function curvedPath(
  from: { cx: number; cy: number },
  to:   { cx: number; cy: number },
  bend = 28
): string {
  const mx = (from.cx + to.cx) / 2;
  const my = (from.cy + to.cy) / 2;
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return "";
  const px = (-dy / len) * bend;
  const py = ( dx / len) * bend;
  return `M ${from.cx} ${from.cy} Q ${mx + px} ${my + py} ${to.cx} ${to.cy}`;
}

/* ── Mini gate card (symbol + truth table) ──────────────────── */
const GATE_ROWS: Record<GateType, string[][]> = {
  AND:  [["0","0","0"],["0","1","0"],["1","0","0"],["1","1","1"]],
  OR:   [["0","0","0"],["0","1","1"],["1","0","1"],["1","1","1"]],
  NOT:  [["0","1"],["1","0"]],
  NAND: [["0","0","1"],["0","1","1"],["1","0","1"],["1","1","0"]],
  NOR:  [["0","0","1"],["0","1","0"],["1","0","0"],["1","1","0"]],
  XOR:  [["0","0","0"],["0","1","1"],["1","0","1"],["1","1","0"]],
};

function GateMiniCard({ type, color }: { type: GateType; color: string }) {
  const rows = GATE_ROWS[type];
  const twoInputs = type !== "NOT";
  return (
    <div
      className="flex flex-col items-center gap-1.5 p-2 rounded-lg"
      style={{ backgroundColor: color + "10", border: `1px solid ${color}30` }}
    >
      <LogicGate type={type} w={72} />
      <table className="w-full text-[9px] font-mono text-center">
        <thead>
          <tr style={{ color }}>
            <th className="pb-0.5">A</th>
            {twoInputs && <th className="pb-0.5">B</th>}
            <th className="pb-0.5">S</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 dark:text-slate-300">
          {rows.map((r, i) => (
            <tr key={i} className={r[r.length - 1] === "1" ? "font-bold" : ""}>
              {r.map((c, j) => <td key={j}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Rich content for specific nodes ───────────────────────── */
function RichNodeExtras({ id, color }: { id: string; color: string }) {
  if (id === "portas") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>
          Símbolos &amp; Tabelas-Verdade
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(["AND","OR","NOT","NAND","NOR","XOR"] as GateType[]).map((g) => (
            <GateMiniCard key={g} type={g} color={color} />
          ))}
        </div>
        <div
          className="rounded-lg px-3 py-2 text-[10px] leading-relaxed text-slate-600 dark:text-slate-300"
          style={{ backgroundColor: color + "10" }}
        >
          <span className="font-bold text-slate-800 dark:text-slate-100">Linhas em negrito</span> = saída 1.{" "}
          <span className="font-bold text-slate-800 dark:text-slate-100">NAND e NOR</span> são{" "}
          <span style={{ color }} className="font-semibold">universais</span>: qualquer circuito
          pode ser montado usando apenas um desses dois tipos.
        </div>
      </div>
    );
  }

  if (id === "flipflop") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>
          Flip-Flop JK — Tabela de Excitação
        </p>
        <div
          className="rounded-lg overflow-hidden border text-xs font-mono"
          style={{ borderColor: color + "38" }}
        >
          <table className="w-full text-center">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2">J</th>
                <th className="py-1.5 px-2">K</th>
                <th className="py-1.5 px-2">Q_próx</th>
                <th className="py-1.5 px-2 text-left">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr><td className="py-1">0</td><td>0</td><td>Q</td><td className="text-left px-2 text-[10px]">Mantém estado atual</td></tr>
              <tr><td className="py-1">0</td><td>1</td><td>0</td><td className="text-left px-2 text-[10px]">Reset (zera)</td></tr>
              <tr><td className="py-1">1</td><td>0</td><td>1</td><td className="text-left px-2 text-[10px]">Set (coloca 1)</td></tr>
              <tr className="font-semibold"><td className="py-1">1</td><td>1</td><td>Q̄</td><td className="text-left px-2 text-[10px]" style={{ color }}>Toggle (inverte!)</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>
          Comparativo — Tipos de Flip-Flop
        </p>
        <div
          className="rounded-lg overflow-hidden border text-[10px]"
          style={{ borderColor: color + "38" }}
        >
          <table className="w-full">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Tipo</th>
                <th className="py-1.5 px-2 text-left">Entradas</th>
                <th className="py-1.5 px-2 text-left">Detalhe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-1 px-2 font-bold font-mono">SR</td>
                <td className="py-1 px-2">S, R</td>
                <td className="py-1 px-2 text-slate-500 dark:text-slate-400">S=1,R=1 proibido</td>
              </tr>
              <tr>
                <td className="py-1 px-2 font-bold font-mono">D</td>
                <td className="py-1 px-2">D</td>
                <td className="py-1 px-2">Q_próx = D (mais simples)</td>
              </tr>
              <tr>
                <td className="py-1 px-2 font-bold font-mono">T</td>
                <td className="py-1 px-2">T</td>
                <td className="py-1 px-2">T=1 → inverte</td>
              </tr>
              <tr>
                <td className="py-1 px-2 font-bold font-mono" style={{ color }}>JK</td>
                <td className="py-1 px-2">J, K</td>
                <td className="py-1 px-2 font-medium">Sem estado proibido</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className="rounded-lg px-3 py-2 text-[10px] leading-relaxed text-slate-600 dark:text-slate-300"
          style={{ backgroundColor: color + "10" }}
        >
          <span className="font-bold text-slate-800 dark:text-slate-100">Como funciona:</span> o FF
          armazena 1 bit (0 ou 1) em Q. Ele só muda de estado na{" "}
          <span style={{ color }} className="font-semibold">borda de subida do clock</span> —
          isso garante que todos os FFs do circuito mudem ao mesmo tempo (sincronismo).
        </div>
      </div>
    );
  }

  /* ── Álgebra Booleana ─────────────────────────────────────── */
  if (id === "booleana") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Leis Fundamentais</p>
        <div className="rounded-lg overflow-hidden border text-[10px]" style={{ borderColor: color + "38" }}>
          <table className="w-full font-mono">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Nome</th>
                <th className="py-1.5 px-2 text-left">Lei</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-[9px]">
              {[
                ["Identidade",   "A+0=A    A·1=A"],
                ["Dominância",   "A+1=1    A·0=0"],
                ["Complemento",  "A+Ā=1   A·Ā=0"],
                ["Idempotência", "A+A=A    A·A=A"],
                ["Absorção",     "A+A·B = A"],
                ["De Morgan 1ª", "¬(A·B) = Ā+B̄"],
                ["De Morgan 2ª", "¬(A+B) = Ā·B̄"],
              ].map(([nome, lei]) => (
                <tr key={nome}>
                  <td className="py-1 px-2">{nome}</td>
                  <td className="py-1 px-2" style={nome.startsWith("De") ? { color } : {}}>{lei}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>De Morgan — Prova pela Tabela</p>
        <div className="rounded-lg overflow-hidden border text-[10px] font-mono" style={{ borderColor: color + "38" }}>
          <table className="w-full text-center">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-1">A</th><th className="py-1.5 px-1">B</th>
                <th className="py-1.5 px-1">¬(A·B)</th><th className="py-1.5 px-1">Ā+B̄</th>
                <th className="py-1.5 px-1">✓?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {[["0","0","1","1"],["0","1","1","1"],["1","0","1","1"],["1","1","0","0"]].map((r,i) => (
                <tr key={i}>
                  <td className="py-0.5">{r[0]}</td><td>{r[1]}</td>
                  <td className="font-bold">{r[2]}</td><td className="font-bold">{r[3]}</td>
                  <td style={{ color }}>✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg px-3 py-2.5 text-[10px] leading-relaxed space-y-1.5" style={{ backgroundColor: color + "10" }}>
          <div className="font-bold text-slate-800 dark:text-slate-100">Como montar F a partir de uma tabela-verdade (SOP):</div>
          <ol className="space-y-0.5 text-slate-600 dark:text-slate-300 list-decimal list-inside">
            <li>Encontre as linhas onde F = 1</li>
            <li>Cada linha vira um AND (variável negada se = 0)</li>
            <li>Una todos com OR — pronto!</li>
          </ol>
          <div className="font-mono text-[9px] text-slate-500 dark:text-slate-400 mt-1">
            Ex: F=1 em (0,1) e (1,0)<br/>
            → <span style={{ color }} className="font-bold">Ā·B + A·B̄</span> = A⊕B (isso é o XOR!)
          </div>
        </div>
      </div>
    );
  }

  /* ── Circuitos Combinacionais ─────────────────────────────── */
  if (id === "combinacional") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Principais Blocos</p>
        <div className="rounded-lg overflow-hidden border text-[10px]" style={{ borderColor: color + "38" }}>
          <table className="w-full">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Bloco</th>
                <th className="py-1.5 px-2 text-left">O que faz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[9px] text-slate-700 dark:text-slate-300">
              {[
                ["MUX N:1",    "Escolhe 1 de N entradas (como controle remoto de TV)"],
                ["DEMUX 1:N",  "Direciona 1 entrada para 1 de N saídas"],
                ["Decoder",    "N bits → ativa apenas 1 de 2ⁿ saídas (endereçamento)"],
                ["Encoder",    "1 de 2ⁿ botões ativos → código binário de N bits"],
                ["Comparador", "Compara A e B: gera sinais A>B, A=B, A<B"],
                ["Half Adder", "Soma 2 bits: gera Soma (S) e Carry (C)"],
                ["Full Adder", "Soma 3 bits (A+B+Cin): encadeável para somar bytes"],
              ].map(([bloco, desc]) => (
                <tr key={bloco}>
                  <td className="py-1 px-2 font-bold font-mono whitespace-nowrap" style={bloco.startsWith("Half") || bloco.startsWith("Full") ? { color } : {}}>{bloco}</td>
                  <td className="py-1 px-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Half Adder — Tabela-Verdade</p>
        <div className="rounded-lg overflow-hidden border text-[10px] font-mono" style={{ borderColor: color + "38" }}>
          <table className="w-full text-center">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2">A</th><th className="py-1.5 px-2">B</th>
                <th className="py-1.5 px-2">S = A⊕B</th><th className="py-1.5 px-2">C = A·B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {[["0","0","0","0"],["0","1","1","0"],["1","0","1","0"],["1","1","0","1"]].map((r,i) => (
                <tr key={i}>
                  <td className="py-1">{r[0]}</td><td>{r[1]}</td>
                  <td className={r[2]==="1"?"font-bold":""} style={r[2]==="1"?{color}:{}}>{r[2]}</td>
                  <td className={r[3]==="1"?"font-bold":""} style={r[3]==="1"?{color}:{}}>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg px-3 py-2 text-[10px] leading-relaxed text-slate-600 dark:text-slate-300" style={{ backgroundColor: color + "10" }}>
          <span className="font-bold text-slate-800 dark:text-slate-100">1+1=10 em binário:</span> S=0 e C=1 — o Carry é o "vai-um" que passamos para o próximo dígito, igual à soma manual que você já conhece.
        </div>
      </div>
    );
  }

  /* ── Sistemas Digitais ────────────────────────────────────── */
  if (id === "digital") {
    const toBin = (n: number) => n.toString(2).padStart(4, "0");
    const hex   = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Tabela de Conversão (0–15)</p>
        <div className="rounded-lg overflow-hidden border text-[10px] font-mono" style={{ borderColor: color + "38" }}>
          <table className="w-full text-center">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-1">Dec</th><th className="py-1.5 px-1">Bin</th><th className="py-1.5 px-1">Hex</th>
                <th className="py-1.5 px-1 border-l border-slate-200 dark:border-slate-700">Dec</th><th className="py-1.5 px-1">Bin</th><th className="py-1.5 px-1">Hex</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
              {[0,1,2,3,4,5,6,7].map((n) => (
                <tr key={n}>
                  <td className="py-0.5 px-1">{n}</td>
                  <td className="py-0.5 px-1">{toBin(n)}</td>
                  <td className="py-0.5 px-1 font-bold">{hex[n]}</td>
                  <td className="py-0.5 px-1 border-l border-slate-200 dark:border-slate-700">{n+8}</td>
                  <td className="py-0.5 px-1">{toBin(n+8)}</td>
                  <td className="py-0.5 px-1 font-bold" style={{ color }}>{hex[n+8]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg px-3 py-2.5 text-[10px] leading-relaxed space-y-1.5" style={{ backgroundColor: color + "10" }}>
          <div className="text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-800 dark:text-slate-100">ADC</span> (Analógico → Digital): captura uma tensão e converte em número binário. Ex: sensor de temperatura → bits para o processador.
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-800 dark:text-slate-100">DAC</span> (Digital → Analógico): faz o inverso. Ex: bits de áudio → tensão elétrica → som no alto-falante.
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-800 dark:text-slate-100">Resolução:</span> mais bits = mais precisão. 8 bits → 256 valores. 16 bits → 65.536 valores.
          </div>
        </div>
      </div>
    );
  }

  /* ── Clock & Pulsos ───────────────────────────────────────── */
  if (id === "clock") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Forma de Onda</p>
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: color + "38", backgroundColor: color + "08" }}>
          <svg viewBox="0 0 260 88" className="w-full h-auto">
            {/* Grid lines */}
            <line x1={8} y1={22} x2={252} y2={22} stroke={color} strokeWidth={0.4} opacity={0.2} />
            <line x1={8} y1={64} x2={252} y2={64} stroke={color} strokeWidth={0.4} opacity={0.2} />
            {/* Signal */}
            <polyline
              points="8,64 28,64 28,22 93,22 93,64 158,64 158,22 223,22 223,64 252,64"
              fill="none" stroke={color} strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round"
            />
            {/* Rising edge markers */}
            <text x={28} y={16} textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">↑</text>
            <text x={158} y={16} textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">↑</text>
            {/* Falling edge markers */}
            <text x={93} y={80} textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">↓</text>
            <text x={223} y={80} textAnchor="middle" fontSize="9" fill={color} fontWeight="bold">↓</text>
            {/* t_HIGH annotation */}
            <line x1={28} y1={29} x2={93} y2={29} stroke={color} strokeWidth={0.7} strokeDasharray="3 2" opacity={0.55} />
            <text x={60} y={27} textAnchor="middle" fontSize="7" fill={color} opacity={0.9}>t_HIGH</text>
            {/* t_LOW annotation */}
            <line x1={93} y1={73} x2={158} y2={73} stroke={color} strokeWidth={0.7} strokeDasharray="3 2" opacity={0.55} />
            <text x={125} y={84} textAnchor="middle" fontSize="7" fill={color} opacity={0.9}>t_LOW</text>
            {/* T period brace */}
            <line x1={28} y1={7} x2={158} y2={7} stroke={color} strokeWidth={0.8} opacity={0.5} />
            <line x1={28} y1={4} x2={28} y2={10} stroke={color} strokeWidth={0.8} opacity={0.5} />
            <line x1={158} y1={4} x2={158} y2={10} stroke={color} strokeWidth={0.8} opacity={0.5} />
            <text x={93} y={6} textAnchor="middle" fontSize="7" fill={color} opacity={0.9} fontWeight="bold">T (período)</text>
            {/* Level labels */}
            <text x={252} y={25} textAnchor="end" fontSize="7" fill={color} opacity={0.7}>HIGH = 1</text>
            <text x={252} y={67} textAnchor="end" fontSize="7" fill={color} opacity={0.7}>LOW = 0</text>
          </svg>
        </div>
        <div className="rounded-lg overflow-hidden border text-[10px] font-mono" style={{ borderColor: color + "38" }}>
          <table className="w-full">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Fórmula</th>
                <th className="py-1.5 px-2 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[9px] text-slate-700 dark:text-slate-300">
              <tr><td className="py-1 px-2">f = 1 / T</td><td className="py-1 px-2">T=1 ms → f=1 kHz</td></tr>
              <tr><td className="py-1 px-2">T = 1 / f</td><td className="py-1 px-2">f=100 Hz → T=10 ms</td></tr>
              <tr><td className="py-1 px-2">DC = t_H/T × 100%</td><td className="py-1 px-2">t_H=3ms,T=10ms → 30%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg px-3 py-2 text-[10px] leading-relaxed text-slate-600 dark:text-slate-300" style={{ backgroundColor: color + "10" }}>
          <span className="font-bold text-slate-800 dark:text-slate-100">Borda de subida ↑</span> = instante em que o clock vai de 0 para 1. É nesse exato momento que flip-flops capturam seus dados — como o clique de uma câmera.
        </div>
      </div>
    );
  }

  /* ── Resistência & Lei de Ohm ─────────────────────────────── */
  if (id === "resistencia") {
    const codeColors = [
      { name: "Preto",    digit: "0", mult: "×1",     bg: "#111827", fg: "#fff" },
      { name: "Marrom",   digit: "1", mult: "×10",    bg: "#92400e", fg: "#fff" },
      { name: "Vermelho", digit: "2", mult: "×100",   bg: "#dc2626", fg: "#fff" },
      { name: "Laranja",  digit: "3", mult: "×1 k",   bg: "#ea580c", fg: "#fff" },
      { name: "Amarelo",  digit: "4", mult: "×10 k",  bg: "#ca8a04", fg: "#000" },
      { name: "Verde",    digit: "5", mult: "×100 k", bg: "#16a34a", fg: "#fff" },
      { name: "Azul",     digit: "6", mult: "×1 M",   bg: "#2563eb", fg: "#fff" },
      { name: "Violeta",  digit: "7", mult: "×10 M",  bg: "#7c3aed", fg: "#fff" },
      { name: "Cinza",    digit: "8", mult: "—",      bg: "#6b7280", fg: "#fff" },
      { name: "Branco",   digit: "9", mult: "—",      bg: "#f1f5f9", fg: "#000" },
    ];
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Código de Cores</p>
        <div className="rounded-lg overflow-hidden border text-[10px]" style={{ borderColor: color + "38" }}>
          <table className="w-full">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Cor</th>
                <th className="py-1.5 px-2 text-center">Dígito</th>
                <th className="py-1.5 px-2 text-center">Mult.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[9px]">
              {codeColors.map((c) => (
                <tr key={c.name} className="text-slate-700 dark:text-slate-300">
                  <td className="py-0.5 px-2">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block w-3.5 h-3.5 rounded-sm flex-shrink-0 border border-black/10" style={{ backgroundColor: c.bg }} />
                      {c.name}
                    </span>
                  </td>
                  <td className="py-0.5 px-2 text-center font-mono font-bold">{c.digit}</td>
                  <td className="py-0.5 px-2 text-center font-mono">{c.mult}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg px-3 py-2.5 text-[10px] leading-relaxed space-y-1" style={{ backgroundColor: color + "10" }}>
          <div className="font-bold text-slate-800 dark:text-slate-100">Leitura de 4 faixas:</div>
          <div className="font-mono text-[9px] text-slate-600 dark:text-slate-300">[1ª][2ª] dígitos × [3ª] mult ± [4ª] tolerância</div>
          <div className="font-mono text-[9px] text-slate-500 dark:text-slate-400">
            Verm-Verm-Laranja-Ouro<br/>
            → 2 2 × 1k ± 5% = <span style={{ color }} className="font-bold">22 kΩ ± 5%</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Estrutura Atômica ────────────────────────────────────── */
  if (id === "atomo") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Elétrons de Valência → Material</p>
        <div className="rounded-lg overflow-hidden border text-[10px]" style={{ borderColor: color + "38" }}>
          <table className="w-full">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-center">Val.</th>
                <th className="py-1.5 px-2 text-left">Tipo</th>
                <th className="py-1.5 px-2 text-left">Exemplos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[9px]">
              <tr>
                <td className="py-1.5 px-2 text-center font-bold font-mono text-yellow-600 dark:text-yellow-400">1–3</td>
                <td className="py-1.5 px-2 font-semibold text-yellow-700 dark:text-yellow-300">Condutor</td>
                <td className="py-1.5 px-2 text-slate-600 dark:text-slate-300">Cu, Ag, Au, Al</td>
              </tr>
              <tr style={{ backgroundColor: color + "10" }}>
                <td className="py-1.5 px-2 text-center font-bold font-mono" style={{ color }}>4</td>
                <td className="py-1.5 px-2 font-semibold" style={{ color }}>Semicondutor</td>
                <td className="py-1.5 px-2 text-slate-600 dark:text-slate-300">Si, Ge (transistores)</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2 text-center font-bold font-mono text-slate-400">5–8</td>
                <td className="py-1.5 px-2 font-semibold text-slate-500 dark:text-slate-400">Isolante</td>
                <td className="py-1.5 px-2 text-slate-600 dark:text-slate-300">Plástico, vidro, borracha</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Camadas Eletrônicas</p>
        <div className="rounded-lg overflow-hidden border text-[10px] font-mono" style={{ borderColor: color + "38" }}>
          <table className="w-full text-center">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-1">Camada</th>
                <th className="py-1.5 px-1">K</th><th className="py-1.5 px-1">L</th>
                <th className="py-1.5 px-1">M</th><th className="py-1.5 px-1">N</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-1.5 px-1 text-left text-[9px]">Máx e⁻</td>
                <td className="py-1.5 px-1 font-bold">2</td>
                <td className="py-1.5 px-1 font-bold">8</td>
                <td className="py-1.5 px-1 font-bold">18</td>
                <td className="py-1.5 px-1 font-bold">32</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg px-3 py-2.5 text-[10px] leading-relaxed space-y-1.5" style={{ backgroundColor: color + "10" }}>
          <div className="text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-800 dark:text-slate-100">Silício (Si):</span> Z=14 → camadas K(2)+L(8)+M(4). Tem <span style={{ color }} className="font-semibold">4 elétrons de valência</span> → semicondutor perfeito para fabricar transistores.
          </div>
          <div className="text-slate-600 dark:text-slate-300">
            <span className="font-bold text-slate-800 dark:text-slate-100">Elétron livre:</span> quando ganha energia suficiente, o elétron "foge" do átomo e fica disponível para conduzir corrente — isso é a eletricidade.
          </div>
        </div>
      </div>
    );
  }

  /* ── Potência Elétrica ────────────────────────────────────── */
  if (id === "potencia") {
    return (
      <div className="space-y-3">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>Qual fórmula usar?</p>
        <div className="rounded-lg overflow-hidden border text-[10px]" style={{ borderColor: color + "38" }}>
          <table className="w-full font-mono">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Sei...</th>
                <th className="py-1.5 px-2 text-left">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[9px] text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-1.5 px-2">V e I</td>
                <td className="py-1.5 px-2 font-bold" style={{ color }}>P = V × I</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2">I e R</td>
                <td className="py-1.5 px-2 font-bold" style={{ color }}>P = I² × R</td>
              </tr>
              <tr>
                <td className="py-1.5 px-2">V e R</td>
                <td className="py-1.5 px-2 font-bold" style={{ color }}>P = V² / R</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg overflow-hidden border text-[10px]" style={{ borderColor: color + "38" }}>
          <table className="w-full">
            <thead style={{ backgroundColor: color + "22", color }}>
              <tr>
                <th className="py-1.5 px-2 text-left">Configuração</th>
                <th className="py-1.5 px-2 text-left">Maior R gera...</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[9px] text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-1 px-2">Série (mesma I)</td>
                <td className="py-1 px-2 font-semibold text-red-600 dark:text-red-400">MAIS calor (P=I²R)</td>
              </tr>
              <tr>
                <td className="py-1 px-2">Paralelo (mesmo V)</td>
                <td className="py-1 px-2 font-semibold text-blue-600 dark:text-blue-400">MENOS calor (P=V²/R)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-lg px-3 py-2 text-[10px] leading-relaxed text-slate-600 dark:text-slate-300" style={{ backgroundColor: color + "10" }}>
          <span className="font-bold text-slate-800 dark:text-slate-100">Efeito Joule:</span> 100% da potência dissipada num resistor vira calor — por isso resistores aquecem quando conduzem corrente.
        </div>
      </div>
    );
  }

  return null;
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
          Clique em um nó para ver conceitos e fórmulas do tópico
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* ── SVG ─────────────────────────────────────────────── */}
        <div className="w-full lg:flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <svg viewBox="0 0 1200 830" className="w-full h-auto" role="img" aria-label="Mapa mental de ICD">

            {/* Cross-links (between leaf nodes) */}
            {mindLinks.map((link, i) => {
              if (link.from === "center" || link.to === "center") return null;
              const a = getNode(link.from);
              const b = getNode(link.to);
              if (!a || !b) return null;
              return (
                <line
                  key={`cross-${i}`}
                  x1={a.cx} y1={a.cy}
                  x2={b.cx} y2={b.cy}
                  stroke={a.color}
                  strokeWidth="1"
                  opacity="0.14"
                  strokeDasharray="4 3"
                />
              );
            })}

            {/* Center-to-node curved paths */}
            {mindLinks.map((link, i) => {
              if (link.from !== "center" && link.to !== "center") return null;
              const nodeId = link.from === "center" ? link.to : link.from;
              const node = getNode(nodeId);
              if (!node) return null;
              const isSelected = selected?.id === node.id;
              return (
                <path
                  key={`radial-${i}`}
                  d={curvedPath(mindmapCenter, node)}
                  stroke={node.color}
                  strokeWidth={isSelected ? 2 : 1.5}
                  fill="none"
                  opacity={isSelected ? 0.5 : 0.22}
                  style={{ transition: "all 0.2s ease" }}
                />
              );
            })}

            {/* Center node */}
            <g
              className="mm-node"
              onClick={() => setSelected(null)}
              role="button"
              aria-label="Centro — desselecionar"
            >
              <circle
                cx={mindmapCenter.cx} cy={mindmapCenter.cy}
                r={72} fill="#2563eb" opacity="0.07"
              />
              <circle
                cx={mindmapCenter.cx} cy={mindmapCenter.cy}
                r={60} fill="#2563eb"
              />
              <text x={mindmapCenter.cx} y={mindmapCenter.cy - 13} textAnchor="middle" fill="#fff"    fontSize="13" fontWeight="700">Eletrônica</text>
              <text x={mindmapCenter.cx} y={mindmapCenter.cy + 5}  textAnchor="middle" fill="#bfdbfe" fontSize="11">&amp; Sistemas</text>
              <text x={mindmapCenter.cx} y={mindmapCenter.cy + 22} textAnchor="middle" fill="#bfdbfe" fontSize="11">Digitais</text>
            </g>

            {/* Leaf nodes */}
            {mindNodes.map((node) => {
              const sel = selected?.id === node.id;
              const lines = node.label.split("\n");
              const fml   = shortFormula(node.formula);
              /* Vertical centering of label + optional formula */
              const lineH = 14;
              const totalH = lines.length * lineH + (fml ? lineH * 0.9 : 0);
              const y0 = node.cy - totalH / 2 + lineH * 0.5;

              return (
                <g
                  key={node.id}
                  className="mm-node"
                  onClick={() => setSelected(sel ? null : node)}
                  role="button"
                  aria-label={node.label.replace("\n", " ")}
                  aria-pressed={sel}
                >
                  {/* Selection halo */}
                  {sel && (
                    <circle
                      cx={node.cx} cy={node.cy}
                      r={node.r + 14}
                      fill={node.color}
                      opacity="0.13"
                      style={{ transition: "all 0.2s ease" }}
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    cx={node.cx} cy={node.cy}
                    r={sel ? node.r + 5 : node.r}
                    fill={node.color}
                    opacity={sel ? 1 : 0.88}
                    stroke={sel ? "#fff" : "none"}
                    strokeWidth={sel ? 2.5 : 0}
                    style={{ transition: "all 0.2s ease" }}
                  />

                  {/* Label text */}
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={node.cx}
                      y={y0 + li * lineH}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={node.textColor}
                      fontSize="11"
                      fontWeight="700"
                    >
                      {line}
                    </text>
                  ))}

                  {/* Short formula below label */}
                  {fml && (
                    <text
                      x={node.cx}
                      y={y0 + lines.length * lineH}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={node.textColor}
                      fontSize="8.5"
                      opacity="0.78"
                      fontFamily="'Geist Mono', 'Courier New', monospace"
                    >
                      {fml}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Info panel ──────────────────────────────────────── */}
        <div className="w-full lg:w-72 flex-shrink-0">
          {selected ? (
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 animate-pop overflow-hidden">

              {/* Color strip */}
              <div className="h-1.5" style={{ backgroundColor: selected.color }} />

              <div className="p-5 space-y-4">
                {/* Title + close */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                    {selected.label.replace("\n", " ")}
                  </h2>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="Fechar painel"
                    className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm"
                  >
                    ×
                  </button>
                </div>

                {/* Formula block */}
                {selected.formula && (
                  <div
                    className="rounded-lg px-3.5 py-3 border"
                    style={{
                      backgroundColor: selected.color + "12",
                      borderColor:     selected.color + "38",
                    }}
                  >
                    <p
                      className="text-[9px] font-black uppercase tracking-widest mb-2"
                      style={{ color: selected.color }}
                    >
                      Fórmula
                    </p>
                    {/* Each pipe-separated clause on its own line */}
                    {selected.formula.split(" | ").map((clause, ci) => (
                      <code
                        key={ci}
                        className="block font-mono text-[13px] leading-relaxed"
                        style={{ color: selected.color }}
                      >
                        {clause.trim()}
                      </code>
                    ))}
                  </div>
                )}

                {/* Rich visual extras for specific nodes */}
                <RichNodeExtras id={selected.id} color={selected.color} />

                {/* Concept bullets */}
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
                <svg
                  className="w-5 h-5 text-slate-400 dark:text-slate-500"
                  viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}
                  aria-hidden
                >
                  <circle cx="10" cy="10" r="2.5" />
                  <path d="M10 5V7.5M10 12.5V15M5 10H7.5M12.5 10H15" strokeLinecap="round" />
                  <circle cx="10" cy="5"  r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="10" cy="15" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="5"  cy="10" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="10" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-600 leading-relaxed">
                Selecione um nó para ver conceitos e fórmulas do tópico
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
