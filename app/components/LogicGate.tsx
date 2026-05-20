export type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

interface Props {
  type: GateType;
}

/* ─────────────────────────────────────────────────────────────────
   viewBox 0 0 140 80  —  todos os gates usam o mesmo canvas
   Centro:  y = 40
   Entrada A: y = 27   Entrada B: y = 53
   Saída S:   y = 40
   Fio de entrada: x = 0 → 28   |   Fio de saída: x = 90 → 140
───────────────────────────────────────────────────────────────── */

const SW = 2;          // strokeWidth
const FC = "currentColor"; // stroke color

function Wires({ twoInputs }: { twoInputs: boolean }) {
  return (
    <>
      {twoInputs ? (
        <>
          <line x1={0} y1={27} x2={28} y2={27} stroke={FC} strokeWidth={SW} />
          <line x1={0} y1={53} x2={28} y2={53} stroke={FC} strokeWidth={SW} />
        </>
      ) : (
        <line x1={0} y1={40} x2={28} y2={40} stroke={FC} strokeWidth={SW} />
      )}
    </>
  );
}

function OutputWire({ x }: { x: number }) {
  return <line x1={x} y1={40} x2={140} y2={40} stroke={FC} strokeWidth={SW} />;
}

function Labels({ twoInputs }: { twoInputs: boolean }) {
  return (
    <>
      {twoInputs ? (
        <>
          <text x={3} y={25} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">A</text>
          <text x={3} y={51} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">B</text>
        </>
      ) : (
        <text x={3} y={38} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">A</text>
      )}
      <text x={131} y={38} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">S</text>
    </>
  );
}

function Bubble({ cx }: { cx: number }) {
  return (
    <circle
      cx={cx} cy={40} r={5}
      className="fill-white dark:fill-slate-900"
      stroke={FC} strokeWidth={SW}
    />
  );
}

function GateSVG({ type }: { type: GateType }) {
  const bodyClass = "fill-white dark:fill-slate-900";

  /* ── AND ────────────────────────────────────────────────────── */
  if (type === "AND") {
    return (
      <svg viewBox="0 0 140 80" width={160} height={91} aria-label="Porta AND">
        <Wires twoInputs />
        <OutputWire x={90} />
        {/* D-shape: retângulo + semicírculo à direita  */}
        {/* Centro do semicírculo: (62, 40), raio 28  */}
        <path
          d="M 28,12 H 62 A 28,28 0 0,1 62,68 H 28 Z"
          className={bodyClass} stroke={FC} strokeWidth={SW}
        />
        <Labels twoInputs />
        <text x="70" y="76" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={FC}>AND</text>
      </svg>
    );
  }

  /* ── NAND ───────────────────────────────────────────────────── */
  if (type === "NAND") {
    return (
      <svg viewBox="0 0 140 80" width={160} height={91} aria-label="Porta NAND">
        <Wires twoInputs />
        <OutputWire x={93} />
        {/* D-shape comprimida + bolha */}
        <path
          d="M 28,14 H 56 A 24,24 0 0,1 56,66 H 28 Z"
          className={bodyClass} stroke={FC} strokeWidth={SW}
        />
        <Bubble cx={86} />
        <Labels twoInputs />
        <text x="70" y="76" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={FC}>NAND</text>
      </svg>
    );
  }

  /* ── OR ─────────────────────────────────────────────────────── */
  if (type === "OR") {
    return (
      <svg viewBox="0 0 140 80" width={160} height={91} aria-label="Porta OR">
        <Wires twoInputs />
        <OutputWire x={92} />
        {/*
          Corpo OR:
          - Topo e base curvam para a ponta direita
          - Lado esquerdo côncavo (curva para dentro)
          M 22,12  → ponto topo-esquerdo
          Q 52,12 92,40  → curva do topo até a ponta da saída
          Q 52,68 22,68  → curva da ponta até o ponto base-esquerdo
          Q 38,40 22,12 Z → arco côncavo do lado esquerdo (fecha)
        */}
        <path
          d="M 22,12 Q 52,12 92,40 Q 52,68 22,68 Q 38,40 22,12 Z"
          className={bodyClass} stroke={FC} strokeWidth={SW}
        />
        <Labels twoInputs />
        <text x="70" y="76" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={FC}>OR</text>
      </svg>
    );
  }

  /* ── NOR ────────────────────────────────────────────────────── */
  if (type === "NOR") {
    return (
      <svg viewBox="0 0 140 80" width={160} height={91} aria-label="Porta NOR">
        <Wires twoInputs />
        <OutputWire x={93} />
        {/* OR comprimida até ~82 + bolha */}
        <path
          d="M 22,14 Q 48,14 82,40 Q 48,66 22,66 Q 36,40 22,14 Z"
          className={bodyClass} stroke={FC} strokeWidth={SW}
        />
        <Bubble cx={87} />
        <Labels twoInputs />
        <text x="70" y="76" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={FC}>NOR</text>
      </svg>
    );
  }

  /* ── NOT ────────────────────────────────────────────────────── */
  if (type === "NOT") {
    return (
      <svg viewBox="0 0 140 80" width={160} height={91} aria-label="Porta NOT">
        <Wires twoInputs={false} />
        <OutputWire x={86} />
        {/* Triângulo apontando para a direita */}
        <polygon
          points="28,14 28,66 78,40"
          className={bodyClass} stroke={FC} strokeWidth={SW} strokeLinejoin="round"
        />
        <Bubble cx={81} />
        <Labels twoInputs={false} />
        <text x="70" y="76" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={FC}>NOT</text>
      </svg>
    );
  }

  /* ── XOR ────────────────────────────────────────────────────── */
  return (
    <svg viewBox="0 0 140 80" width={160} height={91} aria-label="Porta XOR">
      {/* Fios de entrada mais longos para passar o arco extra */}
      <line x1={0} y1={27} x2={30} y2={27} stroke={FC} strokeWidth={SW} />
      <line x1={0} y1={53} x2={30} y2={53} stroke={FC} strokeWidth={SW} />
      <OutputWire x={92} />
      {/* Arco extra côncavo no lado esquerdo (característico do XOR) */}
      <path
        d="M 16,12 Q 32,40 16,68"
        fill="none" stroke={FC} strokeWidth={SW}
      />
      {/* Corpo OR igual ao padrão */}
      <path
        d="M 24,12 Q 54,12 92,40 Q 54,68 24,68 Q 40,40 24,12 Z"
        className={bodyClass} stroke={FC} strokeWidth={SW}
      />
      <text x={3} y={25} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">A</text>
      <text x={3} y={51} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">B</text>
      <text x={131} y={38} fontSize="11" fontFamily="monospace" fill={FC} fontWeight="600">S</text>
      <text x="70" y="76" textAnchor="middle" fontSize="10" fontFamily="monospace" fill={FC}>XOR</text>
    </svg>
  );
}

export default function LogicGate({ type }: Props) {
  return (
    <div
      className="text-slate-600 dark:text-slate-300"
      aria-label={`Símbolo: porta ${type}`}
    >
      <GateSVG type={type} />
    </div>
  );
}
