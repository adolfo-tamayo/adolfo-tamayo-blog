import { getServerSession, type Session } from "next-auth"
import { signOut } from "next-auth/react"
import AIToolsLayout from '../../components/ai-tools-layout'
import AvailableToolWidget from '../../components/available-tool-widget'
import { authOptions } from "../api/auth/[...nextauth]"

type PortfolioStatus = "Live" | "Draft" | "Future"

type PortfolioItem = {
  name: string
  description: string
  link?: string
  status: PortfolioStatus
}

const availableToolList: PortfolioItem[] = [
  {
    name: "AI chat",
    description: "A private prompt workspace for quick model experiments and structured answer drafting.",
    link: "/ai-portfolio/chat",
    status: "Live",
  },
  {
    name: "Image generation",
    description: "A live text-to-image playground for prompt craft, model selection, visual iteration, and downloadable outputs.",
    link: "/ai-portfolio/image-gen",
    status: "Live",
  },
  {
    name: "Voice lab",
    description: "Speech transcription, voice cloning sketches, and full-duplex voice chat patterns for real-time AI interfaces.",
    status: "Future",
  },
  {
    name: "Document copilot",
    description: "AI-assisted drafting, redlining, citations, and collaborative review flows for structured professional documents.",
    status: "Future",
  },
  {
    name: "Generative UI",
    description: "Interfaces that compose themselves from user intent: forms, dashboards, inspectors, and workflow surfaces generated on demand.",
    status: "Future",
  },
  {
    name: "Agent workflows",
    description: "Multi-step assistants that plan, call tools, track state, and produce auditable outputs instead of one-off completions.",
    status: "Future",
  },
  {
    name: "Retrieval systems",
    description: "RAG examples with ingestion, chunking, search quality checks, citations, and evals for knowledge-heavy products.",
    status: "Future",
  },
  {
    name: "Evaluation harness",
    description: "Prompt and agent evaluation loops for measuring quality, regressions, latency, and cost before shipping AI features.",
    status: "Future",
  },
]

const AIPortfolioIndexPage = ({ session }: { session: Session }) => {
    return (
        <AIToolsLayout session={session} signOut={signOut} title="AI Portfolio">
          <section className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-7xl">
                AI Portfolio
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Selected private experiments, prototypes, and future AI feature directions. Kept behind authentication because the work is useful context, not public product marketing.
              </p>
            </div>
            <aside className="border-l border-border pl-5">
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Access
              </p>
              <p className="mt-4 text-sm leading-6">
                Signed in. This portfolio index is protected by Google auth.
              </p>
            </aside>
          </section>

          <section className="mt-14 border-t border-border pt-8">
            <div className="grid gap-4 md:grid-cols-2">
              {availableToolList.map((tool) => (
                <AvailableToolWidget
                  key={tool.name}
                  name={tool.name}
                  description={tool.description}
                  link={tool.link}
                  status={tool.status}
                />
              ))}
            </div>
          </section>
        </AIToolsLayout>
    )
}
export default AIPortfolioIndexPage

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
