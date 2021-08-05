import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';

export const ThumbBooks = ({ title, cover, text }) => {
    const myLoader = ({ src }) => {
		return `${src}`;
	};

    return (
        <div className="content mt-6 transition-all duration-200 transform hover:translate-y-1 hover:shadow-xl hover:scale-95">
            <div className="content-overlay"></div>
            <div className="p-1">
                <figure className="w-full height-cover">
                    <Image
                        loader={myLoader}
                        src={cover}
                        alt={title}
                        layout="fill"
                        objectFit="cover" 
                    />
                </figure>
                

            </div>
            
        </div>
    )
}

ThumbBooks.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    text: PropTypes.string
}