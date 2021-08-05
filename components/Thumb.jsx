import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';

export const Thumb = ({ title, cover, authorName, authorLastName, text }) => {

    const myLoader = ({src}) => {
        return `${src}`;
    }

	return (
		<div className="relative w-full my-2 mx-auto blur-featured transition-all duration-200 transform hover:translate-y-1 hover:shadow-xl hover:scale-105">
			<div className="w-full h-44 md:h-64 lg:h-80">
				<Image
					loader={myLoader}
					src={cover}
					alt={title}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="absolute bottom-0 ml-6 mb-6 z-10">
				<h2 className="text-lg lg:text-3xl font-bold leading-6 tracking-wider text-book-white">
					{title}
				</h2>
				<h3 className="mt-1 text-lg lg:text-2xl font-bold leading-6 tracking-wider text-book-white">
					{authorName} {authorLastName}
				</h3>
				<Link href="/">
					<a className="inline-block mt-2 md:mt-4 py-2 px-3 text-xs md:text-sm uppercase tracking-wider text-book-white bg-book-second hover:border-book-neutral hover:text-book-main">
						{text}
					</a>
				</Link>
			</div>
		</div>
	);
}

Thumb.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    authorName: PropTypes.string,
    authorLastName: PropTypes.string,
    text: PropTypes.string,
}