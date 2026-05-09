import Link from "next/link";
import type { Metadata } from "next";
import { getBooks } from "@/lib/strapi";
import BooksGrid from "@/components/tbr/BooksGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "TBR | Yolit's Bookish",
  description: "Mi lista de libros por leer: todos los títulos que tengo pendientes.",
};

export default async function TBRPage() {
  let books = [];
  let total = 0;

  try {
    const res = await getBooks(1, 100);
    books = res.data;
    total = res.meta.pagination.total;
  } catch {
    // Strapi offline
  }

  const genres = [
    ...new Set(
      books.flatMap((b) => b.genres?.map((g) => g.title) ?? [])
    ),
  ].sort();

  const authors = new Set(
    books.map((b) => b.author?.full_name).filter(Boolean)
  ).size;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span>TBR</span>
        </div>
      </nav>

      {/* Hero */}
      <section className={`${styles.hero} container`}>
        <h1 className={styles.heroTitle}>Mi Lista TBR</h1>
        <p className={styles.heroSubtitle}>
          Todos los libros que tengo pendientes de leer. Haz clic en cualquier
          portada para ver más detalles.
        </p>

        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{total}</span>
            <span className={styles.statLabel}>Libros en TBR</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{genres.length}</span>
            <span className={styles.statLabel}>Géneros</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{authors}</span>
            <span className={styles.statLabel}>Autores</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className={`${styles.content} container`}>
        <h2 className={styles.sectionTitle}>Biblioteca Completa</h2>
        <BooksGrid books={books} genres={genres} />
      </main>
    </div>
  );
}
