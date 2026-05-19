# ICD — Introdução aos Circuitos Digitais

Aplicação web de estudo desenvolvida para apoiar os **tutorandos da disciplina ICD (Introdução aos Circuitos Digitais)** do 1º período do curso de **Engenharia de Software — ICET/UFAM**.

Prof. responsável: **Carlos Freitas**

---

## Para que serve

Esta ferramenta foi criada para que os alunos possam revisar, fixar e testar o conteúdo da disciplina de forma autônoma, especialmente antes de provas. Ela cobre toda a ementa e inclui questões no mesmo nível de exigência das avaliações reais — com distrações, falsos positivos e situações que exigem cálculo.

---

## Módulos disponíveis

| # | Módulo | Descrição |
|---|--------|-----------|
| 01 | **Flashcards** | 35 cartões com conceitos, fórmulas e explicações. Clique para virar e revelar a resposta. Filtro por categoria. |
| 02 | **Mapa Mental** | Visualização SVG interativa conectando os 7 grandes tópicos da disciplina. Clique em um nó para ver conceitos e fórmulas. |
| 03 | **Prova** | 40 questões de alta dificuldade, sorteadas em sessões de 10. Gabarito e explicação detalhada após cada resposta. Dica de fórmula oculta (💡). |

---

## Conteúdo abordado

- Estrutura Atômica e elétrons de valência
- Tensão, Corrente e Fontes de tensão
- Lei de Ohm e Resistência
- Potência Elétrica
- Circuitos em Série e em Paralelo (divisor de tensão, Req, quedas de tensão)
- Grandezas Analógicas vs Digitais — ADC/DAC
- Sistemas Digitais — bits, níveis lógicos TTL
- Portas Lógicas (AND, OR, NOT, NAND, NOR, XOR, XNOR)
- Álgebra Booleana — sequência de projeto, mintermos, maxtermos, simplificação
- Clock & Pulsos — frequência, período, duty cycle
- Flip-Flop JK — diagrama temporal, leitura de sinais
- Circuitos Combinacionais — MUX/DEMUX, Decodificador, Comparador, Half Adder, Full Adder

---

## Stack

- [Next.js](https://nextjs.org/) com App Router
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- TypeScript
- Deploy: [Vercel](https://vercel.com/)

---

## Rodando localmente

```bash
# Requer Node.js >= 18
nvm use --lts

npm install
npm run dev
```

Acesse `http://localhost:3000`.

---

## Deploy

O projeto está configurado para deploy direto na Vercel via integração com o GitHub. Qualquer push na branch `main` aciona o deploy automático.

---

*ICET-UFAM · 1º Período · Engenharia de Software*
