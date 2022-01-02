import PropTypes from 'prop-types'

export const Wrapper = ({header, children}) => {
    return (
		<section className="py-5 md:py-10">
			<h3 className="mt-6 text-left text-3xl md:text-4xl font-bold uppercase tracking-wider text-book-main">
				{header}
			</h3>
			<div className="grid gri-cols-1 gap-2 mt-6 md:grid-cols-gridTwo lg:gap-8">
				{children}
			</div>
		</section>
	);
}

Wrapper.propTypes = {
    header: PropTypes.string,
}