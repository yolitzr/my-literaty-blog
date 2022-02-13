import { Layout } from '../components/layout.jsx'
// Config
import { IMAGE_BASE_URL } from '../config/config.js'
//Hook
import { useBooks } from '../hooks/useBooks'
//Components
import { Hero, Grid, ThumbBooks, SearchBar } from '../components/'
//Images
import imgHero from '../public/images/bg.jpg'

const ReviewsPage = () => {
    const { reviewsData, search, setSearch } = useBooks()

    return (
			<Layout>
				<Hero
					bgHero={imgHero.src}
					titleHero="Yolit's Books"
					subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
				/>
				<main className="container p-6 mx-auto lg:py-10 lg:px-14">
					<SearchBar setSearchTerm={setSearch} />
					<Grid header={search ? 'Search Results' : 'List Reviews'}>
						{reviewsData?.results?.slice(0, 8)?.map((reviewPage) => (
							<ThumbBooks
							key={reviewPage?.id}
							cover={`${IMAGE_BASE_URL}${reviewPage?.image_main?.path}`}
							title={reviewPage?.title}
							summary={reviewPage?.summary}
							link={reviewPage?.slug}
							// date={releasePage.published}
							text="Read More"
							/>
						))}
					</Grid>
				</main>
			</Layout>
	)
}

export default ReviewsPage