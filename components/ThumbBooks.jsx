import Link from 'next/link'

export const ThumbBooks = ({ cover, title, link, text , summary}) => {  
  return (
    <div className="card bg-cover height-cover" style={{ backgroundImage: `url(${cover})` }}>
      <div className="content">
      <h2 className="title mb-4" >{title}</h2>
        <p className="text">{summary}</p>
        <Link  href={/book/ + link}>
          <a className="btn">
            {text}
          </a>
        </Link>
      </div>
    </div>
  )
}