import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

export const ThumbReviews = ({
	cover,
	title,
	authorName,
	authorLastname,
	editorial,
	preview,
	link,
	text,
}) => (
	<article className="flex flex-col lg:flex-row my-12 max-w-4xl h-full">
		<Link href={/book/ + link}>
			<a className="block w-full">
				<figure className="relative rounded-md w-full h-80 ">
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
		<div className="w-3/4 flex flex-col gap-2 justify-center items-start mt-4 lg:mt-0 lg:pl-8">
			<h4 className="mt-2 text-base font-semibold text-center text-book-neutral">
				{editorial}
			</h4>
			<div className="mx-0">
				<Link href={/book/ + link}>
					<a>
						<h2 className="mt-2 mb-1 text-xl font-bold text-book-main hover:opacity-75">
							{title}
						</h2>
					</a>
				</Link>
				<h3 className="text-md text-book-dark">
					{authorName} {authorLastname}
				</h3>
			</div>
			<div className="mx-0 my-4">
				<p className="mb-0 text-sm leading-6 special-truncate">{preview}</p>
			</div>
			<div className="mx-0 mt-2">
				<Link href={/book/ + link}>
					<a className="text-sm font-semibold leading-3 tracking-wider uppercase rounded text-book-second hover:text-book-main">
						{text}
					</a>
				</Link>
			</div>
		</div>
	</article>
);

ThumbReviews.PropTypes = {
	title: PropTypes.string,
	cover: PropTypes.string,
	authorName: PropTypes.string,
	authorLastname: PropTypes.string,
	editorial: PropTypes.string,
	link: PropTypes.string,
	preview: PropTypes.string,
	text: PropTypes.string,
};
