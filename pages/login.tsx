import Head from 'next/head'
import { getServerSession } from "next-auth"
import { signIn } from "next-auth/react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"

import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"
import { authOptions } from "./api/auth/[...nextauth]"

export default function LoginPage() {
  const router = useRouter()
  const callbackUrl =
    typeof router.query.callbackUrl === "string" ? router.query.callbackUrl : "/ai-tools"

  return (
    <>
      <Head>
          <title>AI Portfolio</title>
      </Head>

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between text-sm text-muted-foreground">
          <Link href="/" className="font-medium text-foreground">
            {profile.name}
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back
          </Link>
        </nav>

        <section className="grid flex-1 content-center gap-12 py-14 sm:py-16 md:grid-cols-[1fr_25rem] md:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Protected area
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] sm:text-7xl">
              AI Portfolio
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              A private workspace for selected AI experiments and internal tools.
              Sign in with Google to continue.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Message me if you need access.
            </p>
          </div>

          <div className="border-y border-border py-8 md:border-l md:border-y-0 md:py-0 md:pl-8">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Access
            </p>
            <Button
              className="group mt-5 w-full justify-between border border-foreground bg-foreground transition-colors duration-150 hover:bg-foreground/90"
              onClick={() => signIn("google", { callbackUrl })}
            >
              Sign in with Google
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-px group-hover:-translate-y-px"
              />
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: "/ai-tools",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
