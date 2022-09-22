import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getGenders } from '../config/api';

export const Categories = () => {
	const { data } = useQuery(['genders'], getGenders);

	return (
		<div className="w-full mt-4">
			<ul className="px-2 flex flex-col gap-3">
				{data?.map((gender) => (
					<li
						key={gender?.id}
						className={
							gender?.books?.length
								? `flex justify-between items-center text-sm text-book-dark`
								: 'hidden'
						}
					>
						<Link href={/genres/ + `${gender.id}`}>
							<a className="font-semibold mb-0 hover:text-book-second">
								{gender?.name}
							</a>
						</Link>
						<span>{gender?.books?.length}</span>
					</li>
				))}
			</ul>
		</div>
	);
};
