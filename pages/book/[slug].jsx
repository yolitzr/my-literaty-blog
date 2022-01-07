//Components
import React from 'react'
import Image from 'next/image'
import { Layout, Hero, Tabs, DisqusComments } from '../../components'
// Config
import { IMAGE_BASE_URL } from '../../config/config'
import imgSep from '../../public/images/separator.png'
import axios from 'axios'

const BookDetail = ({ book }) => {
	console.log(book)
	const date = new Date(book.published.date)

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
					<section className="grid lg:grid-cols-gridTwo lg:mt-12">
						{/* Sinopsis and Review */}
						<div className="height-custom flex flex-col lg:col-span-8 shadow-lg">
							<div className="p-6 md:py-6 md:px-10">
								<article className="rounded-b-lg">
								{book.review === null  
								? <Tabs
										synopsis={book.synopsis}
									/>
								 : <Tabs
										synopsis={book.synopsis}
										review={book.review.description}
									/>
								}
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
							<aside className="info-author mt-4 py-8 px-5 rounded-xl">
								<div className="w-full">
									<h3 className="text-2xl text-center leading-6 text-book-main sm:mt-4 sm:text-5xl md:text-6xl">
										About the Author
									</h3>
								</div>
								<div className='flex flex-col justify-center items-center mt-10 py-4 px-8 rounded-lg bg-book-lighter sm:mt-12 lg:mt-14 lg:flex-row'>
									<div className="mt-4 md:w-2/5 md:mx-auto md:flex md:justify-center">
										<Image
											src={`${IMAGE_BASE_URL}${book.author.image.path}`}
											alt={`${book.author.name} ${book.author.surname}`}
											width={250}
											height={250}
											className='rounded-full sm:w-full lg:rounded-xl'/>
									</div>
									<div className='mt-8 w-full sm:ml-4'>
										<h3 className='text-3xl text-center leading-9  font-bold tracking-wide text-book-main sm:text-4xl'>
											{book.author.name} {book.author.surname}
										</h3>
										<p className='text-sm leading-6 py-6 px-2 mb-0' dangerouslySetInnerHTML={{ __html: book.author.description }} />
										<div className='flex justify-center items-center'>
											{/* {book.author.social_networks.map(icon => {
												{icon.icon}
											})} */}
										</div>
									</div>
								</div>
							</aside>
						</div>
						{/* Cover and Info */}
            <div className="height-custom w-full mt-10 p-6 rounded-xl bg-book-light sm:flex sm:justify-center sm:mt-16 sm:rounded-xl lg:flex-col lg:justify-start lg:col-span-4 lg:ml-5 lg:mt-0 lg:bg-none">
              <div className='sm:flex-col sm:justify-center'>
                <figure>
                  <Image
                      src={`${IMAGE_BASE_URL}${book.image_main.path}`}
                      alt={book.title}
                      width={600}
                      height={900}
                      layout="responsive"
                      className='w-full sm:w-72 lg:w-full'
                    />
                </figure>
								<div className="flex justify-around items-center mt-3 px-12">
									{/* {book.review.star ? (
										<div> hola</div>
									) : null} */}
									{/* <span v-for="star in bookDetails.review.stars" className="fa-2x text-book-main">
											<i  className="fas fa-star"></i>
									</span> */}
								</div>
              </div>

              <div className='w-full mt-10 sm:mt-0 sm:flex sm:flex-col sm:justify-center sm:ml-5 lg:ml-0 lg:py-8 lg:px-4 lg:rounded-md lg:bg-book-light'>
								<div className='mt-2 sm:mt-0'>
									<div className='flex items-center'>
										<i className="fas fa-barcode"></i>
										<span className='font-bold mr-2 ml-3'>ISBN:</span>
										<span className='text-base'>{book.isbn}</span>
									</div>
									<div className='flex items-center'>
										<i className="fas fa-building"></i>
										<span className='font-bold mr-2 ml-3'>Editorial:</span>
										<span className='text-base'>{book.editorial}</span>
									</div>
									<div className='flex items-center'>
										<i className="fas fa-layer-group"></i>
										<span className='font-bold mr-2 ml-3'>Serie:</span>
										<span className='text-base'>{book.serie}</span>
									</div>
									<div className="flex items-center mt-1">
											<i className="far fa-calendar-alt"></i>
											<span className="font-bold mr-2 ml-3">Publication Date:</span>
											<span className="text-base">{`${date.getMonth() + 1} / ${date.getDay() + 1} / ${date.getFullYear() + 1}`}</span>
									</div>
									<div className="flex items-center mt-1">
											<i className="far fa-file"></i>
											<span className="font-bold mr-2 ml-3">N. pages:</span>
											<span className="text-base">{book.pages}</span>
									</div>
								</div>
								<div className='mt-8'>
									<h4 className="text-2xl font-bold text-book-dark">Find this book on:</h4>
									<div className='flex items-center'>
										

									</div>
								</div>
              </div>
            </div>
					</section>
					<section className='relative'>
					<div className="mt-12">
							<h4 className="text-center text-book-main text-2xl font-bold uppercase">Share this book</h4>
							<div className="flex justify-center items-center mt-5">
									<a href="" target="_blank" rel="noreferrer" className="w-10 h-10 mr-3 border-2 border-book-second rounded-full text-book-second hover:bg-book-second hover:text-book-light">
											<i className="fab fa-twitter mt-3 mx-3"></i>
									</a>
									<a href="" className="w-10 h-10 mr-3 border-2 border-book-second rounded-full text-book-second hover:bg-book-second hover:text-book-light">
											<i className="fab fa-pinterest-p mt-3 mx-3"></i>
									</a>
									<a href="" className="w-10 h-10 border-2 border-book-second rounded-full text-book-second hover:bg-book-second hover:text-book-light">
											<i className="fab fa-facebook-f mt-3 mx-3"></i>
									</a>
							</div>
					</div>

						<div className="mt-10 px-8 py-4">
							<h5 className="font-semibold text-center text-book-dark">¡Dare to comment! Blogs feed on comment and I would be happy to read your opinion about this book. Please remember not to spam, so I won't have to delete your comment. ¡I hope to read you soon!</h5>
							<div className="mt-10">
										<DisqusComments
											post={book}
										/>
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

export default BookDetail;
