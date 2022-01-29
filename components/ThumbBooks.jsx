import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

export const ThumbBooks = ({ title, cover, text, link, date }) => {
	const myLoader = ({ src }) => {
		return `${src}`
	}

	return (
		<div className='w-full p-4'>
			<div className='flex relative height-cover'>
				<picture className='absolute inset-0 w-full h-full object-cover object-center'>
					<Image 
						loader={myLoader}
						alt={title}
						src={cover}
						layout="fill"
						objectFit="cover"
					/>
				</picture>
				<div className='flex flex-col justify-center items-center px-8 py-10 relative z-10 w-full border-4 bg-book-black/70 opacity-0 hover:opacity-100'>
					<h2 className='text-book-white lg:text-2xl mb-4 text-center'>{title}</h2>
					<Link  href={/book/ + link}>
						<a className='border-0 text-center inline-block cursor-pointer px-3 py-2 rounded bg-book-main text-sm tracking-wider font-semibold uppercase text-book-white hover:bg-book-main/85'>
							{text}
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}

ThumbBooks.propTypes = {
	title: PropTypes.string,
	cover: PropTypes.string,
	text: PropTypes.string,
}
