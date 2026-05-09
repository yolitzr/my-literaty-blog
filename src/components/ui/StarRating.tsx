import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  rating: number;
  max?: number;
}

export default function StarRating({ rating, max = 5 }: Props) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = max - full - (half ? 1 : 0);

  return (
    <div style={{ color: "var(--color-gold-400)", fontSize: "1.4rem", letterSpacing: "2px" }}>
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`f${i}`} />
      ))}
      {half && <FaStarHalfAlt key="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <FaRegStar key={`e${i}`} />
      ))}
    </div>
  );
}
