import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/index.css'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const AnyComponent = Component as any
  return (
    <SessionProvider session={session}>
      <AnyComponent {...pageProps} />
    </SessionProvider>
  )
}
