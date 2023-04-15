import Head from 'next/head'
import { useSession, getSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
import AIToolsLayout from '../../components/ai-tools-layout'
import AvailableToolWidget from '../../components/available-tool-widget'

const availableToolList = [
  {
    name: 'ChatATB',
    description: 'A chatbot that can answer questions using OpenAI\'s GPT models',
    link: '/ai-tools/chat'
  },
  {
    name: 'ImageGen',
    description: 'Image Generation UI for OpenAI\'s DALL-E',
    link: '/ai-tools/image-gen'
  },
]

const AIToolsLandingPage = () => {
    const { data: session } = useSession()
    const router = useRouter()
    return (
        <AIToolsLayout session={session} signOut={signOut} title="AI Experiments">
          <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">AI Tools</h1>
                  <p>Portfolio of experiments with AI tools</p>
                  <br />
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {availableToolList.map((tool, index) => {
                        return <AvailableToolWidget key={index} name={tool.name} description={tool.description} link={tool.link} />
                    })}
                </div>
        </AIToolsLayout>
    )
}
export default AIToolsLandingPage

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }

    return {
      props: { session }
    }
  }
  