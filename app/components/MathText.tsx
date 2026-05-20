"use client";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  text: string;
  className?: string;
}

export default function MathText({ text, className }: Props) {
  const segments = text.split(/(\$[^$]+\$)/g);
  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.startsWith("$") && seg.endsWith("$") && seg.length > 2) {
          const math = seg.slice(1, -1);
          const html = katex.renderToString(math, {
            throwOnError: false,
            output: "html",
            displayMode: false,
          });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        return <span key={i}>{seg}</span>;
      })}
    </span>
  );
}
