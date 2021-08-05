// Config
import { IMAGE_BASE_URL } from '../config/config.js';
// Hooks
import { useHome } from '../hooks/useHome.js';
//Components
import { Layout } from '../components/layout.jsx';
import { Hero } from '../components/Hero.jsx';
import { Grid } from '../components/Grid.jsx';
import { Thumb } from '../components/Thumb.jsx';
import { ThumbPost } from '../components/ThumbPost.jsx';
import { ThumbBooks } from '../components/ThumbBooks.jsx';
// Images
import imgHero from '../public/images/bg.jpg'

export default function Home() {
	const { featuredData, reviewsData, releasesData } = useHome();

	return (
		<Layout>
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
					{reviewsData.slice(0, 4).map((review) => (
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
				<Grid header="The Most-Anticipated Upcoming Book Releases 2021">
					{releasesData.slice(0, 4).map((release) => (
						<ThumbBooks
							key={release.id}
							cover={`${IMAGE_BASE_URL}${release.image_main.path}`}
						/>
					))}
				</Grid>
			</main>
		</Layout>
	);
}
