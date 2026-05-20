// ─────────────────────────────────────────────────────
//  DATA — ElétroEstuda  |  ICET-UFAM  1º período ES
// ─────────────────────────────────────────────────────

export interface StudyCard {
  id: string;
  category: string;
  color: string;       // tailwind bg class
  textColor: string;
  front: string;
  back: string;
  formula?: string;
  table?: QuizTable;   // shown below the card when flipped
  gate?: QuizGate;     // gate symbol shown below the card when flipped
}

export interface QuizOption { id: string; text: string }

export interface QuizTable {
  headers: string[];
  rows: string[][];
  highlights?: number[];  // row indices with F=1 or otherwise notable
}

export type QuizGate = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: "difícil" | "muito difícil";
  question: string;
  options: QuizOption[];
  correct: string;     // option id
  explanation: string;
  hint: string;        // shown behind 💡
  requiresCalc: boolean;
  table?: QuizTable;
  gate?: QuizGate;
  footnote?: string;   // conceito definido ao final da questão
}

// ═══════════════════════════════════════════
//  FLASHCARDS  (20 cartões)
// ═══════════════════════════════════════════
export const studyCards: StudyCard[] = [
  // ── Átomo ──────────────────────────────
  {
    id: "s01",
    category: "Estrutura do Átomo",
    color: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-800 dark:text-blue-200",
    front: "O que determina se um material é CONDUTOR, ISOLANTE ou SEMICONDUTOR?",
    back: "O número de elétrons de valência (última camada):\n• Condutor: < 4 elétrons (aceita elétrons livres facilmente)\n• Semicondutor: = 4 elétrons (ex: Silício, Germânio)\n• Isolante: > 4 elétrons (não aceita elétrons extras)",
  },
  {
    id: "s02",
    category: "Estrutura do Átomo",
    color: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-800 dark:text-blue-200",
    front: "O que são elétrons livres e qual é sua importância?",
    back: "Elétrons de valência que, ao receberem energia suficiente, abandonam o átomo e ficam livres para se mover pelo material. São os responsáveis pela condução de corrente elétrica nos metais.",
  },
  {
    id: "s03",
    category: "Estrutura do Átomo",
    color: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-800 dark:text-blue-200",
    front: "O que é o estado excitado de um elétron?",
    back: "Quando energia externa (calor, luz, tensão elétrica) é aplicada ao átomo, o elétron absorve essa energia e salta para um nível de energia mais alto. Se a energia for suficiente, o elétron abandona o átomo (elétron livre).",
  },
  // ── Tensão & Corrente ──────────────────
  {
    id: "s04",
    category: "Tensão & Corrente",
    color: "bg-green-100 dark:bg-green-950",
    textColor: "text-green-800 dark:text-green-200",
    front: "O que é Diferença de Potencial (DDP) e qual sua unidade?",
    back: "A DDP (ou tensão) é a capacidade de uma carga elétrica realizar trabalho ao mover outra carga. Surge quando há cargas distintas entre dois pontos.\n\nUnidade: Volt (V)\nSímbolo: V",
    formula: "V = I × R",
  },
  {
    id: "s05",
    category: "Tensão & Corrente",
    color: "bg-green-100 dark:bg-green-950",
    textColor: "text-green-800 dark:text-green-200",
    front: "Como se calcula a intensidade de corrente elétrica? Qual a diferença entre fluxo convencional e fluxo de elétrons?",
    back: "I = Q / T\n(Corrente = Carga / Tempo)\nUnidade: Ampère (A)\n\n• Fluxo de elétrons: de – para + (negativo→positivo)\n• Fluxo convencional: de + para – (positivo→negativo)\n  → Sentido das cargas positivas em movimento.",
    formula: "I = Q/T",
  },
  {
    id: "s06",
    category: "Tensão & Corrente",
    color: "bg-green-100 dark:bg-green-950",
    textColor: "text-green-800 dark:text-green-200",
    front: "Quais são os três tipos básicos de fontes de tensão CC?",
    back: "1. Baterias: reação química (pilhas primárias/secundárias, Ni-HM, íon-lítio) ou energia solar\n2. Geradores: indutância eletromagnética (rotação de bobinas)\n3. Fontes de alimentação: retificação e filtragem da rede CA → CC estável",
  },
  // ── Lei de Ohm & Resistência ───────────
  {
    id: "s07",
    category: "Lei de Ohm",
    color: "bg-orange-100 dark:bg-orange-950",
    textColor: "text-orange-800 dark:text-orange-200",
    front: "Enuncia a Lei de Ohm e apresente as três formas de calcular cada grandeza.",
    back: "A tensão num circuito é igual ao produto da corrente pela resistência.\n\nV = I × R\nI = V / R\nR = V / I\n\nCobra as unidades: V (Volt), I (Ampère), R (Ohm – Ω)",
    formula: "V = I × R",
  },
  {
    id: "s08",
    category: "Lei de Ohm",
    color: "bg-orange-100 dark:bg-orange-950",
    textColor: "text-orange-800 dark:text-orange-200",
    front: "Quais os dois efeitos OBRIGATÓRIOS quando corrente flui por um resistor?",
    back: "1. Produção de calor (efeito Joule) — energia elétrica convertida em calor\n2. Queda de tensão — tensão menor na saída do resistor do que na entrada\n\n⚠ Ambos sempre ocorrem juntos!",
  },
  {
    id: "s09",
    category: "Lei de Ohm",
    color: "bg-orange-100 dark:bg-orange-950",
    textColor: "text-orange-800 dark:text-orange-200",
    front: "Qual é a diferença entre um reostato e um potenciômetro?",
    back: "Ambos são resistores variáveis (possuem 3 terminais).\n\n• Reostato: usa apenas 2 terminais → varia a resistência no circuito\n• Potenciômetro: usa os 3 terminais → controla nível de potência/tensão (divisor de tensão)\n\nEx: botão de volume de rádio = potenciômetro",
  },
  // ── Potência ───────────────────────────
  {
    id: "s10",
    category: "Potência Elétrica",
    color: "bg-yellow-100 dark:bg-yellow-950",
    textColor: "text-yellow-800 dark:text-yellow-200",
    front: "Quais são as três fórmulas para calcular Potência Elétrica? Quando usar cada uma?",
    back: "P = V × I  → quando se conhece V e I\nP = I² × R → quando se conhece I e R\nP = V² / R → quando se conhece V e R\n\nUnidade: Watt (W)\nP = velocidade de conversão de energia (J/s)",
    formula: "P = VI = I²R = V²/R",
  },
  {
    id: "s11",
    category: "Potência Elétrica",
    color: "bg-yellow-100 dark:bg-yellow-950",
    textColor: "text-yellow-800 dark:text-yellow-200",
    front: "Num circuito em série, como se calcula a potência total?",
    back: "PT = P1 + P2 + P3 + … + Pn\n\nOu diretamente:\nPT = I × VT   (mesma corrente em todo circuito série)\n\n⚠ O maior resistor dissipa MAIS potência em série (P = I²R, I igual para todos)",
    formula: "PT = I·VT = I²·RT",
  },
  // ── Circuitos Série ───────────────────
  {
    id: "s12",
    category: "Circuitos em Série",
    color: "bg-purple-100 dark:bg-purple-950",
    textColor: "text-purple-800 dark:text-purple-200",
    front: "Cite as 3 regras fundamentais de um circuito em série.",
    back: "1. Corrente: igual em todos os pontos\n   IT = I1 = I2 = … = In\n2. Tensão: se divide entre os resistores\n   VT = V1 + V2 + … + Vn\n3. Resistência: soma direta\n   RT = R1 + R2 + … + Rn",
    formula: "RT = ΣRn",
  },
  {
    id: "s13",
    category: "Circuitos em Série",
    color: "bg-purple-100 dark:bg-purple-950",
    textColor: "text-purple-800 dark:text-purple-200",
    front: "Como calcular a tensão em um resistor específico de um circuito série? (Divisor de Tensão)",
    back: "Passo a passo:\n1. Calcule RT = R1+R2+…+Rn\n2. Calcule I = VT / RT\n3. Calcule Vn = I × Rn\n\nAtalho (Divisor de Tensão):\nVn = VT × (Rn / RT)",
    formula: "Vn = VT × Rn/RT",
  },
  {
    id: "s14",
    category: "Circuitos em Série",
    color: "bg-purple-100 dark:bg-purple-950",
    textColor: "text-purple-800 dark:text-purple-200",
    front: "Como combinar fontes de tensão em série?",
    back: "• Mesmo sentido (polaridades somadas) → ET = E1 + E2 + E3\n• Sentido oposto → subtrai as fontes opostas\n  Ex: E1=10V, E2=6V(invertida), E3=4V\n  ET = 10 – 6 + 4 = 8V\n\n🔋 Pilhas AA empilhadas num controle remoto é um exemplo real!",
  },
  // ── Circuito Paralelo ─────────────────
  {
    id: "s15",
    category: "Circuito Paralelo",
    color: "bg-red-100 dark:bg-red-950",
    textColor: "text-red-800 dark:text-red-200",
    front: "Cite as 3 regras fundamentais de um circuito em paralelo.",
    back: "1. Tensão: igual em todos os ramos\n   VT = V1 = V2 = … = Vn\n2. Corrente: se divide entre os ramos\n   IT = I1 + I2 + … + In\n3. Resistência: inverso da soma dos inversos\n   1/RT = 1/R1 + 1/R2 + … + 1/Rn",
    formula: "1/RT = Σ(1/Rn)",
  },
  {
    id: "s16",
    category: "Circuito Paralelo",
    color: "bg-red-100 dark:bg-red-950",
    textColor: "text-red-800 dark:text-red-200",
    front: "Qual é a resistência equivalente de N resistores iguais em paralelo?",
    back: "RT = R / N\n\nEx: 3 resistores de 6Ω em paralelo → RT = 6/3 = 2Ω\n\n⚠ Diferente de série! Em série: RT = N×R\nEm paralelo: RT = R/N",
    formula: "RT = R/N (paralelo, iguais)",
  },
  // ── Sistemas Digitais ─────────────────
  {
    id: "s17",
    category: "Sistemas Digitais",
    color: "bg-cyan-100 dark:bg-cyan-950",
    textColor: "text-cyan-800 dark:text-cyan-200",
    front: "Qual a diferença entre grandeza ANALÓGICA e grandeza DIGITAL?",
    back: "• Analógica: valores contínuos — qualquer valor entre mín e máx\n  Ex: temperatura do ar, pressão, som, tensão de microfone\n\n• Digital: valores discretos — apenas valores específicos (0 e 1)\n  Ex: dados num CD, sinais TTL, computador\n\nA natureza é analógica; computadores são digitais.",
  },
  {
    id: "s18",
    category: "Sistemas Digitais",
    color: "bg-cyan-100 dark:bg-cyan-950",
    textColor: "text-cyan-800 dark:text-cyan-200",
    front: "O que são DAC e ADC? Dê um exemplo de aplicação.",
    back: "DAC (Digital→Analógico): converte bits (0/1) em sinal contínuo\nADC (Analógico→Digital): converte sinal contínuo em bits\n\n🎵 Aparelho de CD:\n• Gravar: ADC (som→bits no disco)\n• Reproduzir: DAC (bits→sinal de áudio→alto-falante)",
  },
  {
    id: "s19",
    category: "Sistemas Digitais",
    color: "bg-cyan-100 dark:bg-cyan-950",
    textColor: "text-cyan-800 dark:text-cyan-200",
    front: "O que é um BIT e como sistemas digitais representam informações?",
    back: "Bit = Binary Digit (dígito binário) → pode ser 0 ou 1\n\n• A eletrônica digital usa dois estados: ALTO (tipicamente 5V) e BAIXO (0V)\n• Combinações de bits formam códigos que representam números, letras, símbolos\n• Ex: 8 bits = 1 byte → pode representar 256 combinações distintas",
  },
  {
    id: "s20",
    category: "Circuito Elétrico",
    color: "bg-slate-100 dark:bg-slate-800",
    textColor: "text-slate-800 dark:text-slate-200",
    front: "Quais são as 4 partes básicas de um circuito elétrico? Explique a diferença entre circuito aberto e fechado.",
    back: "4 partes: Fonte (fem/bateria) · Condutores (fios) · Carga (resistor) · Controle (chave)\n\n• Fechado: caminho contínuo — corrente flui\n• Aberto: interrupção — corrente não flui (chave aberta)\n• Curto-circuito: caminho de resistência zero → corrente excessiva → fusível atua!",
  },
  // ── Portas Lógicas ────────────────────────
  {
    id: "s21",
    category: "Portas Lógicas",
    color: "bg-violet-100 dark:bg-violet-950",
    textColor: "text-violet-800 dark:text-violet-200",
    front: "Quais são as três portas lógicas básicas? Descreva a operação de cada uma.",
    back: "AND (·): saída 1 somente se TODAS as entradas = 1\nOR (+): saída 1 se pelo menos UMA entrada = 1\nNOT (~): inverte a entrada (1→0 e 0→1)\n\nMnemônico:\nAND = 'E' → A E B precisam ser 1\nOR  = 'OU' → A OU B pode ser 1\nNOT = 'NÃO' → inverte",
    formula: "AND: A·B | OR: A+B | NOT: ~A",
  },
  {
    id: "s22",
    category: "Portas Lógicas",
    color: "bg-violet-100 dark:bg-violet-950",
    textColor: "text-violet-800 dark:text-violet-200",
    front: "O que são portas NAND e NOR? Por que são chamadas de portas UNIVERSAIS?",
    back: "NAND = NOT AND → saída 0 apenas quando TODAS entradas = 1\nNOR  = NOT OR  → saída 1 apenas quando TODAS entradas = 0\n\nSão UNIVERSAIS: com apenas NAND (ou só NOR) constrói-se qualquer outra porta:\n• NOT via NAND: ligue as duas entradas juntas\n• AND via NAND: NAND + NOT-NAND\n• OR  via NAND: De Morgan inverso\n\nBase real: CIs digitais são fabricados com só NAND ou só NOR.",
    formula: "NAND: ~(A·B) | NOR: ~(A+B)",
    gate: "NAND",
    table: {
      headers: ["A", "B", "NAND", "NOR"],
      rows: [["0","0","1","1"],["0","1","1","0"],["1","0","1","0"],["1","1","0","0"]],
      highlights: [3],
    },
  },
  {
    id: "s23",
    category: "Portas Lógicas",
    color: "bg-violet-100 dark:bg-violet-950",
    textColor: "text-violet-800 dark:text-violet-200",
    front: "Explique XOR e XNOR com a tabela verdade completa. Qual identidade do XOR é mais útil?",
    back: "XOR (⊕) — saída 1 quando entradas são DIFERENTES:\nA⊕0 = A  |  A⊕1 = ~A\nA⊕A = 0  |  A⊕~A = 1\n\nXOR é o núcleo do somador digital: Soma = A⊕B\nXNOR (~⊕) — inverso do XOR: saída 1 quando IGUAIS.",
    formula: "XOR: A⊕B | XNOR: ~(A⊕B) = A⊙B",
    gate: "XOR",
    table: {
      headers: ["A", "B", "XOR (⊕)", "XNOR"],
      rows: [["0","0","0","1"],["0","1","1","0"],["1","0","1","0"],["1","1","0","1"]],
      highlights: [1, 2],
    },
  },
  // ── Álgebra Booleana ──────────────────────
  {
    id: "s24",
    category: "Álgebra Booleana",
    color: "bg-indigo-100 dark:bg-indigo-950",
    textColor: "text-indigo-800 dark:text-indigo-200",
    front: "Liste as identidades fundamentais da Álgebra Booleana.",
    back: "Elemento neutro:  A+0=A    A·1=A\nDominância:       A+1=1    A·0=0\nIdempotência:     A+A=A    A·A=A\nComplemento:      A+~A=1   A·~A=0\nDupla negação:    ~~A=A\n\nLeis de absorção:\nA + A·B = A\nA · (A+B) = A\n\nDistributiva:\nA·(B+C) = A·B + A·C\nA+(B·C) = (A+B)·(A+C)",
  },
  {
    id: "s25",
    category: "Álgebra Booleana",
    color: "bg-indigo-100 dark:bg-indigo-950",
    textColor: "text-indigo-800 dark:text-indigo-200",
    front: "Enuncie o Teorema De Morgan nas duas formas. Como aplicar na prática?",
    back: "1ª Lei: ~(A·B) = ~A + ~B  → NAND = NOR de complementos\n2ª Lei: ~(A+B) = ~A · ~B  → NOR = NAND de complementos\n\nMnemônico: 'Quebre a barra, troque AND↔OR'\n\n3 variáveis:\n~(A·B·C) = ~A + ~B + ~C\n~(A+B+C) = ~A · ~B · ~C\n\nUso: converter expressões com NAND/NOR para simplificar circuitos.",
    formula: "~(A·B)=~A+~B | ~(A+B)=~A·~B",
    table: {
      headers: ["A", "B", "¬(A·B)", "Ā+B̄", "Iguais?"],
      rows: [
        ["0","0","1","1","✓"],
        ["0","1","1","1","✓"],
        ["1","0","1","1","✓"],
        ["1","1","0","0","✓"],
      ],
      highlights: [3],
    },
  },
  {
    id: "s26",
    category: "Álgebra Booleana",
    color: "bg-indigo-100 dark:bg-indigo-950",
    textColor: "text-indigo-800 dark:text-indigo-200",
    front: "Quais os principais teoremas de simplificação? Como usar adjacência e absorção?",
    back: "Adjacência: A·B + A·~B = A\n    → fatore A, use B+~B=1\n\nAbsorção: A + A·B = A\n    → A já 'contém' A·B\n\nConsenso: A·B + ~A·C + B·C = A·B + ~A·C\n    → o termo B·C é redundante\n\nPassos para simplificar:\n1. Fatore variáveis comuns\n2. Aplique A·~A=0 e A+~A=1\n3. Use De Morgan para mover NÃOs\n4. Identifique absorção e adjacência\n\nObjetivo: menos portas = circuito mais barato e rápido.",
    formula: "A·B + A·~B = A | A + A·B = A",
  },
  // ── Clock & Pulsos ────────────────────────
  {
    id: "s27",
    category: "Clock & Pulsos",
    color: "bg-teal-100 dark:bg-teal-950",
    textColor: "text-teal-800 dark:text-teal-200",
    front: "Defina Período, Frequência e Duty Cycle para sinais digitais.",
    back: "Período T: duração de 1 ciclo completo (s, ms, ns)\nFrequência f = 1/T (Hz, kHz, MHz, GHz)\n\nDuty Cycle (DC): fração do tempo em nível HIGH\nDC = t_HIGH / T × 100%\nOnda quadrada simétrica → DC = 50%\n\nBordas: cada ciclo tem 2 bordas (subida + descida)\nBordas/s = 2 × f\n\nConversões:\n1 kHz → T = 1 ms | 1 MHz → T = 1 μs | 1 GHz → T = 1 ns",
    formula: "f = 1/T | DC(%) = t_HIGH / T × 100",
  },
  {
    id: "s28",
    category: "Clock & Pulsos",
    color: "bg-teal-100 dark:bg-teal-950",
    textColor: "text-teal-800 dark:text-teal-200",
    front: "Quais os níveis lógicos válidos para TTL (5 V)? O que é região proibida e margem de ruído?",
    back: "TTL (5 V):\n• LOW válido (entrada): 0 V a 0,8 V\n• HIGH válido (entrada): 2,0 V a 5,0 V\n• Região PROIBIDA: 0,8 V a 2,0 V → comportamento imprevisível\n\nMargem de ruído:\n• LOW:  0,8 V − 0,4 V = 0,4 V  (saída LOW max = 0,4 V)\n• HIGH: 5,0 V − 2,4 V = 0,6 V  (saída HIGH min = 2,4 V)\n\nCMOS (5 V): LOW 0–1,5 V | HIGH 3,5–5 V (margens maiores)",
  },
  // ── Circuitos Combinacionais ──────────────
  {
    id: "s29",
    category: "Circuitos Combinacionais",
    color: "bg-rose-100 dark:bg-rose-950",
    textColor: "text-rose-800 dark:text-rose-200",
    front: "O que é um Multiplexador (MUX)? Como funciona um MUX 4:1?",
    back: "MUX: seleciona 1 de N entradas e conecta à saída\nControlado por bits de SELEÇÃO (S)\n\nMUX 4:1 — 4 entradas (I0-I3), 2 bits de seleção (S1 S0):\nS1S0=00 → I0 | 01 → I1 | 10 → I2 | 11 → I3\n\nFórmula geral:\nY = I0·~S1·~S0 + I1·~S1·S0 + I2·S1·~S0 + I3·S1·S0\n\nAplicações: roteamento de dados, implementação de funções booleanas com MUX.",
    formula: "S1S0(bin) → índice da entrada selecionada",
  },
  {
    id: "s30",
    category: "Circuitos Combinacionais",
    color: "bg-rose-100 dark:bg-rose-950",
    textColor: "text-rose-800 dark:text-rose-200",
    front: "Qual a diferença entre DEMUX e Decodificador?",
    back: "DEMUX (1:N) — roteia 1 entrada para 1 de N saídas:\n• Entrada D vai APENAS para a saída selecionada\n• Demais saídas = 0\n• Inverso do MUX\n\nDecodificador (n : 2ⁿ) — converte código binário em 1-de-N:\n• Para cada entrada binária: exatamente 1 saída ativa\n• Ex: 3:8 → 3 bits de entrada → 8 saídas possíveis\n• Saídas podem ser ativo-alto ou ativo-baixo\n\nAplicações: endereçamento de memória, display 7 segmentos, chip select.",
    formula: "Decoder n:2ⁿ — exatamente 1 saída ativa por vez",
  },
  {
    id: "s31",
    category: "Circuitos Combinacionais",
    color: "bg-rose-100 dark:bg-rose-950",
    textColor: "text-rose-800 dark:text-rose-200",
    front: "Como funciona um Comparador de magnitude? Quais suas saídas?",
    back: "Comparador: compara dois números A e B e indica a relação entre eles.\n\n3 saídas (sempre exatamente UMA em HIGH):\n• A > B\n• A = B\n• A < B\n\nComparador de 1 bit:\nA=B → XNOR(A,B) | A>B → A·~B | A<B → ~A·B\n\nComparador 4 bits (74HC85): analisa bit a bit do mais significativo.\nPode ser cascateado para comparar palavras maiores.",
    formula: "A>B: A·~B | A=B: XNOR | A<B: ~A·B",
  },
  {
    id: "s32",
    category: "Circuitos Combinacionais",
    color: "bg-rose-100 dark:bg-rose-950",
    textColor: "text-rose-800 dark:text-rose-200",
    front: "Explique Half Adder e Full Adder. Qual é a limitação do Half Adder?",
    back: "HALF ADDER — soma 2 bits:\n• Entradas: A, B\n• Soma S = A XOR B\n• Carry C = A AND B\n• LIMITAÇÃO: não trata Carry_in (não serve para bit intermediário)\n\nFULL ADDER — soma 2 bits + carry de entrada:\n• Entradas: A, B, Cin\n• S = A ⊕ B ⊕ Cin\n• Cout = A·B + Cin·(A⊕B)\n\nRipple Carry Adder de 4 bits:\n1 Half Adder (LSB) + 3 Full Adders em cascata.",
    formula: "S = A⊕B⊕Cin | Cout = A·B + Cin·(A⊕B)",
  },
  {
    id: "s33",
    category: "Álgebra Booleana",
    color: "bg-indigo-100 dark:bg-indigo-950",
    textColor: "text-indigo-800 dark:text-indigo-200",
    front: "O que são Mintermos e Maxtermos? Como extraí-los da tabela-verdade?",
    back: "MINTERMOS (Σ — Soma de produtos):\n• Linha onde F = 1\n• Var=1 → normal | Var=0 → complementada\n• Une com AND; soma todos com OR\n• Ex: (A=0,B=1,C=1) → Ā·B·C\n\nMAXTERMOS (Π — Produto de somas):\n• Linha onde F = 0\n• Var=0 → normal | Var=1 → complementada\n• Une com OR; multiplica todos com AND\n• Ex: (A=1,B=0,C=1) → Ā+B+C̄\n\nRegra inversa! Mintermos e Maxtermos são duais.",
    formula: "F = Σmintermos = Πmaxtermos",
  },
  {
    id: "s34",
    category: "Clock & Pulsos",
    color: "bg-teal-100 dark:bg-teal-950",
    textColor: "text-teal-800 dark:text-teal-200",
    front: "Como calcular frequência a partir de um gráfico temporal? E o que é Duty Cycle?",
    back: "Frequência: f = 1/T\nPeríodo T = (nº de quadrados por ciclo) × (tempo por quadrado)\n\nEx: 4 quadrados × 2 ms = 8 ms → f = 1/0,008 = 125 Hz\n\nDuty Cycle (DC):\nDC = t_HIGH / T × 100%\nOnda simétrica (quadrada) → DC = 50%\n\nBordas por segundo = 2 × f\n\nConversões rápidas:\n1 kHz → T = 1 ms\n1 MHz → T = 1 μs\n1 GHz → T = 1 ns",
    formula: "f = 1/T | DC(%) = t_HIGH / T × 100",
  },
  {
    id: "s35",
    category: "Clock & Pulsos",
    color: "bg-teal-100 dark:bg-teal-950",
    textColor: "text-teal-800 dark:text-teal-200",
    front: "O que é um Flip-Flop JK? Como interpretar os sinais J e K em um diagrama temporal?",
    back: "FF JK: elemento de memória de 1 bit com 4 modos.\nEntradas: J (Set), K (Reset), CK (Clock)\n\nLeitura temporal: na cada borda de subida ↑ do clock, leia J e K.\nEx: 3 bordas com J=1,0,1 e K=0,0,1\n→ J=101₂, K=001₂ → converta para decimal\n\nDiferença do FF D: JK tem modo Toggle (J=K=1).",
    formula: "J=1,K=0→Set | J=0,K=1→Reset | J=K=1→Toggle",
    table: {
      headers: ["J", "K", "Q_próx", "Ação"],
      rows: [
        ["0","0","Q","Mantém"],
        ["0","1","0","Reset"],
        ["1","0","1","Set"],
        ["1","1","Q̄","Toggle ⚡"],
      ],
      highlights: [3],
    },
  },
];

// ═══════════════════════════════════════════
//  QUIZ — 40 questões de alta dificuldade
// ═══════════════════════════════════════════
export const quizQuestions: QuizQuestion[] = [
  // ── BLOCO 1: Circuito Série — Tensão e Req ────────────────────────────────
  {
    id: "q01",
    category: "Circuitos em Série",
    difficulty: "muito difícil",
    question:
      "Um circuito tem R₁ = 3 kΩ e R₂ = 5 kΩ ligados em série. A corrente que circula é de 4 mA. Qual é a tensão da fonte?",
    options: [
      { id: "a", text: "V = 12 V" },
      { id: "b", text: "V = 32 V" },
      { id: "c", text: "V = 20 V" },
      { id: "d", text: "V = 8 V" },
    ],
    correct: "b",
    explanation:
      "Req = R₁ + R₂ = 3 + 5 = 8 kΩ = 8.000 Ω. V = I × Req = 0,004 A × 8.000 Ω = 32 V. Erro comum: usar apenas R₁ ou não converter kΩ → Ω e mA → A.",
    hint: "Bizu: Em série Req = R₁ + R₂.\nV = I × Req.\nConverta SEMPRE: 4 mA = 0,004 A; 8 kΩ = 8.000 Ω.",
    requiresCalc: true,
  },
  {
    id: "q02",
    category: "Circuitos em Série",
    difficulty: "muito difícil",
    question:
      "Para o circuito da questão anterior (R₁ = 3 kΩ, R₂ = 5 kΩ, I = 4 mA, V_fonte = 32 V), quais são a resistência equivalente e a queda de tensão em R₂?",
    options: [
      { id: "a", text: "Req = 1,875 kΩ  e  V_R₂ = 32 V" },
      { id: "b", text: "Req = 8 kΩ  e  V_R₂ = 12 V" },
      { id: "c", text: "Req = 8 kΩ  e  V_R₂ = 20 V" },
      { id: "d", text: "Req = 5 kΩ  e  V_R₂ = 20 V" },
    ],
    correct: "c",
    explanation:
      "Req = 3 + 5 = 8 kΩ. V_R₂ = I × R₂ = 0,004 × 5.000 = 20 V. Verificação pelo divisor: V_R₂ = 32 × (5/8) = 20 V ✓. V_R₁ = 12 V → 12+20 = 32 V = V_fonte ✓.",
    hint: "Bizu: V_Rn = I × Rn.\nOu divisor: V_Rn = Vtotal × (Rn/Req).\nConfira: soma das quedas = V_fonte.",
    requiresCalc: true,
  },
  {
    id: "q03",
    category: "Circuitos em Série",
    difficulty: "muito difícil",
    question:
      "R₁ = 2 kΩ, R₂ = 2 kΩ em série com corrente de 5 mA. Qual é a tensão da fonte e a queda em cada resistor?",
    options: [
      { id: "a", text: "V = 10 V  e  V_R₁ = V_R₂ = 5 V" },
      { id: "b", text: "V = 20 V  e  V_R₁ = V_R₂ = 5 V" },
      { id: "c", text: "V = 20 V  e  V_R₁ = V_R₂ = 10 V" },
      { id: "d", text: "V = 4 V   e  V_R₁ = V_R₂ = 2 V" },
    ],
    correct: "c",
    explanation:
      "Req = 4 kΩ = 4.000 Ω. V = 0,005 × 4.000 = 20 V. Resistores iguais → queda igual: V_Rn = 0,005 × 2.000 = 10 V. Soma: 10+10 = 20 V ✓.",
    hint: "Bizu: Resistores iguais em série dividem tensão igualmente.\nV_Rn = I × Rn.\n5 mA = 0,005 A; 2 kΩ = 2.000 Ω.",
    requiresCalc: true,
  },
  {
    id: "q04",
    category: "Circuitos em Série",
    difficulty: "muito difícil",
    question:
      "Três resistores em série: R₁ = 1 kΩ, R₂ = 3 kΩ, R₃ = 2 kΩ, fonte V = 18 V. Calcule a corrente e a queda de tensão em R₂.",
    options: [
      { id: "a", text: "I = 3 mA  e  V_R₂ = 9 V" },
      { id: "b", text: "I = 3 mA  e  V_R₂ = 3 V" },
      { id: "c", text: "I = 18 mA  e  V_R₂ = 54 V" },
      { id: "d", text: "I = 3 A   e  V_R₂ = 9 V" },
    ],
    correct: "a",
    explanation:
      "Req = 1+3+2 = 6 kΩ = 6.000 Ω. I = 18/6.000 = 0,003 A = 3 mA. V_R₂ = 0,003 × 3.000 = 9 V. Verifique: V₁=3V, V₂=9V, V₃=6V → soma = 18 V ✓.",
    hint: "Bizu: Req = ΣRn.\nI = V_fonte / Req.\nV_Rn = I × Rn.\nVerifique: ΣV_Rn = V_fonte.",
    requiresCalc: true,
  },

  // ── BLOCO 2: Analógico vs Digital ─────────────────────────────────────────
  {
    id: "q05",
    category: "Sistemas Digitais",
    difficulty: "difícil",
    question:
      "A temperatura do ar varia de forma contínua ao longo do dia. Um gráfico registra essa variação hora a hora. Sobre esse sinal, assinale a afirmação CORRETA:",
    options: [
      { id: "a", text: "A temperatura é digital pois pode ser exibida num display numérico" },
      { id: "b", text: "Entre dois instantes medidos podem existir máximos ou mínimos locais não capturados pelo registro horário" },
      { id: "c", text: "A temperatura só assume valores inteiros, pois é medida em graus inteiros" },
      { id: "d", text: "O gráfico de uma grandeza analógica é sempre uma linha reta" },
    ],
    correct: "b",
    explanation:
      "Sinal analógico = contínuo. Entre dois instantes quaisquer há infinitos valores intermediários. Uma medição a cada hora pode perder picos e vales ocorridos entre as amostras. Um display mostra uma representação discreta — a grandeza em si permanece analógica.",
    hint: "Bizu: Analógico = contínuo. Amostras horárias podem perder variações rápidas. Temperatura, pressão, som = analógicos por natureza.",
    requiresCalc: false,
  },
  {
    id: "q06",
    category: "Sistemas Digitais",
    difficulty: "difícil",
    question:
      "Analise as afirmações:\nI. O microfone converte pressão sonora (analógica) em sinal elétrico analógico.\nII. Um arquivo MP3 armazena o som em formato digital (bits).\nIII. Na reprodução, o DAC converte os bits em sinal analógico para o amplificador.\nQuantas estão corretas?",
    options: [
      { id: "a", text: "Apenas I" },
      { id: "b", text: "Apenas I e II" },
      { id: "c", text: "Todas as três: I, II e III" },
      { id: "d", text: "Apenas II e III" },
    ],
    correct: "c",
    explanation:
      "I ✓ — Microfone converte pressão sonora (analógica) em tensão analógica. II ✓ — MP3/WAV são formatos digitais. III ✓ — DAC converte bits → sinal analógico → amplificador → alto-falante. Fluxo: Microfone→ADC→bits→DAC→amplificador→alto-falante.",
    hint: "Bizu: ADC = Analog→Digital (gravação). DAC = Digital→Analog (reprodução). O som físico é sempre analógico.",
    requiresCalc: false,
  },

  // ── BLOCO 3: Álgebra Booleana — Sequência e Expressões ───────────────────
  {
    id: "q07",
    category: "Álgebra Booleana",
    difficulty: "difícil",
    question:
      "Para projetar um circuito combinacional, qual é a sequência CORRETA das etapas?",
    options: [
      { id: "a", text: "Implementar o circuito → Tabela-verdade → Expressão booleana" },
      { id: "b", text: "Expressão booleana → Analisar a situação → Implementar o circuito" },
      { id: "c", text: "Analisar a situação → Tabela-verdade → Expressão booleana → Implementar o circuito" },
      { id: "d", text: "Analisar a situação → Implementar o circuito diretamente" },
    ],
    correct: "c",
    explanation:
      "Sequência correta: (1) Analisar (identificar entradas/saídas); (2) Tabela-verdade (todos os 2ⁿ casos); (3) Expressão booleana (SOP ou POS); (4) Implementar com portas. A tabela-verdade precede a expressão — sem ela há risco de omitir combinações.",
    hint: "Bizu: Situação → Tabela-verdade → Expressão → Circuito. A tabela garante todos os casos.",
    requiresCalc: false,
  },
  {
    id: "q08",
    category: "Álgebra Booleana",
    difficulty: "muito difícil",
    question:
      "Avalie a expressão F = (C · B̄) + (B · A · C̄) para A=1, B=1, C=0.",
    options: [
      { id: "a", text: "F = 0  (B̄ = 1 com B=1, logo C·B̄ = 1)" },
      { id: "b", text: "F = 0  (C̄ = 0 com C=0, logo segundo termo = 0)" },
      { id: "c", text: "F = 1" },
      { id: "d", text: "F = indeterminado  (variável repetida A e C)" },
    ],
    correct: "c",
    explanation:
      "B=1 → B̄=0. C=0 → C̄=1. Primeiro termo: C·B̄ = 0·0 = 0. Segundo termo: B·A·C̄ = 1·1·1 = 1. F = 0 OR 1 = 1. Atenção: B=1 → B̄=0 (não 1). C=0 → C̄=1 (não 0). Calcule os complementos antes de substituir.",
    hint: "Bizu: B=1→B̄=0. C=0→C̄=1. Substitua passo a passo: cada produto (AND), depois OR final.",
    requiresCalc: false,
  },
  {
    id: "q09",
    category: "Álgebra Booleana",
    difficulty: "muito difícil",
    question:
      "Simplifique: F = (A · B̄) + (A · B · C̄). Qual é a forma mínima?",
    options: [
      { id: "a", text: "F = A · B̄" },
      { id: "b", text: "F = A · (B̄ + C̄)" },
      { id: "c", text: "F = A + B̄" },
      { id: "d", text: "F = A · B · C̄" },
    ],
    correct: "b",
    explanation:
      "Fatore A: F = A·(B̄ + B·C̄). Simplifique B̄ + B·C̄ usando distributiva do OR: (B̄+B)·(B̄+C̄) = 1·(B̄+C̄) = B̄+C̄. Logo F = A·(B̄+C̄). Opção a é mais restritiva que o correto.",
    hint: "Bizu: Fatore A. Depois: B̄ + B·C̄ = (B̄+B)·(B̄+C̄) = B̄+C̄. Distributiva do OR.",
    requiresCalc: false,
  },

  // ── BLOCO 4: Mintermos e Maxtermos ────────────────────────────────────────
  {
    id: "q10",
    category: "Álgebra Booleana",
    difficulty: "muito difícil",
    question:
      "Dada a tabela-verdade abaixo, qual é a expressão F em soma de mintermos (SOP)?",
    table: {
      headers: ["Linha", "A", "B", "C", "F"],
      rows: [
        ["0", "0", "0", "0", "0"],
        ["1", "0", "0", "1", "1"],
        ["2", "0", "1", "0", "0"],
        ["3", "0", "1", "1", "1"],
        ["4", "1", "0", "0", "1"],
        ["5", "1", "0", "1", "0"],
        ["6", "1", "1", "0", "0"],
        ["7", "1", "1", "1", "0"],
      ],
      highlights: [1, 3, 4],
    },
    options: [
      { id: "a", text: "F = Ā·B̄·C + Ā·B·C + A·B̄·C̄" },
      { id: "b", text: "F = A·B·C + A·B̄·C + Ā·B·C̄" },
      { id: "c", text: "F = Ā·B̄·C̄ + Ā·B̄·C + A·B̄·C̄" },
      { id: "d", text: "F = A·B̄·C + Ā·B·C̄ + A·B·C" },
    ],
    correct: "a",
    explanation:
      "Linhas com F=1: linha1(0,0,1), linha3(0,1,1), linha4(1,0,0). Regra: var=1→normal, var=0→complementada, liga com AND. Linha1: Ā·B̄·C. Linha3: Ā·B·C. Linha4: A·B̄·C̄. F = Ā·B̄·C + Ā·B·C + A·B̄·C̄.",
    hint: "Bizu: Minterm = linha F=1. Var=1→normal, var=0→complementada. Liga com AND. Some todos com OR.",
    requiresCalc: false,
  },
  {
    id: "q11",
    category: "Álgebra Booleana",
    difficulty: "muito difícil",
    question:
      "Usando a mesma tabela-verdade, qual é a expressão F em produto de maxtermos (POS)?",
    table: {
      headers: ["Linha", "A", "B", "C", "F"],
      rows: [
        ["0", "0", "0", "0", "0"],
        ["1", "0", "0", "1", "1"],
        ["2", "0", "1", "0", "0"],
        ["3", "0", "1", "1", "1"],
        ["4", "1", "0", "0", "1"],
        ["5", "1", "0", "1", "0"],
        ["6", "1", "1", "0", "0"],
        ["7", "1", "1", "1", "0"],
      ],
      highlights: [0, 2, 5, 6, 7],
    },
    options: [
      { id: "a", text: "F = Ā·B̄·C + Ā·B·C + A·B̄·C̄" },
      { id: "b", text: "F = (A+B+C)·(A+B̄+C)·(Ā+B+C̄)·(Ā+B̄+C)·(Ā+B̄+C̄)" },
      { id: "c", text: "F = (Ā+B̄+C̄)·(Ā+B+C̄)·(A+B̄+C)" },
      { id: "d", text: "F = (A+B+C)·(A+B+C̄)" },
    ],
    correct: "b",
    explanation:
      "Linhas com F=0: 0(0,0,0), 2(0,1,0), 5(1,0,1), 6(1,1,0), 7(1,1,1). Regra de maxterm: var=0→normal, var=1→complementada, liga com OR. m0: A+B+C. m2: A+B̄+C. m5: Ā+B+C̄. m6: Ā+B̄+C. m7: Ā+B̄+C̄. F = produto de todos os 5 maxtermos.",
    hint: "Bizu: Maxterm = linha F=0. Regra INVERSA: var=0→normal, var=1→complementada. Liga com OR. Multiplica tudo com AND.",
    requiresCalc: false,
  },
  {
    id: "q12",
    category: "Álgebra Booleana",
    difficulty: "muito difícil",
    question:
      "A tabela abaixo mostra uma função F(A, B). Qual expressão booleana e porta lógica representam F?",
    table: {
      headers: ["A", "B", "F"],
      rows: [
        ["0", "0", "0"],
        ["0", "1", "1"],
        ["1", "0", "1"],
        ["1", "1", "0"],
      ],
      highlights: [1, 2],
    },
    gate: "XOR",
    options: [
      { id: "a", text: "F = A·B  →  AND" },
      { id: "b", text: "F = A+B  →  OR" },
      { id: "c", text: "F = Ā·B + A·B̄  →  XOR" },
      { id: "d", text: "F = Ā·B̄ + A·B  →  XNOR" },
    ],
    correct: "c",
    explanation:
      "Mintermos: (0,1)→Ā·B e (1,0)→A·B̄. F = Ā·B + A·B̄ = A⊕B (XOR). Confirmação: (0,0)→0; (0,1)→1; (1,0)→1; (1,1)→0. XOR=1 quando entradas DIFERENTES. É o bit de Soma do Half Adder.",
    hint: "Bizu: Dois mintermos com entradas diferentes = XOR. F = Ā·B + A·B̄ = A⊕B.",
    requiresCalc: false,
  },

  // ── BLOCO 5: Clock e Frequência ───────────────────────────────────────────
  {
    id: "q13",
    category: "Clock & Pulsos",
    difficulty: "muito difícil",
    question:
      "Um gráfico de clock mostra que cada divisão do eixo do tempo equivale a 2 ms. O sinal completa um ciclo em 5 divisões. Qual é a frequência?",
    options: [
      { id: "a", text: "f = 500 Hz" },
      { id: "b", text: "f = 100 Hz" },
      { id: "c", text: "f = 10 Hz" },
      { id: "d", text: "f = 250 Hz" },
    ],
    correct: "b",
    explanation:
      "T = 5 divisões × 2 ms = 10 ms = 0,010 s. f = 1/T = 1/0,010 = 100 Hz. Erro comum: usar só 1 divisão (T=2ms → f=500Hz) ou esquecer de converter ms→s.",
    hint: "Bizu: T = divisões × tempo/divisão. f = 1/T (em segundos). 10 ms = 0,010 s → f = 100 Hz.",
    requiresCalc: true,
  },
  {
    id: "q14",
    category: "Clock & Pulsos",
    difficulty: "muito difícil",
    question:
      "Um clock tem período T = 4 ms (4 quadrados de 1 ms cada). Qual é a frequência e quantas bordas de subida ocorrem por segundo?",
    options: [
      { id: "a", text: "f = 250 Hz  e  250 bordas de subida/s" },
      { id: "b", text: "f = 250 Hz  e  500 bordas de subida/s" },
      { id: "c", text: "f = 4 Hz    e  8 bordas/s" },
      { id: "d", text: "f = 1.000 Hz  e  2.000 bordas/s" },
    ],
    correct: "a",
    explanation:
      "T = 4 ms = 0,004 s → f = 1/0,004 = 250 Hz. Em cada ciclo há 1 borda de subida (LOW→HIGH). Bordas de subida/s = f = 250. Bordas totais = 2f = 500 (subida + descida).",
    hint: "Bizu: f = 1/T(em s). 4ms = 0,004s → 250Hz. Bordas de SUBIDA por segundo = f (1 por ciclo).",
    requiresCalc: true,
  },

  // ── BLOCO 6: Flip-Flop JK ─────────────────────────────────────────────────
  {
    id: "q15",
    category: "Clock & Pulsos",
    difficulty: "muito difícil",
    question:
      "Num diagrama temporal de flip-flop JK, os sinais são lidos em 3 bordas de subida do clock (azul). Momento 1: J=1,K=0. Momento 2: J=0,K=0. Momento 3: J=1,K=1. Quais os valores binários de J e K?",
    options: [
      { id: "a", text: "J = 110  e  K = 001" },
      { id: "b", text: "J = 101  e  K = 001" },
      { id: "c", text: "J = 010  e  K = 110" },
      { id: "d", text: "J = 100  e  K = 011" },
    ],
    correct: "b",
    explanation:
      "Leitura nos momentos 1,2,3 — J: 1,0,1 → J=101. K: 0,0,1 → K=001. Concatene da esquerda para a direita: momento 1 é o bit mais significativo.",
    hint: "Bizu: Leia J e K a cada borda de subida do CK. Concatene: J=bit1 bit2 bit3.",
    requiresCalc: false,
    footnote: "* Flip-Flop JK: biestável com entradas J e K lidas na borda de subida (↑) do clock. Leia o valor de J e K em cada pulso e concatene os bits para formar a palavra binária.",
  },
  {
    id: "q16",
    category: "Clock & Pulsos",
    difficulty: "muito difícil",
    question:
      "No mesmo diagrama, um segundo canal (verde) registra as mesmas bordas. Momento 1: J=1,K=0. Momento 2: J=0,K=0. Momento 3: J=1,K=0. Quais os valores binários?",
    options: [
      { id: "a", text: "J = 101  e  K = 001" },
      { id: "b", text: "J = 101  e  K = 000" },
      { id: "c", text: "J = 010  e  K = 101" },
      { id: "d", text: "J = 000  e  K = 111" },
    ],
    correct: "b",
    explanation:
      "Leitura nos momentos 1,2,3 — J: 1,0,1 → J=101. K: 0,0,0 → K=000. Note que no canal verde o momento 3 tem K=0 (diferente do canal azul onde K=1 no momento 3).",
    hint: "Bizu: Leia cada sinal separadamente. J=bit1 bit2 bit3. K=bit1 bit2 bit3. Cada canal pode ter valores diferentes.",
    requiresCalc: false,
    footnote: "* Flip-Flop JK: biestável com entradas J e K lidas na borda de subida (↑) do clock. Cada canal (cor) é um sinal independente. Leia J e K nos mesmos instantes.",
  },

  // ── BLOCO 7: Meio Somador e Somadores ─────────────────────────────────────
  {
    id: "q17",
    category: "Circuitos Combinacionais",
    difficulty: "difícil",
    question:
      "Um circuito tem 2 entradas (A, B) e 2 saídas: S = A ⊕ B e C = A · B. Que circuito é esse e qual sua principal limitação?",
    gate: "XOR",
    options: [
      { id: "a", text: "Full Adder — não suporta operações de subtração" },
      { id: "b", text: "Comparador — não distingue magnitude entre A e B" },
      { id: "c", text: "Decodificador 2:4 — saídas limitadas a 4 linhas" },
      { id: "d", text: "Half Adder — não possui entrada de Carry (Cin)" },
    ],
    correct: "d",
    explanation:
      "Half Adder (Meio Somador): S = A⊕B, C = A·B. Para A=B=1: S=0, C=1 (1+1=10₂). Limitação: sem Carry_in, não pode ser estágio intermediário em somadores de múltiplos bits — para isso usa-se o Full Adder (3 entradas: A, B, Cin).",
    hint: "Bizu: Half Adder = 2 entradas, 2 saídas (S=XOR, C=AND). Sem Cin. Full Adder = 3 entradas.",
    requiresCalc: false,
    footnote: "* Half Adder (Meio Somador): circuito que soma 2 bits (A, B). Saídas: S = A⊕B (Soma) e C = A·B (Carry-out). Não possui Carry-in — não pode ser usado como estágio intermediário de um somador multi-bit.\n* Full Adder: versão com 3 entradas (A, B, Cin), permitindo encadear bits.",
  },
  {
    id: "q18",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "Um Full Adder recebe A=1, B=0, Carry_in=1. Calcule a Soma S e o Carry_out.",
    options: [
      { id: "a", text: "S=0, Cout=1" },
      { id: "b", text: "S=0, Cout=0" },
      { id: "c", text: "S=1, Cout=1" },
      { id: "d", text: "S=1, Cout=0" },
    ],
    correct: "a",
    explanation:
      "S = A⊕B⊕Cin = 1⊕0⊕1 = 1⊕1 = 0. Cout = A·B + Cin·(A⊕B) = 1·0 + 1·1 = 1. Resultado: 10₂ = 2₁₀. Correto: 1+0+1 = 2 ✓.",
    hint: "Bizu: S = A⊕B⊕Cin.\nCout = A·B + Cin·(A⊕B).\nPara 1+0+1 = 2 = 10₂: S=0, Cout=1.",
    requiresCalc: true,
    footnote: "* Full Adder (Somador Completo): soma 3 bits — A, B e Carry-in. Saídas: S = A⊕B⊕Cin e Cout = A·B + Cin·(A⊕B). O Cout de um estágio vira Cin do próximo, permitindo somar números de N bits.",
  },

  // ── BLOCO 8: MUX ─────────────────────────────────────────────────────────
  {
    id: "q19",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "Um sistema de comunicação serial usa um MUX para transmitir 6 fontes de dados. Qual o número MÍNIMO de variáveis de seleção necessárias?",
    options: [
      { id: "a", text: "6 variáveis" },
      { id: "b", text: "2 variáveis" },
      { id: "c", text: "3 variáveis" },
      { id: "d", text: "4 variáveis" },
    ],
    correct: "c",
    explanation:
      "Regra: ⌈log₂(N)⌉ variáveis. Para 6 fontes: 2²=4<6 (insuficiente), 2³=8≥6 (suficiente). Mínimo = 3 variáveis. Com 3 bits endereça 8 entradas — 6 usadas, 2 livres.",
    hint: "Bizu: N fontes → ⌈log₂(N)⌉ bits. Para 6: 2²=4<6 ✗, 2³=8≥6 ✓. Mínimo = 3.",
    requiresCalc: true,
    footnote: "* MUX (Multiplexador): seleciona 1 de N entradas de dados e a conecta à saída. Os bits de seleção formam o endereço binário da entrada escolhida. N entradas precisam de ⌈log₂(N)⌉ bits de seleção.",
  },
  {
    id: "q20",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "MUX 4:1 com I₀=1, I₁=0, I₂=1, I₃=0. Seletor S₁=1, S₀=0. Qual entrada é selecionada e qual é Y?",
    options: [
      { id: "a", text: "I₁  →  Y = 0" },
      { id: "b", text: "I₃  →  Y = 0" },
      { id: "c", text: "I₀  →  Y = 1" },
      { id: "d", text: "I₂  →  Y = 1" },
    ],
    correct: "d",
    explanation:
      "Índice = S₁×2 + S₀×1 = 1×2 + 0×1 = 2 → seleciona I₂. I₂=1 → Y=1. Regra: S₁S₀ em binário → índice decimal da entrada selecionada.",
    hint: "Bizu: índice = S₁×2 + S₀×1. S₁S₀=10₂ = 2₁₀ → I₂. Y = valor de I₂.",
    requiresCalc: true,
    footnote: "* MUX 4:1: 4 entradas (I₀–I₃), 2 bits de seleção (S₁, S₀). Índice selecionado = S₁×2 + S₀×1. S₁S₀=00→I₀ | 01→I₁ | 10→I₂ | 11→I₃.",
  },

  // ── BLOCO 9: Portas Lógicas ────────────────────────────────────────────────
  {
    id: "q21",
    category: "Portas Lógicas",
    difficulty: "difícil",
    question:
      "Porta NAND com entradas A=1, B=1. Qual a saída? E com A=1, B=0?",
    gate: "NAND",
    options: [
      { id: "a", text: "S(1,1)=1  e  S(1,0)=0" },
      { id: "b", text: "S(1,1)=0  e  S(1,0)=0" },
      { id: "c", text: "S(1,1)=0  e  S(1,0)=1" },
      { id: "d", text: "S(1,1)=1  e  S(1,0)=1" },
    ],
    correct: "c",
    explanation:
      "NAND = NOT(AND). (1,1): AND=1 → NAND=0. (1,0): AND=0 → NAND=1. NAND só produz 0 quando TODAS entradas = 1.",
    hint: "Bizu: NAND = NOT(A·B).\nSaída=0 só quando A=1 E B=1.\nQualquer entrada 0 → saída=1.",
    requiresCalc: false,
  },
  {
    id: "q22",
    category: "Portas Lógicas",
    difficulty: "difícil",
    question:
      "Por que NAND e NOR são chamadas de portas UNIVERSAIS?",
    gate: "NAND",
    options: [
      { id: "a", text: "São as mais rápidas em CIs integrados de última geração" },
      { id: "b", text: "Podem ser combinadas para implementar qualquer função booleana (AND, OR, NOT e derivadas)" },
      { id: "c", text: "Funcionam como conversores ADC e DAC simultaneamente" },
      { id: "d", text: "Operam com qualquer nível de tensão entre 1 V e 30 V" },
    ],
    correct: "b",
    explanation:
      "NAND e NOR são universais: com apenas um tipo constrói-se qualquer porta. NOT via NAND: une as entradas. AND via NAND: NAND seguido de NOT-NAND. OR via NAND: aplica De Morgan. Permite fabricar CIs inteiros com uma única célula básica.",
    hint: "Bizu: NAND com entradas juntas = NOT. 2 NANDs = AND. AND+NOT → OR (De Morgan). Logo: qualquer função.",
    requiresCalc: false,
  },
  {
    id: "q23",
    category: "Portas Lógicas",
    difficulty: "muito difícil",
    question:
      "Aplique o Teorema De Morgan para simplificar $\\overline{A \\cdot B \\cdot C}$:",
    gate: "NAND",
    options: [
      { id: "a", text: "$\\bar{A}$ · $\\bar{B}$ · $\\bar{C}$" },
      { id: "b", text: "$\\bar{A}$ + $\\bar{B}$ + $\\bar{C}$" },
      { id: "c", text: "A + B + C" },
      { id: "d", text: "$\\overline{A + B + C}$" },
    ],
    correct: "b",
    explanation:
      "De Morgan para 3 variáveis: $\\overline{A \\cdot B \\cdot C}$ = $\\bar{A}$ + $\\bar{B}$ + $\\bar{C}$. Regra: 'quebre a barra, troque AND↔OR'. Verificação: A=1,B=1,C=0 → $\\overline{1 \\cdot 1 \\cdot 0}$ = $\\bar{0}$ = 1. $\\bar{A}$+$\\bar{B}$+$\\bar{C}$ = 0+0+1 = 1 ✓.",
    hint: "Bizu: De Morgan — 'quebre a barra, troque AND↔OR'.\n$\\overline{X \\cdot Y \\cdot Z}$ = $\\bar{X}$ + $\\bar{Y}$ + $\\bar{Z}$.",
    requiresCalc: false,
  },
  {
    id: "q24",
    category: "Álgebra Booleana",
    difficulty: "muito difícil",
    question:
      "Simplifique: F = A·B + A·B̄. Qual é o resultado?",
    options: [
      { id: "a", text: "F = A·B" },
      { id: "b", text: "F = B" },
      { id: "c", text: "F = A + B" },
      { id: "d", text: "F = A" },
    ],
    correct: "d",
    explanation:
      "F = A·B + A·B̄ = A·(B + B̄) = A·1 = A. Lei da Adjacência: X·Y + X·Ȳ = X. B se cancela completamente — a saída depende apenas de A.",
    hint: "Bizu: A·B + A·B̄ = A·(B+B̄) = A·1 = A. Lei da adjacência: X·Y + X·Ȳ = X.",
    requiresCalc: false,
  },

  // ── BLOCO 10: Circuito Paralelo e Potência ────────────────────────────────
  {
    id: "q25",
    category: "Circuito Paralelo",
    difficulty: "muito difícil",
    question:
      "Circuito paralelo: V = 12 V, R₁ = 4 Ω, R₂ = 6 Ω. Calcule RT, I₁, I₂ e IT.",
    options: [
      { id: "a", text: "RT = 10 Ω,  I₁=1,2A,  I₂=2A,  IT=3,2A" },
      { id: "b", text: "RT = 2,4 Ω,  I₁=3A,  I₂=2A,  IT=5A" },
      { id: "c", text: "RT = 2,4 Ω,  I₁=2A,  I₂=3A,  IT=5A" },
      { id: "d", text: "RT = 2 Ω,  I₁=6A,  I₂=6A,  IT=12A" },
    ],
    correct: "b",
    explanation:
      "1/RT = 1/4 + 1/6 = 3/12 + 2/12 = 5/12 → RT = 2,4 Ω. I₁=12/4=3A. I₂=12/6=2A. IT=5A. Verificação: IT=V/RT=12/2,4=5A ✓.",
    hint: "Bizu: 1/RT = 1/R₁ + 1/R₂.\nIn = V/Rn (tensão igual em paralelo).\nIT = ΣIn.",
    requiresCalc: true,
  },
  {
    id: "q26",
    category: "Potência Elétrica",
    difficulty: "muito difícil",
    question:
      "R₁ = 2 kΩ, R₂ = 6 kΩ em série, V = 16 V. Qual resistor dissipa MAIS potência e qual é o valor?",
    options: [
      { id: "a", text: "R₁ dissipa mais: P₁ = 8 mW" },
      { id: "b", text: "Ambos dissipam igual: P = 16 mW cada" },
      { id: "c", text: "R₂ dissipa mais: P₂ = 24 mW" },
      { id: "d", text: "R₁ dissipa mais: P₁ = 32 mW" },
    ],
    correct: "c",
    explanation:
      "I = 16/8.000 = 2 mA. P₁=(0,002)²×2.000=8mW. P₂=(0,002)²×6.000=24mW. Em série, corrente igual → maior R = maior potência.",
    hint: "Bizu: Em série I é igual em todos os resistores.\nP = I²×R → maior R = maior P.\nI = V/Req.",
    requiresCalc: true,
  },
  {
    id: "q27",
    category: "Potência Elétrica",
    difficulty: "muito difícil",
    question:
      "Um resistor de 100 Ω dissipa 400 mW. Qual é a corrente que o atravessa?",
    options: [
      { id: "a", text: "I = 0,004 A  (4 mA)" },
      { id: "b", text: "I = 2 A" },
      { id: "c", text: "I = 40 mA" },
      { id: "d", text: "I ≈ 63 mA" },
    ],
    correct: "d",
    explanation:
      "P = I²×R → I = √(P/R). 400 mW = 0,4 W. I = √(0,4/100) = √0,004 ≈ 0,0632 A = 63 mA. Verificação: (0,0632)²×100 ≈ 0,4 W ✓.",
    hint: "Bizu: P = I²×R → I = √(P/R).\nConverta mW→W antes: 400 mW = 0,4 W.\nI = √(0,4 / 100) ≈ 63 mA.",
    requiresCalc: true,
  },

  // ── BLOCO 11: Mais Séries e Paralelo ──────────────────────────────────────
  {
    id: "q28",
    category: "Circuitos em Série",
    difficulty: "muito difícil",
    question:
      "Três fontes em série: E₁ = 12 V, E₂ = 4 V (polaridade INVERTIDA), E₃ = 6 V. Qual é a tensão total?",
    options: [
      { id: "a", text: "ET = 14 V" },
      { id: "b", text: "ET = 22 V" },
      { id: "c", text: "ET = 2 V" },
      { id: "d", text: "ET = 10 V" },
    ],
    correct: "a",
    explanation:
      "Polaridades iguais somam; opostas subtraem. ET = 12 – 4 + 6 = 14 V. Analogia: pilhas num controle remoto — uma ao contrário reduz a tensão total.",
    hint: "Bizu: Mesma polaridade → soma. Invertida → subtrai. ET = E₁ – E₂ + E₃.",
    requiresCalc: true,
  },
  {
    id: "q29",
    category: "Circuito Paralelo",
    difficulty: "muito difícil",
    question:
      "Três resistores iguais de 9 Ω em paralelo com 9 V. Qual é RT e qual a potência total?",
    options: [
      { id: "a", text: "RT = 27 Ω  e  PT = 3 W" },
      { id: "b", text: "RT = 3 Ω   e  PT = 27 W" },
      { id: "c", text: "RT = 3 Ω   e  PT = 3 W" },
      { id: "d", text: "RT = 9 Ω   e  PT = 9 W" },
    ],
    correct: "b",
    explanation:
      "N iguais em paralelo: RT = R/N = 9/3 = 3 Ω. IT = 9/3 = 3 A. PT = V×IT = 27 W. Também: PT = V²/RT = 81/3 = 27 W ✓.",
    hint: "Bizu: N iguais em paralelo: RT = R/N. IT = V/RT. PT = V×IT.",
    requiresCalc: true,
  },
  {
    id: "q30",
    category: "Circuitos em Série",
    difficulty: "muito difícil",
    question:
      "Circuito série: V = 30 V, R₁ = 10 kΩ, R₂ = 20 kΩ. Pelo divisor de tensão, qual é V_R₂?",
    options: [
      { id: "a", text: "V_R₂ = 30 V" },
      { id: "b", text: "V_R₂ = 10 V" },
      { id: "c", text: "V_R₂ = 15 V" },
      { id: "d", text: "V_R₂ = 20 V" },
    ],
    correct: "d",
    explanation:
      "Divisor de tensão: V_R₂ = V × (R₂/Req) = 30 × (20/30) = 20 V. Verificação: I=1mA, V_R₂=0,001×20.000=20V ✓. V_R₁=10V → 10+20=30V ✓.",
    hint: "Bizu: V_Rn = Vtotal × (Rn/Req). R maior recebe mais tensão em série.",
    requiresCalc: true,
  },

  // ── BLOCO 12: Sistemas Digitais e ADC ─────────────────────────────────────
  {
    id: "q31",
    category: "Sistemas Digitais",
    difficulty: "muito difícil",
    question:
      "Um ADC de 4 bits converte tensões de 0 a 15 V. Qual a resolução (V/bit) e quantos valores distintos existem?",
    options: [
      { id: "a", text: "Resolução = 1 V/bit  e  16 valores" },
      { id: "b", text: "Resolução = 4 V/bit  e  4 valores" },
      { id: "c", text: "Resolução = 0,5 V/bit  e  32 valores" },
      { id: "d", text: "Resolução = 1 V/bit  e  15 valores" },
    ],
    correct: "a",
    explanation:
      "2⁴ = 16 valores (0 a 15). Resolução = (15–0)/(16–1) = 15/15 = 1 V/bit. Cada bit representa 1 V de variação.",
    hint: "Bizu: n bits → 2ⁿ valores. Resolução = faixa/(2ⁿ–1). 4 bits: 16 valores, resolução=1V.",
    requiresCalc: true,
  },
  {
    id: "q32",
    category: "Sistemas Digitais",
    difficulty: "difícil",
    question:
      "Qual afirmação descreve CORRETAMENTE a diferença entre analógico e digital?",
    options: [
      { id: "a", text: "Analógico usa tensão; digital usa corrente para representar informação" },
      { id: "b", text: "Digital armazena infinitos valores; analógico é o discreto dos dois" },
      { id: "c", text: "Analógico tem valores contínuos; digital tem valores discretos (0 e 1)" },
      { id: "d", text: "São equivalentes — um pode ser convertido no outro sem perdas" },
    ],
    correct: "c",
    explanation:
      "Analógico: contínuo, qualquer valor real (ex: 21,7°C, 21,73°C...). Digital: discreto, apenas 0 ou 1. A conversão ADC causa quantização — perda de precisão irreversível.",
    hint: "Bizu: Analógico = curva suave (infinitos valores). Digital = degraus (bits). ADC converte com perda.",
    requiresCalc: false,
  },

  // ── BLOCO 13: Decoder e Comparador ────────────────────────────────────────
  {
    id: "q33",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "Um decodificador 3×8 recebe A₂A₁A₀ = 110₂. Qual saída Yn fica ativa?",
    options: [
      { id: "a", text: "Y₆" },
      { id: "b", text: "Y₁" },
      { id: "c", text: "Y₃" },
      { id: "d", text: "Y₇" },
    ],
    correct: "a",
    explanation:
      "110₂ = 1×4 + 1×2 + 0×1 = 6₁₀ → Y₆ ativa. Decoder 3×8: exatamente 1 saída ativa por vez.",
    hint: "Bizu: A₂×4 + A₁×2 + A₀×1. 110₂ = 4+2+0 = 6 → Y₆.",
    requiresCalc: true,
    footnote: "* Decoder 3×8 (Decodificador): recebe 3 bits de entrada (A₂A₁A₀) e ativa exatamente UMA entre 8 saídas (Y₀–Y₇). A saída ativa é aquela cujo índice em decimal é igual ao valor binário da entrada.",
  },
  {
    id: "q34",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "Comparador de 4 bits: A = 0111₂, B = 1001₂. Qual saída fica em nível ALTO?",
    options: [
      { id: "a", text: "A > B" },
      { id: "b", text: "A = B" },
      { id: "c", text: "A < B" },
      { id: "d", text: "A > B  e  A < B simultaneamente" },
    ],
    correct: "c",
    explanation:
      "0111₂ = 7₁₀. 1001₂ = 9₁₀. 7 < 9 → saída A<B = HIGH. As demais saídas ficam em LOW.",
    hint: "Bizu: Converta para decimal. 0111₂=7, 1001₂=9. 7<9 → A<B.",
    requiresCalc: true,
    footnote: "* Comparador de 4 bits: compara dois números A e B bit a bit. Possui 3 saídas — apenas UMA fica em HIGH: A>B, A=B ou A<B. Pode ser cascateado para comparar palavras maiores.",
  },

  // ── BLOCO 14: Lei de Ohm e Corrente ────────────────────────────────────────
  {
    id: "q35",
    category: "Lei de Ohm",
    difficulty: "muito difícil",
    question:
      "Um resistor de 4,7 kΩ é ligado a 9 V. Qual é a corrente em mA?",
    options: [
      { id: "a", text: "I ≈ 1,91 mA" },
      { id: "b", text: "I ≈ 42,3 mA" },
      { id: "c", text: "I = 1.910 mA" },
      { id: "d", text: "I = 0,00191 mA" },
    ],
    correct: "a",
    explanation:
      "R = 4.700 Ω. I = 9/4.700 = 0,001914 A = 1,91 mA. Erro comum: não converter kΩ→Ω ou esquecer de multiplicar ×1000 para obter mA.",
    hint: "Bizu: 1 kΩ = 1.000 Ω. I = V/R (em A). Para mA: ×1000. 9/4700 = 0,00191A = 1,91mA.",
    requiresCalc: true,
  },
  {
    id: "q36",
    category: "Lei de Ohm",
    difficulty: "muito difícil",
    question:
      "Em 8 segundos, 40 coulombs atravessam um condutor. Qual é a corrente e como deve ser ligado o instrumento de medição?",
    options: [
      { id: "a", text: "I = 5 A  —  Voltímetro em paralelo" },
      { id: "b", text: "I = 320 A  —  Amperímetro em série" },
      { id: "c", text: "I = 5 A  —  Amperímetro em paralelo" },
      { id: "d", text: "I = 5 A  —  Amperímetro em série" },
    ],
    correct: "d",
    explanation:
      "I = Q/T = 40/8 = 5 A. O amperímetro mede corrente e deve ser ligado EM SÉRIE (toda a corrente passa por ele). O voltímetro mede tensão e vai em PARALELO.",
    hint: "Bizu: I = Q/T. Amperímetro → série. Voltímetro → paralelo.",
    requiresCalc: true,
  },

  // ── BLOCO 15: Clock e Flip-Flop adicionais ────────────────────────────────
  {
    id: "q37",
    category: "Clock & Pulsos",
    difficulty: "muito difícil",
    question:
      "Um sinal digital tem t_HIGH = 6 ms e t_LOW = 4 ms. Calcule T, f e Duty Cycle.",
    options: [
      { id: "a", text: "T=10ms,  f=100Hz,  DC=40%" },
      { id: "b", text: "T=6ms,   f=167Hz,  DC=100%" },
      { id: "c", text: "T=10ms,  f=100Hz,  DC=60%" },
      { id: "d", text: "T=2ms,   f=500Hz,  DC=60%" },
    ],
    correct: "c",
    explanation:
      "T = 6+4 = 10 ms = 0,01 s. f = 1/0,01 = 100 Hz. DC = t_HIGH/T×100% = 6/10×100% = 60%.",
    hint: "Bizu: T = t_HIGH + t_LOW.\nf = 1/T (em segundos).\nDC = t_HIGH / T × 100%.",
    requiresCalc: true,
  },
  {
    id: "q38",
    category: "Clock & Pulsos",
    difficulty: "difícil",
    question:
      "Qual é a tabela de excitação CORRETA do Flip-Flop JK?",
    options: [
      { id: "a", text: "00→Toggle, 01→Set, 10→Reset, 11→Mantém" },
      { id: "b", text: "00→Mantém, 01→Reset, 10→Set, 11→Toggle" },
      { id: "c", text: "00→Reset, 01→Set, 10→Mantém, 11→Toggle" },
      { id: "d", text: "00→Toggle, 11→Set, 01→Reset, 10→Mantém" },
    ],
    correct: "b",
    explanation:
      "JK: J=0,K=0→mantém. J=0,K=1→Reset (Q→0). J=1,K=0→Set (Q→1). J=1,K=1→Toggle (Q inverte). O JK elimina o estado proibido do SR com a condição de toggle.",
    hint: "Bizu: JK — 00=mantém, 01=reset, 10=set, 11=toggle. J=Jam(set), K=Kill(reset).",
    requiresCalc: false,
    footnote: "* Flip-Flop JK: elemento de memória de 1 bit com entradas J (Set) e K (Reset). Sincronizado pela borda do clock.\nJ=0,K=0 → mantém Q | J=0,K=1 → Reset (Q=0) | J=1,K=0 → Set (Q=1) | J=1,K=1 → Toggle (Q inverte).\nDiferencial: elimina o estado proibido do SR com o Toggle.",
  },
  {
    id: "q39",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "Um somador de 4 bits calcula 0110₂ + 0111₂. Qual é o resultado e há Carry out?",
    options: [
      { id: "a", text: "Resultado = 1101₂ = 13₁₀,  Cout = 0" },
      { id: "b", text: "Resultado = 1110₂ = 14₁₀,  Cout = 0" },
      { id: "c", text: "Resultado = 0000₂,  Cout = 1" },
      { id: "d", text: "Resultado = 1111₂ = 15₁₀,  Cout = 0" },
    ],
    correct: "a",
    explanation:
      "6+7=13₁₀. Bit a bit: b0:0+1=1(c=0); b1:1+1=0(c=1); b2:1+1+1=1(c=1); b3:0+0+1=1(c=0). Resultado=1101₂, Cout=0. 13<16 → cabe em 4 bits.",
    hint: "Bizu: 6 + 7 = 13 = 1101₂.\n13 < 16 → cabe em 4 bits → sem overflow.\nCout = 0.",
    requiresCalc: true,
  },
  {
    id: "q40",
    category: "Circuitos Combinacionais",
    difficulty: "muito difícil",
    question:
      "Quais expressões implementam CORRETAMENTE o Half Adder?\nI. S = A XOR B\nII. Carry = A AND B\nIII. Carry = A OR B\nIV. S = A AND B",
    gate: "XOR",
    options: [
      { id: "a", text: "I e II" },
      { id: "b", text: "I e III" },
      { id: "c", text: "IV e II" },
      { id: "d", text: "I, II e III" },
    ],
    correct: "a",
    explanation:
      "Half Adder: S = A⊕B (XOR — bit de soma), Carry = A·B (AND — gerado só quando A=B=1). III é errada: OR(0,1)=1, mas 0+1 não gera carry. IV é errada: AND(0,1)=0, mas a soma de 0+1=1.",
    hint: "Bizu: S=XOR (diferente→1). Carry=AND (ambos 1→carry). OR é errado: OR(0,1)=1 mas não há carry em 0+1.",
    requiresCalc: false,
    footnote: "* Half Adder (Meio Somador): circuito combinacional com 2 entradas (A, B) e 2 saídas: Soma (S) e Carry-out (C).\nS = A ⊕ B (XOR): 1 quando os bits diferem.\nC = A · B (AND): 1 somente quando A=B=1.\nNão possui Carry-in — para somar mais bits em sequência usa-se o Full Adder.",
  },
];

// ═══════════════════════════════════════════
//  MIND MAP DATA
// ═══════════════════════════════════════════
export interface MindNode {
  id: string;
  label: string;
  color: string;       // fill color for SVG
  textColor: string;
  cx: number; cy: number;    // SVG coordinates
  r: number;                  // circle radius
  concepts: string[];         // bullet points shown in panel
  formula?: string;
}

// Centro: (600, 415), raio de distribuição: 320
// Nós em círculo, ângulo = i × 360/14° a partir do topo (sentido horário)
// x = 600 + 320·sin(θ), y = 415 − 320·cos(θ)
export const mindmapCenter = { cx: 600, cy: 415, label: "Eletrônica\n& Sistemas\nDigitais" };

export const mindNodes: MindNode[] = [
  // ── Anel horário da direita: Elétrica analógica ──────────────────────────
  {
    id: "tensao",
    label: "Tensão &\nCorrente",
    color: "#16a34a",
    textColor: "#fff",
    cx: 600, cy: 95, r: 52,
    concepts: [
      "DDP (tensão) V: energia por unidade de carga — Volt (V)",
      "Corrente I = Q/T — unidade: Ampère (A)",
      "Fluxo convencional: (+)→(–) | Fluxo de elétrons: (–)→(+)",
      "Sem DDP: movimento aleatório dos elétrons livres",
      "Com DDP: movimento ordenado → corrente elétrica",
      "Força Eletromotriz (fem): tensão gerada pela fonte",
      "CC: sentido único | CA: sentido oscilante (60 Hz no Brasil)",
      "Tensão de referência GND = 0 V",
    ],
    formula: "I = Q / T",
  },
  {
    id: "fontes",
    label: "Fontes de\nTensão",
    color: "#7c3aed",
    textColor: "#fff",
    cx: 739, cy: 127, r: 52,
    concepts: [
      "Bateria primária: não recarregável (pilha alcalina, zinco-carbono)",
      "Bateria secundária: recarregável (Chumbo-ácido, Ni-HM, Íon-Lítio)",
      "Capacidade em mAh: tempo = Cap(mAh) / I(mA)",
      "Gerador: indutância eletromagnética — rotação de bobinas em campo magnético",
      "Fonte de alimentação: retificação CA → CC + filtro capacitivo",
      "Célula solar: efeito fotovoltaico → energia elétrica a partir de luz",
      "Fontes em série: mesma polaridade somam, polaridade inversa subtrai",
      "Fonte ideal: tensão constante independente da corrente extraída",
    ],
  },
  {
    id: "atomo",
    label: "Estrutura\nAtômica",
    color: "#3b82f6",
    textColor: "#fff",
    cx: 850, cy: 216, r: 52,
    concepts: [
      "Átomo: núcleo (prótons+, nêutrons) + eletrosfera (elétrons–)",
      "Número atômico Z = quantidade de prótons = elétrons no estado neutro",
      "Camadas de energia: K(2e), L(8e), M(18e), N(32e)…",
      "Elétrons de valência: última camada — determinam o tipo de material",
      "Condutor: < 4 elétrons de valência (ex: Cu, Ag, Au)",
      "Semicondutor: = 4 elétrons (Si, Ge) — base dos transistores",
      "Isolante: > 4 elétrons (plástico, borracha, vidro)",
      "Estado excitado: elétron absorve energia e salta para camada superior",
      "Elétron livre: abandona o átomo — responsável pela condução nos metais",
    ],
  },
  {
    id: "resistencia",
    label: "Resistência\n& Lei de Ohm",
    color: "#ea580c",
    textColor: "#fff",
    cx: 912, cy: 344, r: 52,
    concepts: [
      "Resistência R: oposição ao fluxo de corrente — Ohm (Ω)",
      "Lei de Ohm: V = I × R (aplica a CC, CA e sinais digitais)",
      "I = V/R | R = V/I | V = I×R",
      "Ao cruzar um resistor: SEMPRE calor E queda de tensão",
      "Resistores fixos: filme carbono, filme metálico, óxido de metal, fio",
      "Resistores variáveis: reostato (2 terminais) e potenciômetro (3 terminais)",
      "Código de cores 4 faixas: 1ª e 2ª = dígitos, 3ª = multiplicador, 4ª = tolerância",
      "Código de cores 5 faixas: 3 dígitos + multiplicador + tolerância",
      "Termistor NTC: R cai com temperatura | PTC: R sobe com temperatura",
    ],
    formula: "V = I × R",
  },
  {
    id: "potencia",
    label: "Potência\nElétrica",
    color: "#ca8a04",
    textColor: "#fff",
    cx: 912, cy: 486, r: 52,
    concepts: [
      "Potência P: taxa de conversão de energia — Watt (W)",
      "P = V × I  (usa quando se sabe V e I)",
      "P = I² × R  (usa quando se sabe I e R — Efeito Joule)",
      "P = V² / R  (usa quando se sabe V e R)",
      "Em série: mesma corrente → maior R = MAIOR P",
      "Em paralelo: mesma tensão → maior R = MENOR P",
      "PT (série) = P₁+P₂+…+Pₙ = I × V_total",
      "PT (paralelo) = P₁+P₂+…+Pₙ = V × I_total",
      "Efeito Joule: energia elétrica → calor nos resistores",
    ],
    formula: "P = V·I = I²·R = V²/R",
  },
  {
    id: "serie",
    label: "Circuito\nSérie",
    color: "#db2777",
    textColor: "#fff",
    cx: 850, cy: 614, r: 52,
    concepts: [
      "Mesma corrente I em todos os componentes",
      "RT = R₁ + R₂ + … + Rₙ",
      "V_total = V₁ + V₂ + … + Vₙ (divisão de tensão)",
      "Divisor de tensão: V_Rn = V_total × Rn / RT",
      "Se um componente abre: CIRCUITO INTEIRO para",
      "Se um curto-circuita: tensão se redistribui nos restantes",
      "Fontes em série: mesma polaridade somam, inversa subtrai",
      "Amperímetro: ligado em série para medir corrente",
    ],
    formula: "RT = ΣR  |  V_Rn = V×Rn/RT",
  },
  {
    id: "paralelo",
    label: "Circuito\nParalelo",
    color: "#e11d48",
    textColor: "#fff",
    cx: 739, cy: 703, r: 52,
    concepts: [
      "Mesma tensão V em todos os componentes",
      "1/RT = 1/R₁ + 1/R₂ + … + 1/Rₙ",
      "Dois resistores: RT = R₁×R₂ / (R₁+R₂)",
      "N iguais em paralelo: RT = R/N",
      "I_total = I₁ + I₂ + … + Iₙ (divisão de corrente)",
      "Divisor de corrente: I₁ = I_T × R₂/(R₁+R₂)",
      "Se um curto-circuita: V cai para 0 no ramo todo",
      "Aplicação: instalações residenciais — tomadas em paralelo",
      "Voltímetro: ligado em paralelo para medir tensão",
    ],
    formula: "1/RT = Σ(1/Rn)",
  },
  {
    id: "misto",
    label: "Circuito\nMisto",
    color: "#0f766e",
    textColor: "#fff",
    cx: 600, cy: 735, r: 52,
    concepts: [
      "Combinação de partes em série e em paralelo no mesmo circuito",
      "Método: simplificar bloco a bloco (de dentro para fora)",
      "Divisor de tensão: V_out = V_in × R₂/(R₁+R₂)",
      "Divisor de corrente: I₁ = I_T × R₂/(R₁+R₂)",
      "KVL (Kirchhoff Tensão): soma algébrica das tensões numa malha = 0",
      "KCL (Kirchhoff Corrente): soma das correntes num nó = 0",
      "Thévenin: qualquer circuito linear = V_th + R_th em série",
      "Norton: equivalente com fonte de corrente I_N + R_N em paralelo",
    ],
    formula: "KVL: ΣV = 0  |  KCL: ΣI = 0",
  },
  // ── Anel anti-horário da esquerda: Sistemas Digitais ─────────────────────
  {
    id: "digital",
    label: "Sistemas\nDigitais",
    color: "#0891b2",
    textColor: "#fff",
    cx: 461, cy: 703, r: 52,
    concepts: [
      "Grandezas DISCRETAS: apenas 0 (LOW) e 1 (HIGH)",
      "Nível lógico TTL: LOW < 0,8V | HIGH > 2,0V",
      "1 bit = 1 dígito binário. 1 byte = 8 bits = 2⁸ = 256 estados",
      "Conversão: bin↔dec↔hex (base 2, 10, 16)",
      "ADC: Analog→Digital — amostragem + quantização + codificação",
      "DAC: Digital→Analog — converte bits em tensão proporcional",
      "Resolução ADC: faixa / (2ⁿ − 1) Volt por bit",
      "Evolução: válvulas → transistores → CIs → VLSI → processadores",
      "Quantização: perda irrecuperável de precisão na conversão A/D",
    ],
  },
  {
    id: "clock",
    label: "Clock &\nPulsos",
    color: "#0ea5e9",
    textColor: "#fff",
    cx: 350, cy: 614, r: 52,
    concepts: [
      "Clock: onda quadrada periódica que sincroniza circuitos digitais",
      "Período T = t_HIGH + t_LOW",
      "Frequência f = 1/T (Hz, kHz, MHz, GHz)",
      "Duty Cycle DC = t_HIGH / T × 100%",
      "Borda de subida (↑): LOW→HIGH | Borda de descida (↓): HIGH→LOW",
      "Flip-flops são sincronizados pela borda de subida do clock",
      "Clock típico: kHz (microcontroladores lentos) a GHz (processadores)",
      "Jitter: variação no período do clock — causa erros em alta freq.",
      "Circuito síncrono: todas as saídas mudam junto com o clock",
    ],
    formula: "T = 1/f  |  DC = t_H/T × 100%",
  },
  {
    id: "flipflop",
    label: "Flip-Flops\n& Memória",
    color: "#8b5cf6",
    textColor: "#fff",
    cx: 288, cy: 486, r: 52,
    concepts: [
      "Flip-Flop = circuito que 'lembra' 1 bit — diferente das portas comuns, ele guarda o valor mesmo depois que a entrada muda",
      "Saída Q é o bit guardado; Q̄ (Q barra) é sempre o oposto de Q",
      "Borda de clock: o FF só atualiza seu valor no momento exato em que o clock sobe de 0 → 1",
      "FF D (mais simples): na borda do clock, Q copia o valor de D — é como tirar uma foto do dado",
      "FF JK (mais completo): J=Set, K=Reset, J=K=1 faz Toggle (inverte) — sem estado proibido",
      "FF T: T=1 → inverte o estado a cada clock (base dos contadores binários)",
      "Latch vs Flip-Flop: Latch reage ao nível do clock (mais instável); FF reage só na borda (mais previsível)",
      "Aplicações: registradores (armazenam bytes), contadores, SRAM e toda memória sequencial",
    ],
  },
  {
    id: "portas",
    label: "Portas\nLógicas",
    color: "#dc2626",
    textColor: "#fff",
    cx: 288, cy: 344, r: 52,
    concepts: [
      "Porta = bloco eletrônico que executa UMA operação lógica (como um interruptor inteligente)",
      "Entradas e saída só podem assumir dois valores: 0 (LOW ≈ 0V) ou 1 (HIGH ≈ 5V)",
      "AND = 'E': as duas entradas precisam ser 1 para a saída ser 1 (como duas chaves em série)",
      "OR = 'OU': basta UMA entrada ser 1 para a saída ser 1 (chaves em paralelo)",
      "NOT = 'NÃO': inverte o valor — entra 0, sai 1; entra 1, sai 0",
      "NAND e NOR são UNIVERSAIS — você pode construir qualquer circuito usando só um desses tipos",
      "XOR = 'OU exclusivo': saída 1 somente quando as entradas são DIFERENTES",
      "Circuitos reais (CPUs, memórias) são feitos de milhões dessas portas em série e paralelo",
    ],
    formula: "NAND: ¬(A·B) | NOR: ¬(A+B)",
  },
  {
    id: "booleana",
    label: "Álgebra\nBooleana",
    color: "#c026d3",
    textColor: "#fff",
    cx: 350, cy: 216, r: 52,
    concepts: [
      "Identidade: A+0=A | A·1=A",
      "Dominância: A+1=1 | A·0=0",
      "Complemento: A+Ā=1 | A·Ā=0 | ¬¬A=A",
      "Idempotência: A+A=A | A·A=A",
      "De Morgan 1ª: ¬(A·B) = Ā+B̄  (NAND → NOR de complementos)",
      "De Morgan 2ª: ¬(A+B) = Ā·B̄  (NOR → NAND de complementos)",
      "Adjacência: A·B + A·B̄ = A  (simplificação básica)",
      "Absorção: A + A·B = A",
      "Minterm (mₙ): F=1 → var=1 normal, var=0 complementada, liga AND",
      "Maxterm (Mₙ): F=0 → var=0 normal, var=1 complementada, liga OR",
      "SOP = Soma de Mintermos | POS = Produto de Maxtermos",
    ],
    formula: "¬(A·B)=Ā+B̄ | ¬(A+B)=Ā·B̄",
  },
  {
    id: "combinacional",
    label: "Circuitos\nCombinacionais",
    color: "#059669",
    textColor: "#fff",
    cx: 461, cy: 127, r: 52,
    concepts: [
      "Saída depende APENAS das entradas atuais — SEM memória",
      "MUX N:1: seleciona 1 de N entradas com ⌈log₂(N)⌉ bits de seleção",
      "DEMUX: distribui 1 entrada para 1 de N saídas",
      "Decoder N×2ⁿ: ativa exatamente 1 saída por vez (índice = valor binário)",
      "Encoder: converte 1 de 2ⁿ entradas ativas em código binário N bits",
      "Comparador: A>B, A=B, A<B — apenas 1 saída em HIGH",
      "Half Adder: S=A⊕B, C=A·B — soma 2 bits, sem Carry-in",
      "Full Adder: S=A⊕B⊕Cin, Cout=A·B+Cin·(A⊕B) — soma 3 bits",
      "Somador ripple-carry: Full Adders encadeados, Cout→Cin do próximo",
    ],
    formula: "HA: S=A⊕B, C=A·B | FA: Cout=A·B+Cin·(A⊕B)",
  },
];

// Links entre os nós do mapa
export interface MindLink { from: string; to: string }
export const mindLinks: MindLink[] = [
  // Centro → todos
  { from: "center", to: "tensao" },
  { from: "center", to: "fontes" },
  { from: "center", to: "atomo" },
  { from: "center", to: "resistencia" },
  { from: "center", to: "potencia" },
  { from: "center", to: "serie" },
  { from: "center", to: "paralelo" },
  { from: "center", to: "misto" },
  { from: "center", to: "digital" },
  { from: "center", to: "clock" },
  { from: "center", to: "flipflop" },
  { from: "center", to: "portas" },
  { from: "center", to: "booleana" },
  { from: "center", to: "combinacional" },
  // Conexões cruzadas — lado elétrico
  { from: "atomo",       to: "tensao" },
  { from: "tensao",      to: "fontes" },
  { from: "tensao",      to: "resistencia" },
  { from: "resistencia", to: "potencia" },
  { from: "resistencia", to: "serie" },
  { from: "resistencia", to: "paralelo" },
  { from: "serie",       to: "potencia" },
  { from: "paralelo",    to: "potencia" },
  { from: "serie",       to: "misto" },
  { from: "paralelo",    to: "misto" },
  { from: "fontes",      to: "potencia" },
  // Conexões cruzadas — lado digital
  { from: "digital",      to: "portas" },
  { from: "digital",      to: "clock" },
  { from: "portas",       to: "booleana" },
  { from: "booleana",     to: "combinacional" },
  { from: "portas",       to: "combinacional" },
  { from: "combinacional", to: "flipflop" },
  { from: "flipflop",     to: "clock" },
  // Conexão analógico ↔ digital
  { from: "digital",      to: "tensao" },
];
