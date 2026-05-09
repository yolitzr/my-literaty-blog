import Link from "next/link";
import type { Metadata } from "next";
import { FaCalendarAlt, FaEnvelope, FaBookOpen } from "react-icons/fa";
import { getPoliticaDeResenas } from "@/lib/strapi";
import BlocksRenderer from "@/components/ui/BlocksRenderer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Política de Reseñas | Yolit's Bookish",
  description:
    "Todo lo que necesitas saber antes de solicitar una reseña: formatos aceptados, tiempos de respuesta y mi sistema de calificación.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default async function ReviewPolicyPage() {
  let policy = null;

  try {
    const res = await getPoliticaDeResenas();
    policy = res.data;
  } catch {
    // Strapi offline
  }

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Inicio</Link>
          <span className={styles.sep}>/</span>
          <span>Política de Reseñas</span>
        </div>
      </nav>

      <article className={styles.article}>
        {/* Header */}
        <header className={styles.pageHeader}>
          <span className={styles.badge}>Política del blog</span>
          <h1 className={styles.pageTitle}>
            {policy?.title ? capitalize(policy.title) : "Política de Reseñas"}
          </h1>
          <div className={styles.pageMeta}>
            {policy?.publishedAt && (
              <>
                <FaCalendarAlt />
                <span>Actualizado el {formatDate(policy.publishedAt)}</span>
              </>
            )}
          </div>
        </header>

        {/* Content from Strapi */}
        {policy?.content ? (
          <BlocksRenderer
            content={policy.content}
            className={styles.content}
          />
        ) : (
          <p className={styles.content}>Contenido no disponible.</p>
        )}

        {/* Contact CTA */}
        <div className={styles.ctaBox}>
          <span className={styles.ctaIcon}>
            <FaBookOpen />
          </span>
          <div className={styles.ctaText}>
            <h3>¿Quieres solicitar una reseña?</h3>
            <p>
              Después de leer la política, escríbeme para coordinar los
              detalles.
            </p>
          </div>
          <a
            href="mailto:info@carosbookish.com"
            className={styles.ctaBtn}
          >
            <FaEnvelope />
            Contactar
          </a>
        </div>
      </article>
    </div>
  );
}
