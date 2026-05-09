"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./LibrarySection.module.css";
import type { Book } from "@/types/strapi";
import { FaBook, FaBookOpen, FaStar, FaGlobe } from "react-icons/fa";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

type Tab = { label: string; status: string | null };

const TABS: Tab[] = [
  { label: "Libros Recientes", status: null },
  { label: "Quisiera Leer", status: "quiero_leer" },
  { label: "ARCs", status: "arc" },
  { label: "En Inglés", status: "en_ingles" },
];

function imgUrl(img: Book["image"]): string | null {
  if (!img) return null;
  const url = img.formats?.small?.url ?? img.formats?.thumbnail?.url ?? img.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

interface Props {
  books: Book[];
  total: number;
}

export default function LibrarySection({ books, total }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const filtered = TABS[activeTab].status
    ? books.filter((b) => b.reading_status === TABS[activeTab].status)
    : books;

  const enProceso = books.filter((b) => b.reading_status === "leyendo").length;
  const enIngles = books.filter((b) => b.reading_status === "en_ingles").length;
  const ratings = books.filter((b) => b.my_rating != null).map((b) => b.my_rating as number);
  const avgRating = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : "—";

  return (
    <section className={styles.section}>
      <div className="container">
        <p className="section-title">Mi Biblioteca</p>

        <div className={styles.layout}>
          {/* Books area */}
          <div className={styles.booksArea}>
            <div className={styles.tabs}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  className={`${styles.tab} ${activeTab === i ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(i)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className={styles.empty}>Próximamente...</p>
            ) : (
              <div className={styles.booksGrid}>
                {filtered.map((book) => {
                  const cover = imgUrl(book.image);
                  return (
                    <Link key={book.id} href={`/book/${book.slug}`} className={styles.bookItem}>
                      {cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt={book.title} className={styles.bookCover} />
                      ) : (
                        <div className={styles.bookCoverPlaceholder}>📚</div>
                      )}
                      <p className={styles.bookTitle}>{book.title}</p>
                      <p className={styles.bookAuthor}>{book.author?.full_name}</p>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className={styles.viewAll}>
              <Link href="/tbr" className="btn">Ver biblioteca completa</Link>
            </div>
          </div>

          {/* Stats sidebar */}
          <aside className={styles.stats}>
            <p className={styles.statsTitle}>Estadísticas de Lectura</p>
            <ul className={styles.statsList}>
              <li className={styles.statItem}>
                <FaBook className={styles.statIcon} />
                <div>
                  <span className={styles.statNumber}>{total}</span>
                  <span className={styles.statLabel}>Libros totales</span>
                </div>
              </li>
              <li className={styles.statItem}>
                <FaBookOpen className={styles.statIcon} />
                <div>
                  <span className={styles.statNumber}>{enProceso}</span>
                  <span className={styles.statLabel}>En proceso</span>
                </div>
              </li>
              <li className={styles.statItem}>
                <FaGlobe className={styles.statIcon} />
                <div>
                  <span className={styles.statNumber}>{enIngles}</span>
                  <span className={styles.statLabel}>Libros en inglés</span>
                </div>
              </li>
              <li className={styles.statItem}>
                <FaStar className={styles.statIcon} style={{ color: "var(--color-gold)" }} />
                <div>
                  <span className={styles.statNumber}>{avgRating}</span>
                  <span className={styles.statLabel}>Puntuación promedio</span>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
