import { Fragment } from 'react';
import Head from 'next/head';
//Components
import { NavBar } from './NavBar';
import { Footer } from './Footer.jsx';

export const Layout = ({ title = `Caro's Bookish`, children}) => {
    return (
		<Fragment>
			<Head>
                <title>{title}</title>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
			</Head>
			<NavBar />

			{children}

			<Footer
				titleFooter="Caro's Bookish | Copyright ©2021 All rights reserved."
				subTitleFooter="Designed by Yolitzareth Zacarias for CA Designers in Next.js"
			/>
		</Fragment>
	);
}