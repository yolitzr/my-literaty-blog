import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';

export function ThumbPost({ title, authorName,	authorLastName,	editorial,	summary, text, cover,}) {
	const myLoader = ({ src }) => {
		return `${src}`;
	};

	return (
		<article className="flex flex-wrap flex-col w-full max-w-lg mx-auto mt-20 mb-12 border-book-light rounded-lg bg-book-light">
			<figure className=" relative w-full h-80 -mt-14 p-8 object-cover transition duration-500 ease-in-out hover:opacity-95">
				<Image
					loader={myLoader}
					src={cover}
					alt={title}
					layout="fill"
					objectFit="cover"
					className="rounded-t-lg"
				/>
			</figure>
			<div className="py-4 px-6 mt-4">
				<Link href="/">
					<a>
						<h2 className="mb-1 text-2xl font-bold text-center text-book-main hover:opacity-75">
							{title}
						</h2>
					</a>
				</Link>
				<Link href="/">
					<a className="mb-1 text-xl font-bold text-center text-book-main hover:opacity-75">
						<h3>
							{authorName} {authorLastName}
						</h3>
					</a>
				</Link>
				<h4 className="mt-1 text-base font-semibold text-center text-book-neutral">
					{editorial}
				</h4>
				<div className="h-44 p-3">
					<p className="mt-6 text-base text-book-gray">{summary}</p>
				</div>
			</div>
			<div className="px-6 pt-4 pb-2 relative flex justify-center items-center">
				<div className="absolute top-3 transition-all duration-200 ease-in-out transform hover:translate-y-1 hover:scale-105">
					<Link href="/">
						<a className="px-6 py-3 text-sm font-bold leading-3 tracking-wider uppercase text-book-white bg-book-second">
							{text}
						</a>
					</Link>
				</div>
			</div>
		</article>

	);
}

ThumbPost.propTypes = {
	title: PropTypes.string,
	cover: PropTypes.string,
	authorName: PropTypes.string,
	authorLastName: PropTypes.string,
	editorial: PropTypes.string,
	text: PropTypes.string
};

