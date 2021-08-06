import { Layout } from '../components/layout.jsx';
// Config
import { IMAGE_BASE_URL } from '../config/config.js';
//Hook
import { useBooks } from '../hooks/useBooks'
//Components
import { Hero } from '../components/Hero.jsx'
import { Grid } from '../components/Grid.jsx'
import { ThumbBooks } from '../components/ThumbBooks.jsx';
import { SearchBar } from '../components/SearchBar.jsx';
//Images
import imgHero from '../public/images/bg.jpg';

const ReviewsPage = () => {
    const { reviewsData, search, setSearch } = useBooks();

    return (
		<Layout>
			<Hero
				bgHero={imgHero}
				titleHero="Caro's Bookish"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container mx-auto p-6 lg:py-10 lg:px-14">
				<SearchBar setSearchTerm={setSearch} />
				<Grid header={search ? 'Search Results' : 'List Reviews'}>
					{reviewsData.slice(0, 8).map((reviewPage) => (
						<ThumbBooks
							key={reviewPage.id}
							cover={`${IMAGE_BASE_URL}${reviewPage.image_main.path}`}
						/>
					))}
				</Grid>
			</main>
		</Layout>
	);
}

export default ReviewsPage;