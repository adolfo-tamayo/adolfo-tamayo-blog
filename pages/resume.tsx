import Head from 'next/head'

import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import HeaderContainer from '../components/header-container'
import Navigation from '../components/navigation'

const Resume = () => {
    return (
    <>
      <Layout>
        <Head>
          <title>Adolfo Tamayo's personal site</title>
        </Head>
        <Container>
          <HeaderContainer>
            <Intro />
            <Navigation />
          </HeaderContainer>
          Resume here
        </Container>
      </Layout>
    </>
  )
}
export default Resume