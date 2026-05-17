import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"
import AIToolsLayout from '../../components/ai-tools-layout'
import AvailableToolWidget from '../../components/available-tool-widget'
import { authOptions } from "../api/auth/[...nextauth]"

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

const AIToolsLandingPage = ({ session }: { session: Session }) => {
    return (
        <AIToolsLayout session={session} signOut={signOut} title="AI Portfolio">
          <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">AI Portfolio</h1>
                  <p>Selected AI experiments and internal tools.</p>
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
    const session = await getServerSession(context.req, context.res, authOptions)

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
