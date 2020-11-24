import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-4 flex flex-col lg:flex-row items-center justify-center">
          <h3 className="text-xl lg:text-xl tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4">
            Powered by {' '}
            <a className="underline" href="https://nextjs.org" target="_blank">Next.js</a>, {' '}
            <a className="underline" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>.{'  '}
            Hosted on {' '}
            <a className="underline" href="https://vercel.com" target="_blank">Vercel</a> {' '}
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4">
              © 2020
            <a
              href={`https://github.com/adolfo-tamayo/adolfo-tamayo-blog`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
