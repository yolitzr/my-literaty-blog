import Link from "next/link";
import type { Metadata } from "next";
import {
  FaBookReader, FaLanguage, FaBullseye,
  FaHeart, FaDragon, FaUserEdit, FaGraduationCap,
  FaEnvelope, FaClock,
} from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaBookOpen } from "react-icons/fa6";
import { FaGoodreadsG } from "react-icons/fa";
import { getSobreMi, getReviews, getBooks } from "@/lib/strapi";
import BlocksRenderer from "@/components/ui/BlocksRenderer";
import styles from "./page.module.css";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export const metadata: Metadata = {
  title: "Sobre Mí | Yolit's Bookish",
  description:
    "Lectora compulsiva, blogger literaria y creadora de puentes entre libros, idiomas y culturas.",
};

function imgUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

const INFO_CARDS = [
  {
    icon: <FaBookReader />,
    title: "Mi enfoque como lectora",
    text: "Creo en la lectura como experiencia personal. Mis reseñas son honestas, desde el corazón, y siempre busco lo que cada libro tiene para ofrecer, más allá de géneros o popularidad.",
  },
  {
    icon: <FaLanguage />,
    title: "Lectura bilingüe",
    text: "Leo tanto en español como en inglés. En este blog encontrarás reseñas de libros en ambos idiomas, comparativas de traducciones y guías para quienes quieren empezar a leer en inglés.",
  },
  {
    icon: <FaBullseye />,
    title: "Mi misión",
    text: "Crear una comunidad inclusiva donde podamos conversar sobre libros sin pretensiones. Quiero que este sea tu espacio seguro para descubrir nuevas lecturas y compartir tus propias experiencias.",
  },
];

const GENRES = [
  {
    icon: <FaHeart />,
    title: "Romance Contemporáneo",
    text: "Mi comfort genre. Amo las historias de pueblos pequeños y segundas oportunidades.",
  },
  {
    icon: <FaDragon />,
    title: "Fantasía",
    text: "Desde fantasía juvenil hasta alta fantasía épica. Los mundos construidos me fascinan.",
  },
  {
    icon: <FaUserEdit />,
    title: "Ficción Literaria",
    text: "Disfruto de la prosa cuidada y las historias que te hacen reflexionar.",
  },
  {
    icon: <FaGraduationCap />,
    title: "No-ficción Creativa",
    text: "Memorias, ensayos, libros sobre creatividad y psicología.",
  },
];

export default async function AboutMePage() {
  const [aboutRes, reviewsRes, booksRes] = await Promise.allSettled([
    getSobreMi(),
    getReviews(1, 1),
    getBooks(1, 1),
  ]);

  const about = aboutRes.status === "fulfilled" ? aboutRes.value.data : null;
  const totalReviews =
    reviewsRes.status === "fulfilled"
      ? reviewsRes.value.meta.pagination.total
      : 0;
  const totalBooks =
    booksRes.status === "fulfilled"
      ? booksRes.value.meta.pagination.total
      : 0;

  const photoUrl = imgUrl(
    about?.photo?.formats?.large?.url ??
    about?.photo?.formats?.medium?.url ??
    about?.photo?.url
  );

  const bioBlocks = about?.bio ?? [];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <div className={styles.inner}>
          <Link href="/">Inicio</Link>
          <span className={styles.sep}>/</span>
          <span>Sobre Mí</span>
        </div>
      </nav>

      <div className={styles.inner}>
        {/* Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>
            Hola, soy {about?.title ?? "Yolit Carolina"}
          </h1>
          <p className={styles.heroSubtitle}>
            Lectora compulsiva, blogger literaria y creadora de puentes entre
            libros, idiomas y culturas
          </p>
        </section>

        <div className={styles.pageContent}>
          {/* Intro */}
          <section className={styles.introSection}>
            <div>
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoUrl}
                  alt={about?.title ?? "Yolit Carolina"}
                  className={styles.authorAvatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>📚</div>
              )}
            </div>
            <div className={styles.introText}>
              <h2>Mi historia con los libros</h2>
              {bioBlocks.length > 0 ? (
                <BlocksRenderer content={bioBlocks} />
              ) : (
                <>
                  <p>
                    Desde que tengo memoria, los libros han sido mis compañeros
                    constantes. Creé &ldquo;Yolit&rsquo;s Bookish&rdquo; como un espacio para
                    compartir mi pasión por la lectura.
                  </p>
                  <p>
                    Estoy más emocionada que nunca por reconectar con la
                    comunidad lectora y crear contenido que una a los amantes de
                    los libros en español e inglés.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Info cards */}
          <div className={styles.infoCards}>
            {INFO_CARDS.map((card) => (
              <div key={card.title} className={styles.infoCard}>
                <span className={styles.cardIcon}>{card.icon}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <section className={styles.statsSection}>
            <h2>En números</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1,200+</span>
                <span className={styles.statLabel}>Libros leídos</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{totalReviews}</span>
                <span className={styles.statLabel}>Reseñas escritas</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{totalBooks}</span>
                <span className={styles.statLabel}>Libros en TBR</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>60/40</span>
                <span className={styles.statLabel}>Español / Inglés</span>
              </div>
            </div>
          </section>

          {/* Genres */}
          <section className={styles.genresSection}>
            <h2>Mis géneros literarios</h2>
            <p>Aunque leo de todo, estos son los géneros que más frecuento:</p>
            <div className={styles.genresGrid}>
              {GENRES.map((g) => (
                <div key={g.title} className={styles.genreCard}>
                  <span className={styles.genreIcon}>{g.icon}</span>
                  <h4>{g.title}</h4>
                  <p>{g.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className={styles.contactSection}>
            <h2>Conectemos</h2>
            <p>Me encanta conversar con otros lectores. ¡No dudes en contactarme!</p>

            <div className={styles.socialLinks}>
              <a
                href="mailto:hola@yolitsbookish.com"
                className={`${styles.socialLink} ${styles.socialLinkEmail}`}
              >
                <FaEnvelope /> Email
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.socialLinkInstagram}`}>
                <FaInstagram /> Instagram
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.socialLinkTwitter}`}>
                <FaXTwitter /> Twitter
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.socialLinkGoodreads}`}>
                <FaGoodreadsG /> Goodreads
              </a>
              <a href="#" className={`${styles.socialLink} ${styles.socialLinkNetgalley}`}>
                <FaBookOpen /> NetGalley
              </a>
            </div>

            <p className={styles.contactNote}>
              <FaClock /> Generalmente respondo en 24–48 horas
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
