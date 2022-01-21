import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

export const ThumbBooks = ({ title, cover, text, link, date }) => {
	const myLoader = ({ src }) => {
		return `${src}`
	}

	return (
		<div className='flex flex-col px-4 py-6 w-full mx-auto'>
			<Link href={/book/ + link}>
				<a className='flex flex-col flex-1 w-full rounded overflow-hidden shadow-lg'>
					<div className='relative w-full h-98 overflow-hidden height-cover' >
						<Image 
							loader={myLoader}
							alt={title}
							src={cover}
							layout="fill"
							objectFit="cover"
						/>
						<div className='flex justify-between items-center w-full absolute bottom-0 text-white p-4 font-bold border-b-8 border-book-second h-20 bg-book-main opacity-90'>
							<div className='flex flex-col'>
								<h2 className="text-book-white lg:text-lg">{title}</h2>
								<span>{date}</span>
							</div>
							<div className="border-0 text-center inline-block cursor-pointer px-3 py-1 rounded bg-book-second">
								<Link href={/book/ + link}>
									<a className="text-sm tracking-wide uppercase text-book-white">
										{text}
									</a>
								</Link>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</div>
	)
}

ThumbBooks.propTypes = {
	title: PropTypes.string,
	cover: PropTypes.string,
	text: PropTypes.string,
}
