//Components
import React from 'react';
import Image from 'next/image';
import { Layout, Hero, Tabs } from '../../components';
// Config
import { IMAGE_BASE_URL } from '../../config/config';
import imgSep from '../../public/images/separator.png';
import axios from 'axios';

const BookDetail = ({ book }) => {

	console.log(book)
	 
	// for(let icon in book.author.social_networks){
	// 	console.log(icon.icon, 'Hols')
	// }


	return (
		<Layout
			title={`${book.title} by ${book.author.name} ${book.author.surname} | Yolit's Books`}
		>
			<Hero
				bgHero={`${IMAGE_BASE_URL}${book.image_main.path}`}
				titleHero={book.title}
				authorFullName={`${book.author.name} ${book.author.surname}`}
				editorial={book.editorial}
				summary={book.summary}
			/>
			<main className="container mx-auto px-6 py-10 lg:px-12">
				<section>
					<section className="grid lg:grid-cols-12 lg:mt-12">
						{/* Sinopsis and Review */}
						<div className="height-custom flex flex-col lg:col-span-8 shadow-lg">
							<div className="p-6 md:py-6 md:px-10">
								<article className="rounded-b-lg">
									<Tabs
										synopsis={book.synopsis}
										review={book.review.description}
									/>
								</article>
								<div className="mt-8">
									<Image
										src={imgSep}
										alt="Landscape picture"
										width={600}
										height={70}
									/>
								</div>
							</div>
						</div>
						{/* About Author */}
						<aside className="info-author mt-4 py-8 px-5 rounded-xl">
							<div className="w-full">
								<h3 className="text-2xl text-center leading-6 text-book-main sm:mt-8 sm:text-5xl md:text-6xl">
									About the Author
								</h3>
							</div>
							<div className='flex flex-col justify-center items-center mt-10 py-8 px-4 rounded-lg bg-book-lighter sm:mt-12 lg:mt-16"'>
								<div className="mt-4">
									<Image
										src={`${IMAGE_BASE_URL}${book.author.image.path}`}
										alt={`${book.author.name} ${book.author.surname}`}
										width={250}
										height={250}
										className='rounded-full sm:w-full'/>
								</div>
								<div className='mt-8 w-full sm:ml-5'>
									<h3 className='text-3xl text-center leading-9 tracking-wide text-book-main sm:text-4xl'>
										{book.author.name} {book.author.surname}
									</h3>
									<p className='text-sm leading-6 py-6 px-2 mb-0'>
										{book.author.description}
									</p>
									<div className='flex justify-center items-center'>
										{/* {iconsAuthor} */}
									</div>
								</div>
							</div>
						</aside>
					</section>
				</section>
			</main>
		</Layout>
	);
};

export default BookDetail;

export async function getStaticProps({ params }) {
	const settingSlug = {
		method: 'GET',
		headers: {
			'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
			'Content-Type': 'application/json',
		},
	};
	const { data } = await axios(
		`https://admin.yolitsbooks.com/api/v1/book/${params.slug}`,
		settingSlug
	);
	const book = data;

	return { props: { book } };
}

export const getStaticPaths = async () => {
	const settingSlug = {
		method: 'GET',
		headers: {
			'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
			'Content-Type': 'application/json',
		},
	};

	const {
		data: { results },
	} = await axios(
		`http://admin.yolitsbooks.com/api/v1/book/list`,
		settingSlug
	);

	const paths = results.map((book) => {
		return {
			params: { slug: book.slug },
		};
	});

	return {
		paths,
		fallback: false,
	};
};
