import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaBookOpen,
  FaHeart,
} from "react-icons/fa6";
import { FaGoodreadsG } from "react-icons/fa";
import styles from "./Footer.module.css";

const SECTIONS = [
  { href: "/", label: "Inicio" },
  { href: "/book-review", label: "Reseñas" },
  { href: "/blog", label: "Blog" },
  { href: "/tbr", label: "TBR" },
  { href: "/authors", label: "Autores" },
  { href: "/about-me", label: "Sobre mí" },
];

const CATEGORIES = [
  { href: "/blog?categoria=arc-review", label: "ARC Reviews" },
  { href: "/blog?categoria=monthly-wrap-up", label: "Monthly Wrap-Up" },
  { href: "/blog?categoria=www-wednesday", label: "WWW Wednesday" },
  { href: "/blog?categoria=top-10-tuesday", label: "Top 10 Tuesday" },
];

const SOCIAL = [
  { href: "#", icon: <FaInstagram />, label: "Instagram" },
  { href: "#", icon: <FaXTwitter />, label: "Twitter / X" },
  { href: "#", icon: <FaGoodreadsG />, label: "Goodreads" },
  { href: "#", icon: <FaYoutube />, label: "YouTube" },
  { href: "#", icon: <FaBookOpen />, label: "NetGalley" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>Yolit&apos;s Bookish</h3>
            <p>
              Compulsive Reader, Book Blogger &amp; Reviewer. Tu guía literaria
              bilingüe.
            </p>
            <div className={styles.socialLinks}>
              {SOCIAL.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={styles.socialLink}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footerLinks}>
            <h4>Secciones</h4>
            <ul>
              {SECTIONS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4>Categorías</h4>
            <ul>
              {CATEGORIES.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.footerLinks}>
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href="mailto:hola@yolitsbookish.com">
                  hola@yolitsbookish.com
                </a>
              </li>
              <li>
                <Link href="/review-policy">Política de Reseñas</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <span>
            &copy; {new Date().getFullYear()} Yolit&apos;s Bookish. Todos los
            derechos reservados. | Diseñado con
          </span>
          <FaHeart className={styles.heart} />
          <span>y muchas páginas leídas.</span>
        </div>
      </div>
    </footer>
  );
}
