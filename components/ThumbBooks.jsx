import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

export const ThumbBooks = ({ title, cover, text, link }) => {
	const myLoader = ({ src }) => {
		return `${src}`
	}

	return (
		<div className="content mt-6 transition-all duration-200 transform hover:translate-y-1 hover:shadow-xl hover:scale-95">
			<div className="content-overlay"></div>
			<div className="p-1">
				<figure className="w-full height-cover">
					<Image
						loader={myLoader}
						src={cover}
						alt={title}
						layout="fill"
						objectFit="cover"
					/>
				</figure>
				<div className="content-details fadeIn-top">
					<Link href={/book/ + link}>
						<a>
							<h2 className="text-2xl font-bold leading-8 uppercase text-book-white">
								{title}
							</h2>
						</a>
					</Link>
					<div className="mt-2">
						<span className="mr-2 ml-3 font-semibold text-book-light">
							Publication Date:
						</span>
					</div>
					<div className="border-0 text-center inline-block cursor-pointer px-3 py-1 rounded bg-book-second mt-4">
						<Link href={/book/ + link}>
							<a className="text-basse tracking-wide uppercase text-book-white">
								{text}
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

ThumbBooks.propTypes = {
	title: PropTypes.string,
	cover: PropTypes.string,
	text: PropTypes.string,
}
