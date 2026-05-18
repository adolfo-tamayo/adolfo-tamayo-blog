import { LockKeyhole } from "lucide-react"
import Link from "next/link"

import { SocialLinks } from "@/components/site/social-links"
import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
      <div className="grid gap-10 md:grid-cols-[1fr_17rem] md:items-end">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            {profile.location}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-muted-foreground sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 sm:text-lg">
            {profile.intro}
          </p>
          <div className="mt-7">
            <SocialLinks />
            <Button asChild variant="ghost" size="sm" className="mt-3 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground">
              <Link href="/ai-portfolio">
                <LockKeyhole aria-hidden="true" className="h-4 w-4" />
                AI Portfolio
              </Link>
            </Button>
          </div>
        </div>

        <aside className="border-l border-border pl-5">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Current focus
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {profile.focus.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

    </section>
  )
}
