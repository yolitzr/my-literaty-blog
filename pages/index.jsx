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
	ThumbReviews,
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
			<main className="lg:py-10 lg:px-14 container py-8 px-4 mx-auto">
				<section className="md:py-10 py-5">
					<h3 className="md:text-4xl text-book-main mt-6 text-3xl font-bold tracking-wider text-left uppercase">
						Featured Releases
					</h3>
					<div className="gri-cols-1 md:grid-cols-fit-320 lg:gap-3 grid gap-2 mt-6">
						{featured?.results
							?.map((book) => (
								<ThumbFeatured
									key={book?.id}
									cover={`${IMAGE_BASE_URL}${book?.image_main?.path}`}
									title={book?.title}
									authorName={book?.author?.name}
									authorLastName={book?.author?.surname}
									link={book?.slug}
								/>
							))
							.splice(0, 4)}
					</div>
				</section>
				<section className="h-full grid gap-4 lg:grid-cols-gridTwo px-4">
					<section className="lg:col-span-8">
						<h3 className="md:text-4xl text-book-main mt-6 text-3xl font-semibold text-left uppercase">
							Most Recent Post
						</h3>
						<div className="block mt-6 px-4">
							{data?.results?.slice(0, 4)?.map((review) => (
								<ThumbReviews
									key={review?.id}
									cover={`${IMAGE_BASE_URL}${review?.image_main?.path}`}
									title={review?.title}
									authorName={review?.author?.name}
									authorLastname={review?.author?.surname}
									editorial={review?.editorial}
									preview={review?.summary}
									link={review?.slug}
									text="Read More"
								/>
							))}
						</div>
					</section>
					<aside className="lg:col-span-4">right</aside>
				</section>
				{/* <Grid header="Lastet Reviews">
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
				</Grid> */}
			</main>
		</Layout>
	);
}
