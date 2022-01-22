import PropTypes from 'prop-types'

export const Grid = ({header, children}) => {
    return (
		<section className="md:py-10 py-5">
			<h3 className="md:text-4xl text-book-main mt-6 text-3xl font-bold tracking-wider text-left uppercase">
				{header}
			</h3>
			<div className="gri-cols-1 md:grid-cols-grid lg:gap-3 grid gap-2 mt-6">
				{children}
			</div>
		</section>
	)
}

Grid.propTypes = {
    header: PropTypes.string,
}

