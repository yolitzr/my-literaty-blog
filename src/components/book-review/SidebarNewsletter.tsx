"use client";

import { useState } from "react";
import { FaNewspaper, FaLock } from "react-icons/fa";
import styles from "./SidebarNewsletter.module.css";

export default function SidebarNewsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <div className={styles.newsletter}>
      <h3 className={styles.title}>
        <FaNewspaper />
        Newsletter Bookish
      </h3>
      <p className={styles.text}>
        Recibe las últimas reseñas, recomendaciones y contenido exclusivo
        directamente en tu correo.
      </p>

      {submitted ? (
        <p className={styles.success}>¡Gracias! Pronto recibirás novedades. 📚</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Tu correo electrónico"
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

      <p className={styles.privacy}>
        <FaLock />
        Respetamos tu privacidad. Sin spam.
      </p>
    </div>
  );
}
