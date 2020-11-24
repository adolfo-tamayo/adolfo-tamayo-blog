import Link from 'next/link'

const Header = () => {
  return (
      <h2 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        <Link href="/">
          <a className="hover:underline">Adolfo Tamayo.</a>
        </Link>
      </h2>
  )
}

export default Header
