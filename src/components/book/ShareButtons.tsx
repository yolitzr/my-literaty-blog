"use client";

import { useState } from "react";
import { FaXTwitter, FaPinterest, FaLink } from "react-icons/fa6";
import styles from "./ShareButtons.module.css";

interface Props {
  title: string;
}

export default function ShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  function share(network: "twitter" | "pinterest") {
    const url = window.location.href;
    const text = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const targets: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${text}`,
    };

    window.open(targets[network], "_blank", "noopener,width=600,height=400");
  }

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.shareButtons}>
      <span className={styles.shareLabel}>Compartir:</span>
      <button
        onClick={() => share("twitter")}
        className={`${styles.shareBtn} ${styles.twitter}`}
        title="Compartir en Twitter / X"
        aria-label="Compartir en Twitter"
      >
        <FaXTwitter />
      </button>
      <button
        onClick={() => share("pinterest")}
        className={`${styles.shareBtn} ${styles.pinterest}`}
        title="Guardar en Pinterest"
        aria-label="Guardar en Pinterest"
      >
        <FaPinterest />
      </button>
      <button
        onClick={copyLink}
        className={`${styles.shareBtn} ${styles.link} ${copied ? styles.copied : ""}`}
        title={copied ? "¡Enlace copiado!" : "Copiar enlace"}
        aria-label="Copiar enlace"
      >
        <FaLink />
      </button>
    </div>
  );
}
