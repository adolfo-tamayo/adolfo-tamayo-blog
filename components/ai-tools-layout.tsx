import Head from 'next/head'

import { Session } from "next-auth"

import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import HeaderContainer from '../components/header-container'
import Navigation from '../components/navigation'
import SessionInfo from '../components/sessionInfo'

interface LayoutProps {
    session: Session | null
    children: React.ReactNode,
    title: string,
    signOut: () => void
}

const AIToolsLayout = ({ session, children, title, signOut }: LayoutProps) => (
    <>
        <Layout>
            <Head>
            <title>{title}</title>
            </Head>
            <Container>
            <HeaderContainer>
                <Intro />
                {session && <Navigation extraNav={<SessionInfo session={session} signOutCallback={signOut}/>}/>}
            </HeaderContainer>
            </Container>
            <Container>
                { children }
            </Container>
        </Layout>
    </>
)
export default AIToolsLayout