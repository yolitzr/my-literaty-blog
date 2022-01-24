import { Layout } from '../components/layout'
// Config
import { IMAGE_BASE_URL } from '../config/config.js'
//Hook
import { useBooks } from '../hooks/useBooks'
//Components
import { Hero, Grid, ThumbBooks } from '../components/'
//Images
import imgHero from '../public/images/bg.jpg'

const ReleasesPage = () => {
	const { releasesData } = useBooks()

	const releaseDate = new Date(releasesData.published)

	return (
		<Layout>
			<Hero
				bgHero={imgHero.src}
				titleHero="Yolit's Bookshelf"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container p-6 mx-auto lg:py-10 lg:px-14">
				<Grid header="The Most-Anticipated Upcoming Book Releases 2022">
					{releasesData?.slice(0, 8)?.map((releasePage) => (
						<ThumbBooks
							key={releasePage?.id}
							cover={`${IMAGE_BASE_URL}${releasePage?.image_main?.path}`}
							title={releasePage?.title}
							link={releasePage?.slug}
							// date={releasePage.published}
							text="Read More"
						/>
					))}
				</Grid>
			</main>
		</Layout>
	)
}

export default ReleasesPage
