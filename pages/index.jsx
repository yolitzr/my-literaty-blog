// Config
import { IMAGE_BASE_URL } from '../config/config.js'
//Components
import { Layout, Hero, Grid, Thumb, ThumbPost, ThumbBooks } from '../components/'
// Images
import imgHero from '../public/images/bg.jpg'
import { apiSettings } from '../config/api.js'

export default function Home({ featured, reviews, published }) {
	return (
		<Layout>
			<Hero
				bgHero={imgHero.src}
				titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="lg:py-10 lg:px-14 container p-8 mx-auto">
				<Grid header="Featured Releases">
					{featured?.results?.map((book) => (
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
					{reviews?.results?.slice(0,4)?.map((review) => (
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
				{/* <Subscribe /> */}
				<Grid header="The Most-Anticipated Upcoming Book Releases 2022">
					{published?.results?.slice(0, 4)?.map((release) => (
						<ThumbBooks
							key={release?.id}
							cover={`${IMAGE_BASE_URL}${release?.image_main?.path}`}
							title={release?.title}
							summary={release.summary}
							link={release?.slug}
							text="Read More"
						/>
					))}
				</Grid>
			</main>
		</Layout>
	);
}

export async function getServerSideProps() {
	const featured  = await apiSettings.fetchBooks({
		order: {
			field: 'book.id',
			dir: 'desc',
		},
		search: [
			{
				field: ['book.is_featured'],
				operator: '=',
				value: true,
			},
		],
	})

	const reviews  = await apiSettings.fetchBooks({
		order: {
			field: 'book.id',
			dir: 'desc',
		},
		search: [
			{
				field: ['review.id'],
				operator: 'isNotNull',
				value: null,
			},
		],
	})

	const published  = await apiSettings.fetchBooks({
		order: {
			field: 'book.id',
			dir: 'desc',
		},
		search: [
			{
				field: ['book.published'],
				operator: '>=',
				value: '2022-01-01',
			},
		],
	})

  // Pass data to the page via props
  return { props: { featured, reviews, published } }
}
