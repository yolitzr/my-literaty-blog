import { Fragment } from 'react';
import Head from 'next/head';
// Hooks
import { useHome } from '../hooks/useHome.js';
//Components
import { NavBar } from '../components/NavBar.jsx';
import { Hero } from '../components/Hero.jsx';
import { Grid } from '../components/Grid.jsx';
import { Footer } from '../components/Footer.jsx';
// Images
import imgHero from '../public/images/bg.jpg'

export default function Home() {
	const { booksData } = useHome();

	return (
		<Fragment>
			<Head>
				<title>Amante de los Libros</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<NavBar />
			<Hero
				bgHero={imgHero}
				titleHero="Caro's Bookish"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container mx-auto p-8 lg:py-10 lg:px-14">
				<Grid header="Featured Reviews">
					<h2>Hola</h2>
					

				</Grid>
			</main>
			<Footer
				titleFooter="Caro's Bookish | Copyright ©2021 All rights reserved."
				subTitleFooter="Designed by Yolitzareth Zacarias for CA Designers in Next.js"
			/>
		</Fragment>
	);
}
