import Image from "next/image"

import { profile } from "@/data/profile"

export function Experience() {
  return (
    <section id="experience" className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
      <div className="border-t border-border pt-8">
        <div className="mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Resume
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              AI, platforms, fintech.
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {profile.experience.map((company) => (
            <article key={company.company} className="grid gap-5 rounded-lg border border-border bg-background/70 p-5 sm:grid-cols-[5rem_1fr] sm:p-6">
              <div className="flex h-14 w-20 items-center justify-center rounded-md border border-border bg-background text-sm font-semibold">
                {company.logo ? (
                  <Image
                    src={company.logo.src}
                    alt={company.logo.alt}
                    width={company.logo.wide ? 72 : 40}
                    height={company.logo.wide ? 16 : 40}
                    loading="eager"
                    className={company.logo.wide ? "h-auto w-16" : "h-10 w-10 object-contain"}
                  />
                ) : (
                  company.mark
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{company.company}</h3>
                <div className="mt-4 space-y-5">
                  {company.roles.map((role) => (
                    <div key={`${company.company}-${role.title}-${role.period}`} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="font-medium">{role.title}</h4>
                        <p className="text-sm text-muted-foreground">{role.period}</p>
                      </div>
                      {role.location ? (
                        <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                      ) : null}
                      <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
                        {role.summary}
                      </p>
                      <ul className="mt-3 grid gap-2 text-sm leading-6 sm:grid-cols-2">
                        {role.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      {"tech" in role && role.tech ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {role.tech.map((tech: string) => (
                            <span key={tech} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border p-5">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Education
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-6 sm:grid-cols-2">
            {profile.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
