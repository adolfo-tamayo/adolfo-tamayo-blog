import Link from 'next/link'

const Navigation = ()=>(
    <div className="flex lg:flex-grow items-center" id="example-navbar-info">
      <ul className="flex flex-row list-none ml-auto">
        <li className="nav-item">
          <Link href="/">  
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75" href="#pablo">
              About
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/resume">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75" href="#pablo">
              Resume
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/blog">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75" href="#pablo">
              Blog
            </a>
          </Link>
        </li>
      </ul>
    </div>
)
export default Navigation