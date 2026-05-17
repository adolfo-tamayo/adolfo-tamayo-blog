import AIToolsLayout from "../../components/ai-tools-layout"
import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]"

const ImageGen = ({ session }: { session: Session }) => {
    return (
        <AIToolsLayout session={session} signOut={signOut} title="ImageGen">
            <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">ImageGen</h1>
            <p>Image Generation UI for OpenAI&apos;s DALL-E</p>
            <br />
            <p>Work in progress</p>
        </AIToolsLayout>
    )
}
export default ImageGen

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
