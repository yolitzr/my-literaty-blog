import { Layout } from '../components/layout'
// Config
import { IMAGE_BASE_URL } from '../config/config.js';
//Components
import { Hero } from '../components/Hero.jsx'
//Images
import imgHero from '../public/images/bg.jpg';

const ReleasesPage = () => {
    return (
		<Layout>
			<Hero
				bgHero={imgHero}
				titleHero="Caro's Bookish"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
		</Layout>
	);
}

export default ReleasesPage