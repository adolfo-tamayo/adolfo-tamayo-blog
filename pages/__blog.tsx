import Head from 'next/head'

import { getAllPosts } from '../lib/api'

import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import HeaderContainer from '../components/header-container'
import Navigation from '../components/navigation'
import MoreStories from '../components/more-stories'

import Post from '../types/post'

type Props = {
    posts: Post[]
}

const Blog = ({ posts }: Props) => {
    return (
    <>
      <Layout>
        <Head>
          <title>Adolfo Tamayo's Blog</title>
        </Head>
        <Container>
          <HeaderContainer>
            <Intro />
            <Navigation />
          </HeaderContainer>
          {posts.length > 0 && <MoreStories title="Blog Posts" posts={posts} />}
        </Container>
      </Layout>
    </>
  )
}
export default Blog

export const getStaticProps = async () => {
    const posts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
    ])
  
    return {
      props: { posts },
    }
  }
  