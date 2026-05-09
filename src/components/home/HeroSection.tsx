import Link from "next/link";
import styles from "./HeroSection.module.css";

interface Props {
  title?: string | null;
  subtitle?: string | null;
  ctaText?: string | null;
  backgroundUrl?: string | null;
}

export default function HeroSection({ title, subtitle, ctaText, backgroundUrl }: Props) {
  const bgStyle = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : undefined;

  return (
    <section className={styles.hero} style={bgStyle}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Bienvenida a</p>
        <h1 className={styles.title}>
          {title ?? "Mi rincón literario"}
        </h1>

        <div className={styles.separator}>
          <span className={styles.separatorLine} />
          <span className={styles.separatorHeart}>♥</span>
          <span className={styles.separatorLine} />
        </div>

        <p className={styles.subtitle}>
          {subtitle ?? "Reseñas honestas, lecturas inevitables y todo lo que hace amar los libros."}
        </p>
        <Link href="/blog" className={`btn btn-outline ${styles.cta}`}>
          {ctaText ?? "Explora el blog"}
        </Link>
      </div>
    </section>
  );
}
