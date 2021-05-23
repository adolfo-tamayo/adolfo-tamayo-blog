import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import HeaderContainer from '../components/header-container'
import Navigation from '../components/navigation'
import { SocialIcon } from 'react-social-icons';

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
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
          <div className="flex flex-col items-center justify-center pt-32 pb-32 whitespace-new-line" style={{width: "38rem", margin: "auto"}}>
            <p> Hi! I'm Adolfo, a passionate software engineer interested in information systems, cloud computing, NLP and AI as well as technical leadership and mentoring. </p>
            <p className="mt-4">Follow me at:</p>
            <div className="flex flex-row">
              {
                ["https://www.linkedin.com/in/adolfo-tamayo/", "https://twitter.com/atamayobr", "https://www.instagram.com/adolfotb/"].map((link) => <div className="m-2"><SocialIcon url={link} bgColor="white" fgColor="black"/></div>)
              }
            </div>
          </div>
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts.slice(0, 4)} />} */}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
