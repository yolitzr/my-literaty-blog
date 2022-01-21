import PropTypes from 'prop-types'

export const Hero = ({ bgHero, titleHero, subTitleHero, authorFullName, editorial, summary }) => {
	return (
		<div
			className="hero-img"
			style={{ backgroundImage: `url(${bgHero})` }}
		>
			<div className="z-10 flex items-center justify-center w-full p-4 mx-auto md:flex-col">
				<div className="flex flex-col justify-center w-full h-auto px-5 py-4 mt-16 lg:px-40">
					<h2 className="text-6xl text-center sm:text-8xl lg:text-9xl text-book-light">
						{titleHero}
					</h2>
					<h4 className="mt-4 italic tracking-wide text-center sm:text-base text-book-light">
						{subTitleHero}
					</h4>
					<h3 className='mt-4 text-2xl font-semibold text-center text-book-light lg:text-3xl'>{authorFullName}</h3>
					<h4 className="mt-2 text-xl text-center text-book-light">
						{editorial}
					</h4>
					<span className="block w-3/4 mx-auto mt-4 italic text-center text-book-light">
						{summary}
					</span>
				</div>
			</div>
		</div>
	)
}

Hero.propTypes = {
	bgHero: PropTypes.string,
	titleHero: PropTypes.string,
	subTitleHero: PropTypes.string,
	authorFullName: PropTypes.string,
	editorial: PropTypes.string,
	summary: PropTypes.string,
};