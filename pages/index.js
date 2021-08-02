import { Fragment } from 'react';
import Head from 'next/head';
//Components
import { NavBar } from '../components/NavBar.jsx';
import { Hero } from '../components/Hero.jsx';
// Images
import imgHero from '../public/images/bg.jpg'

export default function Home() {
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
		</Fragment>
	);
}
