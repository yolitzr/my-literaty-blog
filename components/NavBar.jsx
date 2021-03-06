import { useState, useEffect } from 'react';
import Link from 'next/link';
//Images
import Image from 'next/image';
import Logo from '../public/images/logo.svg';
// Route
import { NAV_LINKS } from '../data/NavLinks';

export const NavBar = () => {
    const [showLinks, setShowLinks] = useState(false)
		const [color, setColor] = useState(false)

    //Shink Navigation
    const scrollFunction = () => {
			window.onscroll = () => {
				if (
					document.body.scrollTop > 100 ||
					document.documentElement.scrollTop > 35
				) {
					document.getElementById('navbar').style.background = '#86425f'
					document.getElementById('navbar').style.transition = 'all 0.5s'
				} else {
					document.getElementById('navbar').style.background = 'none'
				}
			}
    }

    useEffect(() => {
      scrollFunction()

			if (showLinks === true) {
				setColor('#86425f')
				console.log('Hola')
			}else {
				setColor('transparent')
			}

    }, [showLinks]);

	return (
		<header id="navbar" className="fixed mt-0 w-full z-20">
			<nav style={{backgroundColor: color}} className="flex items-center justify-between flex-wrap mx-auto py-4 px-10 lg:px-32">
				<div className="flex items-center flex-no-shrink text-book-white">
					<Link href="/">
						<a>
							<Image
								src={Logo}
								alt="Yolit Loves Books"
								className="focus:outline-none"
								width="45"
								height="45"
							/>
						</a>
					</Link>
				</div>
				<div className="block lg:hidden">
					<button
						onClick={() => setShowLinks(!showLinks)}
						className="flex items-center px-3 py-2 border rounded text-book-light border-teal-light hover:text-white hover:border-white"
					>
						<i className="fas fa-bars fa-lg focus:outline-none"></i>
					</button>
				</div>
				<ul
					className={ showLinks
						? 'w-full lg:flex lg:items-center lg:w-auto'
						: 'hidden lg:block'
					}
				>
					<li className="flex flex-col justify-center items-center lg:flex-row">
						{NAV_LINKS.map((item, i) => {
							return (
								<Link href={item.url} key={i}>
									<a className="flex px-3 py-1 my-2 md:my-0 rounded-full sm:px-3 sm:py-2 sm:inline-block sm:mt-0 text-book-light tracking-wide hover:bg-book-light hover:text-book-main">
										{item.name}
									</a>
								</Link>
							);
						})}
					</li>
				</ul>
			</nav>
		</header>
	)
}
