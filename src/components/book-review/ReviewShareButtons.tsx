"use client";

import { useState } from "react";
import { FaXTwitter, FaFacebookF, FaPinterest, FaLink } from "react-icons/fa6";
import styles from "./ReviewShareButtons.module.css";

interface Props {
  title: string;
}

export default function ReviewShareButtons({ title }: Props) {
  const [copied, setCopied] = useState(false);

  function share(net: "twitter" | "facebook" | "pinterest") {
    const url = encodeURIComponent(window.location.href);
    const t = encodeURIComponent(title);
    const targets = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${t}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${t}`,
    };
    window.open(targets[net], "_blank", "noopener,width=600,height=400");
  }

  async function copy() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.buttons}>
      <button onClick={() => share("twitter")} className={`${styles.btn} ${styles.twitter}`} aria-label="Twitter"><FaXTwitter /></button>
      <button onClick={() => share("facebook")} className={`${styles.btn} ${styles.facebook}`} aria-label="Facebook"><FaFacebookF /></button>
      <button onClick={() => share("pinterest")} className={`${styles.btn} ${styles.pinterest}`} aria-label="Pinterest"><FaPinterest /></button>
      <button onClick={copy} className={`${styles.btn} ${styles.copy} ${copied ? styles.copied : ""}`} aria-label="Copiar enlace"><FaLink /></button>
    </div>
  );
}
