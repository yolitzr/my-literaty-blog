import { Fragment } from 'react';
import Head from 'next/head';
// Config
import { IMAGE_BASE_URL } from '../config/config.js';
// Hooks
import { useHome } from '../hooks/useHome.js';
//Components
import { NavBar } from '../components/NavBar.jsx';
import { Hero } from '../components/Hero.jsx';
import { Grid } from '../components/Grid.jsx';
import { Thumb } from '../components/Thumb.jsx';
import { ThumbPost } from '../components/ThumbPost.jsx';
import { Footer } from '../components/Footer.jsx';
// Images
import imgHero from '../public/images/bg.jpg'

export default function Home() {
	const { featuredData, reviewsData } = useHome();

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
					{featuredData.map((book) => (
						<Thumb
							key={book.id}
							cover={`${IMAGE_BASE_URL}${book.image_main.path}`}
							title={book.title}
							authorName={book.author.name}
							authorLastName={book.author.surname}
							text="Read More"
						/>
					))}
				</Grid>
				<Grid header="Lastet Reviews">
					{reviewsData.slice(0, 6).map((review) => (
						<ThumbPost
							key={review.id}
							cover={`${IMAGE_BASE_URL}${review.image_main.path}`}
							title={review.title}
							authorName={review.author.name}
							authorLastName={review.author.surname}
							editorial={review.editorial}
							summary={review.summary}
							text="Read More"
						/>
					))}
				</Grid>
			</main>
			<Footer
				titleFooter="Caro's Bookish | Copyright ©2021 All rights reserved."
				subTitleFooter="Designed by Yolitzareth Zacarias for CA Designers in Next.js"
			/>
		</Fragment>
	);
}
