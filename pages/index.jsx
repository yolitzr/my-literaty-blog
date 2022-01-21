// Config
import { IMAGE_BASE_URL } from '../config/config.js'
// Hooks
import { useBooks } from '../hooks/useBooks.js'
//Components
import { Layout, Hero, Grid, Thumb, ThumbPost, ThumbBooks, Subscribe } from '../components/'
// Images
import imgHero from '../public/images/bg.jpg'

export default function Home() {
	const { featuredData, reviewsData, releasesData } = useBooks()

	return (
		<Layout>
			<Hero
				bgHero={imgHero}
				titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container p-8 mx-auto lg:py-10 lg:px-14">
				<Grid header="Featured Releases">
					{featuredData?.map((book) => (
						<Thumb
							key={book?.id}
							cover={`${IMAGE_BASE_URL}${book?.image_main?.path}`}
							title={book?.title}
							authorName={book?.author?.name}
							authorLastName={book?.author?.surname}
							link={book?.slug}
							text="Read More"
						/>
					)).splice(0, 4)}
				</Grid>
				<Grid header="Lastet Reviews">
					{reviewsData?.slice(0, 4)?.map((review) => (
						<ThumbPost
							key={review?.id}
							cover={`${IMAGE_BASE_URL}${review?.image_main?.path}`}
							title={review?.title}
							authorName={review?.author?.name}
							authorLastName={review?.author?.surname}
							authorImg={`${IMAGE_BASE_URL}${review?.author?.image?.path}`}
							editorial={review?.editorial}
							summary={review?.summary}
							link={review?.slug}
							text="Read More"
						/>
					))}
				</Grid>
				<Subscribe />
				{/* <Wrapper>
						<div>
							Hola
						</div>
				</Wrapper> */}
				<Grid header="The Most-Anticipated Upcoming Book Releases 2022">
					{releasesData?.slice(0, 4)?.map((release) => (
						<ThumbBooks
							key={release?.id}
							cover={`${IMAGE_BASE_URL}${release?.image_main?.path}`}
							title={release?.title}
							link={release?.slug}
							text="Read More"
						/>
					))}
				</Grid>
			</main>
		</Layout>
	)
}
