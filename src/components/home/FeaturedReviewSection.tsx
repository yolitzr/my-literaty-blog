import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./FeaturedReviewSection.module.css";
import type { Review } from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function imgUrl(
  img: { url: string; formats?: { medium?: { url: string }; small?: { url: string } } | null } | null
): string | null {
  if (!img) return null;
  const url = img.formats?.medium?.url ?? img.formats?.small?.url ?? img.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function blockToExcerpt(blocks: Review["content"], max = 160): string {
  for (const block of blocks ?? []) {
    for (const child of (block.children as Array<{ type: string; text?: string }>) ?? []) {
      if (child.type === "text" && child.text?.trim()) {
        const text = child.text.trim();
        return text.length > max ? `${text.slice(0, max)}…` : text;
      }
    }
  }
  return "";
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className={styles.stars}>
      {Array.from({ length: full }).map((_, i) => <FaStar key={`f${i}`} />)}
      {half && <FaStarHalfAlt key="half" />}
      {Array.from({ length: empty }).map((_, i) => <FaRegStar key={`e${i}`} />)}
      <span className={styles.ratingNum}>{rating} / 5</span>
    </div>
  );
}

interface Props {
  review: Review | null;
  aboutSnippet?: string | null;
  aboutPhotoUrl?: string | null;
}

export default function FeaturedReviewSection({ review, aboutSnippet, aboutPhotoUrl }: Props) {
  const book = review?.book;
  const coverUrl = book?.image ? imgUrl(book.image) : null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.outerGrid}>

          {/* ── LEFT: Reseña destacada — sin card, flota sobre el fondo ── */}
          <div className={styles.leftCol}>
            <p className={styles.colLabel}>Reseña Destacada</p>

            <div className={styles.reviewLayout}>
              {/* Portada */}
              <div className={styles.coverWrap}>
                {coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={coverUrl} alt={book?.title ?? ""} className={styles.coverImg} />
                ) : (
                  <div className={styles.coverPlaceholder} />
                )}
              </div>

              {/* Contenido flotando sobre el beige */}
              <div className={styles.reviewContent}>
                {review && book ? (
                  <>
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    {book.author?.full_name && (
                      <p className={styles.authorName}>de {book.author.full_name}</p>
                    )}
                    {book.genres && book.genres.length > 0 && (
                      <div className={styles.tags}>
                        {book.genres.slice(0, 4).map((g) => (
                          <span key={g.id} className={styles.tag}>{g.title}</span>
                        ))}
                      </div>
                    )}
                    <Stars rating={review.rating} />
                    <p className={styles.excerpt}>{blockToExcerpt(review.content)}</p>
                    <Link href={`/book-review/${review.slug}`} className={styles.reviewBtn}>
                      Leer reseña completa
                    </Link>
                  </>
                ) : (
                  <>
                    <p className={styles.excerpt}>Próximamente la primera reseña destacada...</p>
                    <Link href="/book-review" className={styles.reviewBtn}>Ver todas las reseñas</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: ¡Hola, soy Yolit! — card blanco con foto portrait ── */}
          <div className={styles.rightCol}>
            <p className={styles.colLabel}>¡Hola, soy Yolit!</p>
            <div className={styles.aboutCard}>
              <div className={styles.aboutPhotoWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aboutPhotoUrl ?? "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"}
                  alt="Yolit"
                  className={styles.aboutPhoto}
                />
              </div>
              <div className={styles.aboutBody}>
                <p className={styles.aboutBio}>
                  {aboutSnippet ?? "Lectora apasionada, amante de los libros en español e inglés. Aquí comparto mis lecturas, opiniones y recomendaciones con toda honestidad."}
                </p>
                <Link href="/about-me" className={styles.aboutLink}>
                  Conoce más sobre mí →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
