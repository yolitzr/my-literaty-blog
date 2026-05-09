import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Card.module.css";

interface CardProps {
  image?: string | null;
  imageAlt?: string;
  date?: string;
  tag?: string;
  title: string;
  excerpt?: string;
  href: string;
  linkText?: string;
}

export default function Card({
  image,
  imageAlt = "",
  date,
  tag,
  title,
  excerpt,
  href,
  linkText = "Leer más",
}: CardProps) {
  return (
    <article className={styles.card}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={imageAlt} className={styles.cardImg} />
      ) : (
        <div className={styles.cardImgPlaceholder}>📚</div>
      )}
      <div className={styles.cardContent}>
        {(date || tag) && (
          <div className={styles.cardMeta}>
            {date && <span>{date}</span>}
            {tag && <span className={styles.cardTag}>{tag}</span>}
          </div>
        )}
        <h3>{title}</h3>
        {excerpt && <p className={styles.cardExcerpt}>{excerpt}</p>}
        <Link href={href} className={styles.cardLink}>
          {linkText}{" "}
          <span className={styles.arrow}>
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </article>
  );
}
