import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getGenresDetails, getBookGenreID } from '../../config/api';
import { Layout, Hero } from '../../components';
import imgHero from '../../public/images/bg.jpg';

const GenresDetail = () => {
	const router = useRouter();
	const genreID = router.query?.id;

	const { data: genre } = useQuery(['genre', genreID], () =>
		getGenresDetails(genreID)
	);

	const { data } = useQuery(['bookGenre', genre], () => getBookGenreID(genre));

	// const { data: image } = useQuery(['image', genre], getImage(genre));

	// console.log(image);

	return (
		<Layout title={`${genre?.name} | Yolit's Books`}>
			<Hero
				bgHero={imgHero.src}
				titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container p-6 mx-auto lg:py-10 lg:px-14">
				<section className="flex flex-wrap -m-4">
					{data?.map((genre) => (
						<div key={genre.id} className="xl:w-1/4 md:w-1/2 p-4">
							<div className="p-6 rounded-lg">
								{/* <Image src{genre.}/> */}
								{/* <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content"> */}
								<h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
									{genre?.editorial}
								</h3>
								<h2 className="text-lg text-gray-900 font-medium title-font mb-4">
									{genre.title}
								</h2>
								<p className="leading-relaxed text-base special-truncate">
									{genre.summary}
								</p>
							</div>
						</div>
					))}
				</section>
			</main>
		</Layout>
	);
};

export async function getServerSideProps({ params }) {
	const id = params?.id;
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['genre', id], () => getGenresDetails(id));

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default GenresDetail;
