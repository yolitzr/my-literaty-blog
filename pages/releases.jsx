import { Layout } from '../components/layout';
// Config
import { BASE_URL } from '../config/config.js';
import { apiSettings } from '../config/api.js';
//Components
import { Hero, Grid, ThumbBooks } from '../components/';
//Images
import imgHero from '../public/images/bg.jpg';

const ReleasesPage = ({ releaseData }) => {
	console.log(releaseData);
	// const releaseDate = new Date(releasesData.published)

	return (
		<Layout>
			<Hero
				bgHero={imgHero.src}
				titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container p-6 mx-auto lg:py-10 lg:px-14">
				<Grid header="The Most-Anticipated Upcoming Book Releases 2022">
					{releaseData?.results?.slice(0, 8)?.map((releasePage) => (
						<ThumbBooks
							key={releasePage?.id}
							cover={`${BASE_URL}${releasePage?.image_main?.path}`}
							title={releasePage?.title}
							summary={releasePage?.summary}
							link={releasePage?.slug}
							// date={releasePage.published}
							text="Read More"
						/>
					))}
				</Grid>
			</main>
		</Layout>
	);
};

export async function getServerSideProps() {
	const releaseData = await apiSettings.fetchBooks({
		search: [
			{
				field: ['book.published'],
				operator: '>=',
				value: '2022-01-01',
			},
		],
	});

	// Pass data to the page via props
	return { props: { releaseData } };
}

export default ReleasesPage;
