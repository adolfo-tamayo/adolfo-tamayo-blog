import AIToolsLayout from "../../components/ai-tools-layout"
import { useSession, getSession, signOut } from "next-auth/react"

const ImageGen = () => {
    // in progress component
    const { data: session } = useSession()
    return (
        <AIToolsLayout session={session} signOut={signOut} title="ImageGen">
            <h1 className="text-6xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">ImageGen</h1>
            <p>Image Generation UI for OpenAI's DALL-E</p>
            <br />
            <p>Work in progress</p>
        </AIToolsLayout>
    )
}
export default ImageGen