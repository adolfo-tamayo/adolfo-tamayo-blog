import Head from 'next/head'
import Link from "next/link"

import { Session } from "next-auth"
import { ArrowLeft } from "lucide-react"

import Meta from '../components/meta'
import SessionInfo from '../components/sessionInfo'

interface LayoutProps {
    session: Session | null
    children: React.ReactNode,
    title: string,
    signOut: () => void
}

const AIToolsLayout = ({ session, children, title, signOut }: LayoutProps) => (
    <>
        <Meta />
        <Head>
            <title>{title}</title>
        </Head>
        <div className="min-h-screen">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
                <header className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Home
                        </Link>
                        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                            Private
                        </p>
                    </div>
                    {session ? (
                        <SessionInfo session={session} signOutCallback={signOut} />
                    ) : null}
                </header>
                <main>{children}</main>
            </div>
        </div>
    </>
)
export default AIToolsLayout
