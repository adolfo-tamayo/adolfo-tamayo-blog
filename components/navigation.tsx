import Link from 'next/link'

const Navigation = ()=>(
    <div className="flex lg:flex-grow items-center" id="example-navbar-info">
      <ul className="flex flex-row list-none ml-auto">
        <li className="nav-item">
          <Link href="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75">  
              About
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/resume" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75">
              Resume
          </Link>
        </li>
        {/* <li className="nav-item"> Temporary disable
          <Link href="/blog">
            <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75">
              Blog
            </a>
          </Link>
        </li> */}
      </ul>
    </div>
)
export default Navigation