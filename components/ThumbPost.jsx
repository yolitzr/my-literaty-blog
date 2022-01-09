import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link';

export const ThumbPost = ({ title, authorName,	authorLastName,	editorial,	summary, text, cover, link, authorImg }) => {
	const myLoader = ({ src }) => {
		return `${src}`
	};

	return (
		<article className="flex flex-wrap flex-col w-full max-w-lg mx-auto mt-8 mb-12 border-book-light rounded-lg bg-book-light">
			<figure className=" relative h-80 p-8 m-4 object-cover transition duration-500 ease-in-out hover:opacity-95">
				<Image
					loader={myLoader}
					src={cover}
					alt={title}
					layout="fill"
					objectFit="cover"
					className="rounded-lg"
				/>
			</figure>
			<div className="py-4 px-6">
				<Link href={/book/ + link}>
					<a>
						<h2 className="mb-1 text-2xl font-bold text-center text-book-main hover:opacity-75">
							{title}
						</h2>
					</a>
				</Link>
				<h4 className="mt-1 text-base font-semibold text-center text-book-neutral">
					{editorial}
				</h4>
				<div className="flex flex-col">
					<div className='h-24'>
						<p className="mt-6 text-sm text-book-gray tracking-wide leading-6 special-truncate">{summary}</p>
					</div>
					<div className="flex mt-4">
						<figure className='relative h-16 m-2 object-cover transition duration-500 ease-in-out hover:opacity-95'>
							<Image
								loader={myLoader}
								src={authorImg}
								alt={title}
								width={64}
								height={64}
								objectFit="cover"
								className="rounded-full w-16 h-16"
							/>
						</figure>
						<div className='flex flex-col justify-center ml-2'>
							<span className=' text-book-dark font-semibold'>Author</span>
							<Link href={/book/ + link}>
								<a className="mb-1 text-xl font-bold text-center text-book-main hover:opacity-75">
									<h3 className='text-base'>
										{authorName} {authorLastName}
									</h3>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="px-6 pt-4 pb-2 relative flex justify-center items-center">
				<div className="absolute top-3 transition-all duration-200 ease-in-out transform hover:translate-y-1 hover:scale-105">
					<Link href={/book/ + link}>
						<a className="px-6 py-3 text-sm font-bold leading-3 tracking-wider uppercase text-book-white bg-book-second">
							{text}
						</a>
					</Link>
				</div>
			</div>
		</article>
	)
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

