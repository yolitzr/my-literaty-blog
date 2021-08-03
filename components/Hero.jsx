import PropTypes from 'prop-types'

export function Hero({ bgHero, titleHero, subTitleHero, authorFullName, editorial, summary }) {
	return (
		<div
			className="hero-img"
			style={{ backgroundImage: `url(${bgHero.src})` }}
		>
			<div className="flex md:flex-col justify-center items-center mx-auto w-full p-4 z-10">
				<div className="flex flex-col justify-center w-full h-auto py-4 px-5 mt-16 lg:px-40">
					<h2 className="text-6xl sm:text-8xl lg:text-9xl text-center text-book-light">
						{titleHero}
					</h2>
					<h4 className="mt-4 sm:text-base text-center italic tracking-wide text-book-light">
						{subTitleHero}
					</h4>
					<h3>{authorFullName}</h3>
					<h4 className="mt-2 text-xl text-center text-book-light">
						{editorial}
					</h4>
					<span className="block mt-4 text-center italic text-book-light">
						{summary}
					</span>
				</div>
			</div>
		</div>
	);
}

Hero.propTypes = {
	bgHero: PropTypes.object,
	titleHero: PropTypes.string,
	subTitleHero: PropTypes.string,
	authorFullName: PropTypes.string,
	editorial: PropTypes.string,
	summary: PropTypes.string,
};