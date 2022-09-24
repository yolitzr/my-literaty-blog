import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

export const ThumbFeatured = ({
	cover,
	title,
	authorName,
	authorLastName,
	link,
}) => (
	<div className="relative w-full h-full mx-auto my-2">
		<Link href={/book/ + link}>
			<a>
				<figure className="blur-featured relative w-full h-72 md:h-80 lg:h-96 transform hover:scale-95 duration-500 ease-in-out">
					<Image
						src={cover}
						alt={title}
						layout="fill"
						objectFit="cover"
						className="rounded-md"
					/>
				</figure>
			</a>
		</Link>
		<div className="flex flex-col items-center mt-2">
			<Link href={/book/ + link}>
				<a>
					<h2 className="lg:text-xl text-book-gray text-md font-bold leading-6 tracking-wider hover:text-book-main">
						{title}
					</h2>
				</a>
			</Link>
			<h3 className="lg:text-md text-book-gray text-sm font-normal leading-6 tracking-wider">
				{authorName} {authorLastName}
			</h3>
		</div>
	</div>
);

ThumbFeatured.propTypes = {
	title: PropTypes.string,
	cover: PropTypes.string,
	authorName: PropTypes.string,
	authorLastName: PropTypes.string,
};
