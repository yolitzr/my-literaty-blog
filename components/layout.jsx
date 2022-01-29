import { Fragment } from 'react';
import Head from 'next/head';
//Components
import { NavBar } from './NavBar';
import { Footer } from './Footer.jsx';

export const Layout = ({ title = `Yolit's Books`, children }) => {
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
			</Head>
			<NavBar />
			<main>{children}</main>

			<Footer
				titleFooter="Yolit's Books | Copyright © 2022 All rights reserved."
				subTitleFooter="Designed by Yolitzareth Zacarias for ca-tech.dev on Next.js"
			/>
		</Fragment>
	);
};
