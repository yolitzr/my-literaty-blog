'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaSearch, FaEnvelope } from 'react-icons/fa';
import { FaGoodreadsG } from 'react-icons/fa';
import {
	FaInstagram,
	FaTiktok,
	FaPinterestP,
	FaChevronDown,
} from 'react-icons/fa6';
import styles from './Header.module.css';

const CATEGORIES_DROPDOWN = [
	{ href: '/book-review', label: 'Reseñas' },
	{ href: '/bookish-news', label: 'Bookish News / ARC Alert' },
	{ href: '/blog/www-wednesday', label: 'WWW Wednesday' },
	{ href: '/blog/top-ten-tuesday', label: 'Top Ten Tuesday' },
	{ href: '/blog/monthly-wrap-up', label: 'Monthly Wrap-Up' },
	{ href: '/blog', label: 'Contenido Extra' },
];

const SOCIAL = [
	{ href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
	{ href: 'https://tiktok.com', icon: <FaTiktok />, label: 'TikTok' },
	{ href: 'https://pinterest.com', icon: <FaPinterestP />, label: 'Pinterest' },
	{ href: 'https://goodreads.com', icon: <FaGoodreadsG />, label: 'Goodreads' },
];

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [categoriesOpen, setCategoriesOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setCategoriesOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header className={styles.header}>
			{/* ── Top bar: cream — socials | logo | newsletter ── */}
			<div className={styles.topBar}>
				<div className={styles.socials}>
					{SOCIAL.map(({ href, icon, label }) => (
						<a
							key={label}
							href={href}
							aria-label={label}
							className={styles.socialLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{icon}
						</a>
					))}
				</div>

				<Link href="/" className={styles.logoLink}>
					<span className={styles.logoGroup}>
						<span className={styles.siteLogo}>Yolit&apos;s Bookish</span>
						<span className={styles.logoTagline}>
							Compulsive Reader, Book Blogger &amp; Reviewer
						</span>
					</span>
				</Link>

				<div className={styles.topRight}>
					<Link href="#newsletter" className={styles.newsletterBtn}>
						<FaEnvelope className={styles.newsletterIcon} />
						Newsletter
					</Link>
				</div>
			</div>

			{/* ── Nav bar: brown ── */}
			<nav className={styles.navBar}>
				<div className={styles.navInner}>
					<button
						className={styles.mobileMenuBtn}
						onClick={() => setMenuOpen((prev) => !prev)}
						aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>

					<ul className={`${styles.navList} ${menuOpen ? styles.navOpen : ''}`}>
						<li>
							<Link href="/" onClick={() => setMenuOpen(false)}>
								Inicio
							</Link>
						</li>
						<li>
							<Link href="/about-me" onClick={() => setMenuOpen(false)}>
								Sobre Mí
							</Link>
						</li>

						<li
							ref={dropdownRef}
							className={styles.hasDropdown}
							onMouseEnter={() => setCategoriesOpen(true)}
							onMouseLeave={() => setCategoriesOpen(false)}
						>
							<button
								className={styles.dropdownTrigger}
								onClick={() => setCategoriesOpen((prev) => !prev)}
								aria-expanded={categoriesOpen}
							>
								Categorías
								<FaChevronDown
									className={`${styles.chevron} ${categoriesOpen ? styles.chevronOpen : ''}`}
								/>
							</button>
							{categoriesOpen && (
								<ul className={styles.dropdown}>
									{CATEGORIES_DROPDOWN.map(({ href, label }) => (
										<li key={href}>
											<Link
												href={href}
												onClick={() => {
													setMenuOpen(false);
													setCategoriesOpen(false);
												}}
											>
												{label}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>

						<li>
							<Link href="/tbr" onClick={() => setMenuOpen(false)}>
								Biblioteca
							</Link>
						</li>

						<li>
							<Link
								href="/about-me#contacto"
								onClick={() => setMenuOpen(false)}
							>
								Contacto
							</Link>
						</li>
					</ul>

					<button className={styles.searchBtn} aria-label="Buscar">
						<FaSearch />
					</button>
				</div>
			</nav>
		</header>
	);
}
