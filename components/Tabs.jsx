import React, { useState } from 'react';

export const Tabs = ({ synopsis, review, tabOne, tabTwo }) => {
	const [openTab, setOpenTab] = React.useState(1);

	return (
		<div className="flex flex-wrap">
			<div className="w-full">
				<ul
					className="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none"
					role="tablist"
				>
					<li className="flex-auto mr-2 -mb-px text-center last:mr-0">
						<a
							className={
								'text-xs font-bold uppercase px-5 py-3 rounded block leading-normal ' +
								(openTab === 1
									? 'text-book-light bg-book-main'
									: 'text-book-main bg-book-light')
							}
							onClick={(e) => {
								e.preventDefault();
								setOpenTab(1);
							}}
							data-toggle="tab"
							role="tablist"
						>
							{tabOne}
						</a>
					</li>
					{review && (
						<li className="flex-auto mr-2 -mb-px text-center last:mr-0">
							<a
								className={
									'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
									(openTab === 2
										? 'text-book-light bg-book-main'
										: 'text-book-main bg-book-light')
								}
								onClick={(e) => {
									e.preventDefault();
									setOpenTab(2);
								}}
								data-toggle="tab"
								role="tablist"
							>
								{tabTwo}
							</a>
						</li>
					)}
				</ul>
				<div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded">
					<div className="flex-auto px-4 py-5">
						<div className="tab-content tab-space">
							<div className={openTab === 1 ? 'block' : 'hidden'}>
								<div
									dangerouslySetInnerHTML={{
										__html: synopsis,
									}}
								/>

								{/* {synopsis}
								</p> */}
							</div>
							<div className={openTab === 2 ? 'block' : 'hidden'}>
								<div
									dangerouslySetInnerHTML={{ __html: review }}
								/>
								{/* <p dangerouslySetInnerHTML={{ __html: review }} /> */}
								{/* <p>
									{review}
								</p> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
