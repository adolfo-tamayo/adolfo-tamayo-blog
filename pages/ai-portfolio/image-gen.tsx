import AIToolsLayout from "../../components/ai-tools-layout"
import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"
import { authOptions } from "../api/auth/[...nextauth]"

const ImageGen = ({ session }: { session: Session }) => {
    return (
        <AIToolsLayout session={session} signOut={signOut} title="AI Portfolio - Image generation">
            <section className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
                <div>
                    <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-7xl">
                        Image generation
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                        Archived image generation experiment. The route stays available as part of the private portfolio, but it is not currently an active workflow.
                    </p>
                </div>
                <aside className="border-l border-border pl-5">
                    <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                        Status
                    </p>
                    <p className="mt-4 text-sm leading-6">Draft</p>
                </aside>
            </section>
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
