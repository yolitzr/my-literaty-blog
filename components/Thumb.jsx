import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

export const Thumb = ({ title, cover, authorName, authorLastName, text , link}) => {

    // const myLoader = ({src}) => {
    //     return `${src}`
    // }

	return (
		<div className="blur-featured relative w-full mx-auto my-2">
			<div className="h-44 md:h-64 lg:h-80 w-full relative">
				<Image
					// loader={myLoader}
					src={cover}
					alt={title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="absolute bottom-0 z-10 mb-6 ml-6">
				<h2 className="lg:text-3xl text-book-white text-lg font-bold leading-6 tracking-wider">
					{title}
				</h2>
				<h3 className="lg:text-2xl text-book-white mt-1 text-lg font-bold leading-6 tracking-wider">
					{authorName} {authorLastName}
				</h3>
				<Link href={/book/ + link}>
					<a className="md:mt-4 md:text-sm text-book-white bg-book-second hover:bg-book-dark hover:translate-y-1 hover:shadow-xl hover:scale-100 inline-block px-3 py-2 mt-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 transform">
						{text}
					</a>
				</Link>
			</div>
		</div>
	)
}

Thumb.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    authorName: PropTypes.string,
    authorLastName: PropTypes.string,
    text: PropTypes.string,
}