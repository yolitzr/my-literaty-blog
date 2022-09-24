import Link from 'next/link';

export const ThumbBooks = ({ cover, title, link, text, summary, date }) => {
	return (
		<div
			className="card bg-cover height-cover"
			style={{ backgroundImage: `url(${cover})` }}
		>
			<div className="content">
				<h2 className="title mb-4">{title}</h2>
				<p className="text">{summary}</p>
				<span className="text-sm font-semibold tracking-wider">
					Publication date: {date}
				</span>
				<Link href={/book/ + link}>
					<a className="md:text-sm text-book-white bg-book-main rounded-md hover:bg-book-dark hover:translate-y-1 hover:shadow-xl hover:scale-100 inline-block px-3 py-2 mt-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 transform">
						{text}
					</a>
				</Link>
			</div>
		</div>
	);
};
