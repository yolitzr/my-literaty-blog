import Link from "next/link";
import type { Metadata } from "next";
import { getReviewsWithBooks } from "@/lib/strapi";
import ReviewsGrid from "@/components/book-review/ReviewsGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Reseñas | Yolit's Bookish",
  description: "Todos los libros que he reseñado: análisis honestos de lecturas en español e inglés.",
};

export default async function BookReviewPage() {
  let reviews = [];
  let total = 0;

  try {
    const res = await getReviewsWithBooks(1, 100);
    reviews = res.data;
    total = res.meta.pagination.total;
  } catch {
    // Strapi offline: muestra página vacía
  }

  // Stats
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
      : "0.0";

  const genres = [
    ...new Set(
      reviews.flatMap((r) => r.book?.genres?.map((g) => g.title) ?? [])
    ),
  ].sort();

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span>Reseñas</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={`${styles.hero} container`}>
        <h1 className={styles.heroTitle}>Mis Libros Reseñados</h1>
        <p className={styles.heroSubtitle}>
          Una colección de todas las reseñas que he escrito. Haz clic en
          cualquier portada para leer mi análisis completo.
        </p>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{total}</span>
            <span className={styles.statLabel}>Libros reseñados</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{avgRating}</span>
            <span className={styles.statLabel}>Puntuación promedio</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{genres.length}</span>
            <span className={styles.statLabel}>Géneros cubiertos</span>
          </div>
        </div>
      </section>

      {/* Grid con filtros */}
      <main className={`${styles.content} container`}>
        <h2 className={styles.sectionTitle}>Biblioteca Completa</h2>
        <ReviewsGrid reviews={reviews} genres={genres} />
      </main>
    </div>
  );
}
