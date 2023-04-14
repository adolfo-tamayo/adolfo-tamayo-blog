import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSession, signIn } from "next-auth/react"

import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import HeaderContainer from '../components/header-container'
import Navigation from '../components/navigation'
import SessionInfo from '../components/sessionInfo'

export default function LoginPage() {
    const {data: session, status} = useSession()
    const router = useRouter()
  
    if (status == 'loading') {
      return <p>Loading...</p>
    }
  
    if (session) {
      router.push('/ai-tools')
      return null
    }
  
    return (
        <Layout>
          <Head>
          <title>AI Experiments</title>
          </Head>
          <Container>
          <HeaderContainer>
              <Intro />
              <Navigation />
          </HeaderContainer>
          </Container>
          <Container>
            <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">Sign in</h1>
            <p>You need to sign in to access this page</p>
            <br />
            <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow' onClick={() => signIn('google')}>
              Sign in with Google
            </button>
          </Container>
      </Layout>
    )
  }
  