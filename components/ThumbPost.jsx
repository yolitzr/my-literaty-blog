import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';

export const ThumbPost = ({ title, authorName,	authorLastName,	editorial,	summary, text, cover, link, authorImg }) => {
	const myLoader = ({ src }) => {
		return `${src}`
	};

	return (
		<article className="flex flex-col flex-wrap w-full max-w-lg mx-auto mt-8 mb-12 rounded-lg border-book-light bg-book-light">
			<figure className="relative object-cover p-8 m-4 transition duration-500 ease-in-out h-80 hover:opacity-95">
				<Image
					loader={myLoader}
					src={cover}
					alt={title}
					layout="fill"
					objectFit="cover"
					className="rounded-lg"
				/>
			</figure>
			<div className="px-6 py-4">
				<Link href={/book/ + link}>
					<a>
						<h2 className="mb-1 text-xl font-bold text-center text-book-main hover:opacity-75">
							{title}
						</h2>
					</a>
				</Link>
				<h4 className="mt-2 text-base font-semibold text-center text-book-neutral">
					{editorial}
				</h4>
				<div className="flex flex-col">
					<div className="h-24">
						<p className="mt-6 text-sm leading-6 tracking-wide text-book-gray special-truncate">
							{summary}
						</p>
					</div>
					<div className="flex mt-4">
						<figure className="relative object-cover h-16 m-2 transition duration-500 ease-in-out hover:opacity-95">
							<Image
								loader={myLoader}
								src={authorImg}
								alt={title}
								width={64}
								height={64}
								objectFit="cover"
								className="w-16 h-16 rounded-full"
							/>
						</figure>
						<div className="flex flex-col justify-center ml-2">
							<span className="font-semibold text-book-dark">
								Author
							</span>
							<Link href={/book/ + link}>
								<a className="mb-1 text-xl font-bold text-center text-book-main hover:opacity-75">
									<h3 className="text-base">
										{authorName} {authorLastName}
									</h3>
								</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center px-6 pt-4 pb-2 mt-4">
					<div className="transition-all duration-200 ease-in-out transform top-3 hover:translate-y-1 hover:scale-100">
						<Link href={/book/ + link}>
							<a className="px-4 py-2 text-sm font-semibold leading-3 tracking-wider uppercase rounded text-book-white bg-book-second">
								{text}
							</a>
						</Link>
					</div>
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
	text: PropTypes.string,
	authorImg: PropTypes.string
};

