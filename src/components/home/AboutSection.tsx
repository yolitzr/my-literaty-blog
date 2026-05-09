import Link from "next/link";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.about}>
      <div className="container">
        <h2>Sobre Mí</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              ¡Hola! Soy <strong>Yolit Carolina</strong> (pero me puedes decir
              Caro), la mente y corazón detrás de{" "}
              <em>Yolit&apos;s Bookish</em>.
            </p>
            <p>
              Soy una lectora compulsiva, blogger y reseñadora apasionada por
              compartir mis descubrimientos literarios. En este espacio
              encontrarás reseñas honestas, recomendaciones variadas y
              conversaciones sobre libros en{" "}
              <strong>español e inglés</strong>.
            </p>
            <p>
              Creo firmemente que los libros son puentes entre culturas, y me
              especializo en ser ese puente para la comunidad hispanohablante que
              quiere explorar la literatura en inglés, y viceversa.
            </p>
            <Link href="/about-me" className="btn">
              Conóceme mejor
            </Link>
          </div>
          <div className={styles.aboutImg}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80"
              alt="Yolit leyendo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
