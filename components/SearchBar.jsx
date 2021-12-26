import { useState, useEffect, useRef } from 'react'

export const SearchBar = ({ setSearchTerm }) => {
	const [searchData, setSearchData] = useState('')

	const initial = useRef(true)

	useEffect(() => {
		if (initial.current) {
			initial.current = false
			return
		}

		const timer = setTimeout(() => {
			setSearchTerm(searchData)
		}, 1000)

		return () => clearTimeout(timer)
	}, [setSearchTerm, searchData])

	return (
		<div className="px-2 py-4 mt-6 lg:mt-12">
			<div className="flex items-center rounded-full bg-book-light">
				<input
					value={searchData}
					type="text"
					placeholder="Search Review"
					className="w-full py-2 px-6 rounded-l-full bg-book-transparent leading-tight text-book-dark focus:outline-none"
					onChange={(e) => setSearchData(e.currentTarget.value)}
				/>
				<div className="p-2">
					<button className="flex justify-center items-center w-10 h-10 p-2 rounded-full bg-book-main text-book-white hover:bg-book-second focus:outline-none">
						<i className="fas fa-search"></i>
					</button>
				</div>
			</div>
		</div>
	)
}
