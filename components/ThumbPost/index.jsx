import PropTypes from 'prop-types'
// import Image from 'next/image'
import Link from 'next/link';
// Styles
import './ThumbPost.module.css'

export function ThumbPost({ title, cover, authorName, authorLastName, text }) {
	return (
		<div className="relative w-10/12 my-5 mx-auto md:my-0 blur-featured transition-all duration-200 transform hover:translate-y-1 hover:shadow-xl hover:scale-105">
			{/* <Image
				src={cover}
				alt={title}
				className="w-full h-44 md:h-64 lg:h-80 object-cover"
			/> */}
			<div className="absolute bottom-0 ml-6 mb-6 z-10">
				<h2 className="mt-1 text-lg lg:text-3xl font-bold leading-6 tracking-wider text-book-white">
					{authorName} {authorLastName}
				</h2>
                <Link href="/">
                    <a className="inline-block mt-2 md:mt-4 py-2 px-3 text-xs md:text-sm uppercase tracking-wider text-book-white bg-book-second hover:border-book-neutral hover:text-book-main">{text}</a>
                </Link>
			</div>
		</div>
	);
}

ThumbPost.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    authorName: PropTypes.string,
    authorLastName: PropTypes.string,
    text: PropTypes.string,
}