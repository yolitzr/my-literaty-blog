import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../config/config.js';
import { getAnticipatedBooks } from '../hooks/useHome';
import { getDate } from '../lib/helpers.js';
import { Layout } from '../components/layout';
import { Hero, Grid, ThumbBooks } from '../components/';
import imgHero from '../public/images/bg.jpg';

const ReleasesPage = () => {
	const { data } = useQuery(['published'], getAnticipatedBooks);

	return (
		<Layout>
			<Hero
				bgHero={imgHero.src}
				titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container p-6 mx-auto lg:py-10 lg:px-14">
				<Grid header="The Most-Anticipated Upcoming Book Releases 2022">
					{data?.results?.slice(0, 8)?.map((releasePage) => (
						<ThumbBooks
							key={releasePage?.id}
							cover={`${BASE_URL}${releasePage?.image_main?.path}`}
							title={releasePage?.title}
							summary={releasePage?.summary}
							link={releasePage?.slug}
							date={getDate(releasePage.published.date)}
							text="Read More"
						/>
					))}
				</Grid>
			</main>
		</Layout>
	);
};

export default ReleasesPage;
