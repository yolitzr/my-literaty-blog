import { Fragment } from 'react';
import Head from 'next/head';
import { NavBar } from './NavBar';
import { Footer } from './Footer.jsx';

export const Layout = ({ title = `Yolit's Books`, children }) => {
	const date = new Date().getFullYear();
	return (
		<Fragment>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<NavBar />
			<main>{children}</main>
			<Footer
				titleFooter={`Yolit's Books | Copyright © ${date} All rights reserved.`}
				subTitleFooter="Designed by Yolitzareth Zacarias for ca-tech.dev on Next.js"
			/>
		</Fragment>
	);
};
