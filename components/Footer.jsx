import PropTypes from 'prop-types'

export function Footer({titleFooter, subTitleFooter}) {
    return (
		<footer>
			<div className="w-full py-10 px-4 bg-book-main">
				<div className="mt-2">
					<p className="text-sm text-center uppercase tracking-wider text-book-white">
						{titleFooter}
					</p>
					<span className="block mt-1 text-sm text-center uppercase text-book-white">
						{subTitleFooter} <i className="fas fa-heart"></i>
					</span>
				</div>
			</div>
		</footer>
	);
}

Footer.propTypes = {
    titleFooter: PropTypes.string,
    subTitleFooter: PropTypes.string,
}