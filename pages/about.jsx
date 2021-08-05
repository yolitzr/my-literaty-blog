import Image from 'next/image'
import { Layout } from '../components/layout.jsx'
//Data
import data from '../data/about.json'
//Components
import { Hero } from '../components/Hero.jsx'
//Images
import imgHero from '../public/images/bg.jpg';
import imgMe from '../public/images/me.jpg'

const AboutPage = () => {

	const myLoader = ({ src }) => {
		return `${src}`;
	};

	return (
		<Layout title="About Me">
			<Hero
				bgHero={imgHero}
				titleHero="Caro's Bookish"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
			/>
			<main className="container mx-auto p-8 lg:py-10 lg:px-14">
				<section className="py-16">
					<h3 className="text-4xl font-bold text-center leading-6 uppercase tracking-wide text-book-main">
						{data.about.title}
					</h3>
					<div className="flex flex-wrap justify-center items-center">
						<figure className="mt-12">
							<Image
								alt="Yolitzareth Zacarias"
								src={imgMe}
								width="300"
								height="300"
								className="w-64 border-4 border-book-dark rounded-full"
							/>
						</figure>
						<div>
							<p className="text-book-gray mt-6">
								¡Hi!, I am Yolit , a girl Venezuelan and lover
								of books, I’ve been passionate about reading for
								years, the books have been my warm refuge, that
								place where I can enjoy a thousand emotions. I
								always read romantic novels, in all their
								subgenres, erotic, suspense, etc. I am also very
								fond of Thriller and Noir Novel. Little by
								little I have been testing with other genres,
								such as Young Adult, New Adult and Fantasy.
								<br />
								<br />
								For a long time I have liked to share my reviews
								of the books I have read, but I have always
								written them in Spanish, now as I am studying
								English, I encouraged not only to share my
								reviews in this language but to read those books
								I have always wanted and review them.
								<br />
								<br />I hope everyone feels comfortable in my
								new little blog and please forgive me if I have
								any mistakes in my grammar, I am still learning
								and looking forward to improving.
							</p>
							{/* <div className="relative flex justify-center items-center gap-4 mt-8">
								{data.about.images.map((image, i) => (
									<Image
										loader={myLoader}
										key={i}
										alt={image.imgAlt}
										src={image.imgUrl}
										layout="fill"
										objectFit="cover"
									/>
								))}
							</div> */}
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default AboutPage;
