interface Props {
  size?: number;
}

export default function BookLogo({ size = 38 }: Props) {
  // Aspect ratio 56:42
  const h = Math.round((size * 42) / 56);

  const S  = "#4A2E2A"; // stroke principal — marrón oscuro
  const F  = "#F5F1ED"; // fill páginas — cream
  const FB = "#E8DFD8"; // fill contraportada — beige
  const L  = "#8B6F6F"; // líneas de texto — marrón suave
  const SW = 2.2;       // stroke width principal

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 56 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Contraportada izquierda (profundidad) ── */}
      <path
        d="M27 10 Q15 13 3 18 L3 40 Q14 40 27 40 Z"
        fill={FB}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />

      {/* ── Contraportada derecha ── */}
      <path
        d="M29 10 Q41 13 53 18 L53 40 Q42 40 29 40 Z"
        fill={FB}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />

      {/* ── Página izquierda (frente) — curva desde lomo hacia afuera ── */}
      <path
        d="M27 8 Q15 11 5 16 L5 39 Q15 39 27 39 Z"
        fill={F}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />

      {/* ── Página derecha (frente) ── */}
      <path
        d="M29 8 Q41 11 51 16 L51 39 Q41 39 29 39 Z"
        fill={F}
        stroke={S}
        strokeWidth={SW}
        strokeLinejoin="round"
      />

      {/* ── Lomo central elevado ── */}
      <rect
        x="26" y="5" width="4" height="34"
        rx="1"
        fill={FB}
        stroke={S}
        strokeWidth={SW - 0.4}
      />

      {/* ── Tapa del lomo (redondeada, con acento rose) ── */}
      <ellipse
        cx="28" cy="5.5"
        rx="3" ry="2"
        fill="#D8A7A7"
        stroke={S}
        strokeWidth="1.4"
      />

      {/* ── Líneas de texto — página izquierda (ligeramente curvadas hacia arriba) ── */}
      <path d="M8  20 Q17 18.5 25 19"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M8  24 Q17 22.5 25 23"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M8  28 Q17 26.5 25 27"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M8  32 Q17 30.5 25 31"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M8  36 Q14 34.5 21 35"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* ── Líneas de texto — página derecha ── */}
      <path d="M31 19 Q39 18.5 48 20"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M31 23 Q39 22.5 48 24"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M31 27 Q39 26.5 48 28"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M31 31 Q39 30.5 48 32"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M31 35 Q37 34.5 44 36"   stroke={L} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}
