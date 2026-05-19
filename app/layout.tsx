import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ICD — Introdução aos Circuitos Digitais | ICET-UFAM",
  description:
    "Plataforma de estudos para 1º período de Engenharia de Software – UFAM/ICET. Eletrônica, circuitos e sistemas digitais.",
  keywords: "eletrônica, circuitos, UFAM, ICET, lei de ohm, sistemas digitais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
          ICD · ICET-UFAM · Prof. Carlos Freitas
        </footer>
      </body>
    </html>
  );
}
