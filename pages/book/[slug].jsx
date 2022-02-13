//Components
import React from 'react'
import Image from 'next/image'
import { Layout, Hero, Tabs, DisqusComments, AdBanner } from '../../components'
// Config
import { IMAGE_BASE_URL } from '../../config/config'
import imgSep from '../../public/images/separator.png'
import axios from 'axios'


function renderStars(stars) {
	var indents = [];
	for (let i = 0; i < stars; i++) {
		indents.push(<i className="fas fa-star"></i>)
	}
	return (
		<span className="fa-2x text-book-main">
			{indents}
		</span>
	)
}

const BookDetail = ({ book }) => {
	const date = new Date(book?.published?.date)
	const stars = renderStars(book?.review?.stars)
	
	return (
		<Layout
			title={`${book?.title} by ${book?.author?.name} ${book?.author?.surname} | Yolit's Books`}
		>
			<Hero
				bgHero={`${IMAGE_BASE_URL}${book?.image_main?.path}`}
				titleHero={book?.title}
				authorFullName={`${book?.author?.name} ${book?.author?.surname}`}
				editorial={book?.editorial}
				summary={book?.summary}
			/>
			<main className="container px-4 py-10 mx-auto lg:px-12">
				<section>
					<section className="grid lg:grid-cols-gridTwo lg:mt-12">
						{/* Sinopsis and Review */}
						<div className="flex flex-col md:shadow-lg height-custom lg:col-span-8">
							<div className="p-4 md:py-6 md:px-10">
								<article className="rounded-b-lg">
									{book?.review !== null ? (
										<Tabs
											tabOne={book?.synopsis}
											tabTwo={book?.review?.description}
											tabNameOne="Synopsis"
											tabNameTwo="My Review"
										/>
									) : (
										<Tabs
											tabOne={book?.synopsis}
											tabNameOne="Synopsis"
										/>
									)}
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
							{/* About Author */}
							<aside className="px-5 py-8 mt-4 info-author rounded-xl">
								<div className="w-full">
									<h3 className="text-2xl leading-6 text-center text-book-main sm:mt-4 sm:text-5xl md:text-6xl">
										About the Author
									</h3>
								</div>
								<div className="flex flex-col items-center justify-center px-6 py-4 mt-10 rounded-lg bg-book-lighter sm:mt-12 lg:mt-14 lg:flex-row">
									<div className="mt-4 md:w-2/5 md:mx-auto md:flex md:justify-center">
										<Image
											src={`${IMAGE_BASE_URL}${book?.author?.image?.path}`}
											alt={`${book?.author?.name} ${book?.author?.surname}`}
											width={250}
											height={250}
											className="rounded-full sm:w-full lg:rounded-xl"
										/>
									</div>
									<div className="w-full mt-8 sm:ml-4">
										<h3 className="text-3xl font-bold leading-9 tracking-wide text-center text-book-main sm:text-4xl">
											{book?.author?.name} {book?.author?.surname}
										</h3>
										<p
											className="px-2 py-6 mb-0 text-sm leading-6"
											dangerouslySetInnerHTML={{__html: book.author.description}}
										/>
										<div className="flex items-center justify-center">
											{Object?.keys(book?.author?.social_networks)?.map((social, idx) => (
												<a 
													href={book?.author?.social_networks[social]?.url}
													key={idx}
													className="w-10 h-10 mr-3 border-2 rounded-full border-book-second text-book-second hover:bg-book-second hover:text-book-light"
												>
													<i className={`${book?.author?.social_networks[social]?.icon} ${`flex justify-center mt-1 text-lg`}`}></i>
												</a>
											))}
										</div>
									</div>
								</div>
							</aside>
						</div>
						{/* Cover and Info */}
						<div className="w-full p-6 mt-10 height-custom rounded-xl bg-book-light sm:flex sm:justify-center sm:mt-16 sm:rounded-xl lg:flex-col lg:justify-start lg:col-span-4 lg:ml-5 lg:mt-0 lg:bg-none">
							<div className="sm:flex-col sm:justify-center">
								<figure>
									<Image
										src={`${IMAGE_BASE_URL}${book?.image_main?.path}`}
										alt={book?.title}
										width={600}
										height={900}
										layout="responsive"
										className="w-full sm:w-72 lg:w-full"
									/>
								</figure>
								<div className="flex items-center justify-around px-12 mt-3">
									{book?.review !== null ? stars : null}
								</div>
							</div>

							<div className="w-full mt-10 sm:mt-0 sm:flex sm:flex-col sm:justify-center sm:ml-5 lg:ml-0 lg:py-8 lg:px-4 lg:rounded-md lg:bg-book-light">
								<div className="mt-2 sm:mt-0">
									<div className="flex items-center">
										<i className="fas fa-barcode"></i>
										<span className="ml-3 mr-2 font-semibold">
											ISBN:
										</span>
										<span className="text-base text-book-gray">
											{book?.isbn}
										</span>
									</div>
									<div className="flex items-center">
										<i className="fas fa-building"></i>
										<span className="ml-3 mr-2 font-semibold">
											Editorial:
										</span>
										<span className="text-base text-book-gray">
											{book?.editorial}
										</span>
									</div>
									<div className="flex items-center">
										<i className="fas fa-layer-group"></i>
										<span className="ml-3 mr-2 font-semibold">
											Serie:
										</span>
										<span className="text-base text-book-gray">
											{book?.serie}
										</span>
									</div>
									<div className="flex items-center mt-1">
										<i className="far fa-calendar-alt"></i>
										<span className="ml-3 mr-2 font-semibold">
											Publication Date:
										</span>
										<span className="text-base text-book-gray">{`${date?.getMonth() + 1} / ${date?.getDay() + 1} / ${date?.getFullYear() + 1}`}</span>
									</div>
									<div className="flex items-center mt-1">
										<i className="far fa-file"></i>
										<span className="ml-3 mr-2 font-semibold">
											N. pages:
										</span>
										<span className="text-base text-book-gray">
											{book?.pages}
										</span>
									</div>
								</div>
								<div className="mt-8">
									<h4 className="text-2xl font-bold text-book-dark">
										Find this book on:
									</h4>
									<div className="flex items-center">
										{Object.keys(book?.purchases)?.map((purchase, idx) => (
												<a 
													href={book?.purchases[purchase]?.url}
													key={idx}
													target="_blank"
													rel="noreferrer"
													className="flex items-center px-3 py-3 mt-4 mr-2 text-sm tracking-wide border-2 rounded-full border-book-second text-book-second hover:bg-book-second hover:text-book-light"
												>
													<i className={`${book?.purchases[purchase]?.icon} ${`fa-lg`}`}></i>
												</a>
											))}
									</div>
								</div>
							</div>

							{/* <AdBanner /> */}
						</div>
					</section>
					<section className="relative">
						<div className="mt-12">
							<h4 className="text-2xl font-bold text-center uppercase text-book-main">
								Share this book
							</h4>
							<div className="flex items-center justify-center mt-5">
								<a
									href=""
									target="_blank"
									rel="noreferrer"
									className="w-10 h-10 mr-3 border-2 rounded-full border-book-second text-book-second hover:bg-book-second hover:text-book-light"
								>
									<i className="mx-3 mt-3 fab fa-twitter"></i>
								</a>
								<a
									href=""
									className="w-10 h-10 mr-3 border-2 rounded-full border-book-second text-book-second hover:bg-book-second hover:text-book-light"
								>
									<i className="mx-3 mt-3 fab fa-pinterest-p"></i>
								</a>
								<a
									href=""
									className="w-10 h-10 border-2 rounded-full border-book-second text-book-second hover:bg-book-second hover:text-book-light"
								>
									<i className="mx-3 mt-3 fab fa-facebook-f"></i>
								</a>
							</div>
						</div>

						<div className="px-8 py-4 mt-10">
							<h5 className="font-semibold text-center text-book-dark">
								¡Dare to comment! Blogs feed on comment and I
								would be happy to read your opinion about this
								book. Please remember not to spam, so I won`t
								have to delete your comment. ¡I hope to read you
								soon!
							</h5>
							<div className="mt-10">
								<DisqusComments post={book} />
							</div>
						</div>
					</section>
				</section>
			</main>
		</Layout>
	)
}

export async function getServerSideProps({ params }) {

	const settingSlug = {
		method: 'GET',
		headers: {
			'X-AUTH-TOKEN': process.env.NEXT_PUBLIC_API_KEY,
			'Content-Type': 'application/json',
		}
	}

	const { data } = await axios(`https://admin.yolitsbooks.com/api/v1/book/${params.slug}`,settingSlug)

	const book = data

  // Pass data to the page via props
  return { props: { book } }
}

export default BookDetail
