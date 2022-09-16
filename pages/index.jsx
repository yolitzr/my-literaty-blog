import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { IMAGE_BASE_URL } from '../config/config.js';
import {
	Layout,
	Hero,
	Grid,
	Thumb,
	ThumbPost,
	ThumbBooks,
	ThumbFeatured,
} from '../components/';
import imgHero from '../public/images/bg.jpg';
import { getBooks } from '../config/api.js';
import { getFeaturedBooks, getAnticipatedBooks } from '../hooks/useHome.js';

export default function Home() {
	const bodyReviews = {
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
	};

	const { data } = useQuery(['reviews', bodyReviews], () =>
		getBooks(bodyReviews)
	);

	const { data: featured } = useQuery(['featured'], getFeaturedBooks);
	const { data: published } = useQuery(['published'], getAnticipatedBooks);

	return (
		<Layout>
			<Hero
				bgHero={imgHero.src}
				titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="lg:py-10 lg:px-14 container p-8 mx-auto">
				<Grid header="Featured Releases">
					{featured?.results
						?.map((book) => (
							<Thumb
								key={book?.id}
								cover={`${IMAGE_BASE_URL}${book?.image_main?.path}`}
								title={book?.title}
								authorName={book?.author?.name}
								authorLastName={book?.author?.surname}
								link={book?.slug}
								text="Read More"
							/>
						))
						.splice(0, 4)}
				</Grid>
				<Grid header="Lastet Reviews">
					{data?.results?.slice(0, 4)?.map((review) => (
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
				<ThumbFeatured />
			</main>
		</Layout>
	);
}

export async function getServerSideProps() {
	const bodyReviews = {
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
	};
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['reviews', bodyReviews], () =>
		getBooks(bodyReviews)
	);

	await queryClient.prefetchQuery(['featured'], getFeaturedBooks);
	await queryClient.prefetchQuery(['featured'], getAnticipatedBooks);

	return {
		props: {
			dehydrateState: dehydrate(queryClient),
		},
	};
}
