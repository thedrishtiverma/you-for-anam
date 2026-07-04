import { useEffect, useRef, useState } from "react";

export function PaintFuture({ pageNumber, total }: { pageNumber: number; total: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgba(247, 243, 236, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "destination-out";

    const paint = (x: number, y: number) => {
      const r = 38 + Math.random() * 14;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.5, "rgba(0,0,0,0.6)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let lastSample = 0;
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      paint(e.clientX - r.left, e.clientY - r.top);
      const now = Date.now();
      if (now - lastSample > 400) {
        lastSample = now;
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let cleared = 0;
        for (let i = 3; i < data.length; i += 4 * 40) if (data[i] < 30) cleared++;
        setRevealed(Math.min(1, cleared / (data.length / (4 * 40)) * 1.2));
      }
    };

    canvas.addEventListener("pointermove", move);
    return () => canvas.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="w-full h-full p-10 md:p-16 flex flex-col items-center justify-center relative">
      <div className="absolute inset-10 md:inset-16 rounded-sm overflow-hidden">
        {/* underlay sketch */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 55%, oklch(0.85 0.06 70) 0%, oklch(0.80 0.08 200 / 0.55) 35%, oklch(0.78 0.10 25 / 0.4) 60%, transparent 80%)",
          }}
        />
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 w-full h-full opacity-70"
          fill="none"
          stroke="oklch(0.35 0.04 60)"
          strokeWidth="1"
        >
          <path d="M80 320 Q 200 90 320 320" />
          <path d="M120 320 Q 200 150 280 320" />
          <circle cx="200" cy="180" r="38" />
          <path d="M170 320 L170 360 M230 320 L230 360" />
          <path d="M60 340 L 340 340" strokeDasharray="2 6" />
          <text x="200" y="380" textAnchor="middle" fontFamily="Caveat" fontSize="18" fill="oklch(0.35 0.04 60)" stroke="none">
            us — sometime soon
          </text>
        </svg>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
      </div>

      <div className="relative z-10 text-center pointer-events-none">
        <p className="font-mono-term text-[10px] tracking-[0.4em] uppercase text-ink-soft">Future</p>
        <h2 className="font-serif-display text-5xl ink-text mt-1">Currently unwritten.</h2>
        <p className="font-serif-display italic text-ink-soft mt-3">Help reveal it.</p>
      </div>

      <div className="absolute bottom-4 right-6 font-serif-display italic text-xs text-ink-soft">
        · {pageNumber} ·
      </div>
      <span className="sr-only">{Math.round(revealed * 100)}% revealed</span>
    </div>
  );
}
