import React, { useState } from 'react';

export const Tabs = ({ synopsis, review }) => {
	const [openTab, setOpenTab] = React.useState(1);

	return (
		<div className="flex flex-wrap">
			<div className="w-full">
				<ul
					className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
					role="tablist"
				>
					<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
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
							Synopsis
						</a>
					</li>
					<li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
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
							My Review
						</a>
					</li>
				</ul>
				<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
					<div className="px-4 py-5 flex-auto">
						<div className="tab-content tab-space">
							<div
								className={openTab === 1 ? 'block' : 'hidden'}
							>
								<div dangerouslySetInnerHTML={{  __html: synopsis  }} />

									{/* {synopsis}
								</p> */}
							</div>
              {review && (
                <div
                  className={openTab === 2 ? 'block' : 'hidden'}
                >
									<div dangerouslySetInnerHTML={{  __html: review }} />
									{/* <p dangerouslySetInnerHTML={{ __html: review }} /> */}
                  {/* <p>
                    {review}
                  </p> */}
                </div>
              )}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
