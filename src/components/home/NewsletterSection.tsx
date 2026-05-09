"use client";

import { useState } from "react";
import styles from "./NewsletterSection.module.css";

interface Props {
  title?: string | null;
  subtitle?: string | null;
  quote?: string | null;
  quoteAuthor?: string | null;
}

export default function NewsletterSection({ title, subtitle, quote, quoteAuthor }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  const displayQuote = quote ?? "Los libros son un espejo: si un mono se asoma a ellos, no puede ver reflejado a un apóstol.";
  const displayAuthor = quoteAuthor ? `— ${quoteAuthor}` : "— Georg Christoph Lichtenberg";

  return (
    <section className={styles.section} id="newsletter">
      <div className="container">
        <div className={styles.grid}>

          {/* Quote */}
          <div className={styles.quoteCol}>
            <span className={styles.quoteDecor}>&ldquo;</span>
            <blockquote className={styles.quote}>{displayQuote}</blockquote>
            <cite className={styles.quoteAuthor}>{displayAuthor}</cite>
          </div>

          {/* Form */}
          <div className={styles.formCol}>
            <p className={styles.formLabel}>{title ?? "No te pierdas nada"}</p>
            <p className={styles.formSubtitle}>
              {subtitle ?? "Suscríbete y recibe las últimas reseñas, novedades y recomendaciones directamente en tu bandeja."}
            </p>
            {submitted ? (
              <div className={styles.success}>¡Gracias! Te has suscrito correctamente. 📚</div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.submitBtn}>
                  Suscribirse
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
