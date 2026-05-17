export type ProfileLink = {
  label: string
  href: string
}

export type Experience = {
  company: string
  mark: string
  logo?: {
    src: string
    alt: string
    wide?: boolean
  }
  roles: Array<{
    title: string
    period: string
    location?: string
    summary: string
    highlights: string[]
    tech?: string[]
  }>
}

export const profile = {
  name: "Adolfo Tamayo",
  location: "London, UK",
  headline: "Tech Lead, AI Engineering at Lawhive",
  intro:
    "Hands-on technical lead building AI infrastructure, platform systems, and fintech products. Currently leading AI engineering at Lawhive, evolving legal AI from conversational assistance into agentic workflows that help lawyers work faster.",
  focus: [
    "AI platform architecture",
    "Distributed backend systems",
    "Engineering leadership",
    "Document processing pipelines",
    "Developer platforms",
  ],
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/adolfo-tamayo/",
    },
    {
      label: "X",
      href: "https://twitter.com/atamayobr",
    },
    {
      label: "Email",
      href: "mailto:atamayobr@gmail.com",
    },
  ] satisfies ProfileLink[],
  experience: [
    {
      company: "Lawhive",
      mark: "LH",
      logo: {
        src: "/company-logos/lawhive.png",
        alt: "Lawhive logo",
      },
      roles: [
        {
          title: "Tech Lead, AI Engineering",
          period: "Mar 2026 - Present",
          location: "London, UK",
          summary:
            "Leading the AI Experience team and the technical direction for Lawrence 2.0, evolving Lawhive's AI from chatbot to autonomous agent.",
          highlights: [
            "Setting architectural vision and technical roadmap for the AI experience layer.",
            "Driving system design through RFCs and architecture reviews.",
            "Architecting agentic workflows that can act across the platform on demand or proactively.",
          ],
          tech: [
            "Python",
            "FastAPI",
            "SQLModel",
            "OpenAI",
            "Anthropic",
            "OpenSearch",
            "PostgreSQL",
            "AWS",
            "Terraform",
          ],
        },
        {
          title: "Senior Engineer, AI Platform",
          period: "Jul 2025 - Mar 2026",
          location: "London, UK",
          summary:
            "Built foundational AI infrastructure for document processing, conversational AI, and research automation at scale.",
          highlights: [
            "Architected ingestion pipelines, case context distillation, and automated document workflows.",
            "Built multi-agent conversational AI with streaming responses and citation tracking.",
            "Reduced PDF processing latency by roughly 70% through benchmarking and strategy optimisation.",
          ],
          tech: [
            "Python",
            "FastAPI",
            "Pydantic",
            "OpenAI",
            "Anthropic Claude",
            "S3",
            "SQS",
            "SNS",
            "Docker",
          ],
        },
      ],
    },
    {
      company: "Revolut",
      mark: "RV",
      logo: {
        src: "/company-logos/revolut.png",
        alt: "Revolut logo",
        wide: true,
      },
      roles: [
        {
          title: "Lead Software Engineer, Technology Governance",
          period: "Jul 2022 - May 2025",
          location: "London, UK",
          summary:
            "Led an internal developer platform for software governance across component catalogues, SLOs, scorecards, service maps, and cost monitoring.",
          highlights: [
            "Built governance workflows for metadata, ownership, documentation, infrastructure, and observability.",
            "Developed scorecards and service health views to drive production readiness and security practices.",
            "Connected cloud cost monitoring to component ownership and team accountability.",
          ],
        },
        {
          title: "Lead Software Engineer, NLP",
          period: "Jul 2021 - Nov 2022",
          location: "London, UK",
          summary:
            "Advanced Help Centre CMS, chatbot, and translation services while contributing to Python engineering standards and shared libraries.",
          highlights: [
            "Mentored up to five backend engineers across localisation, scheduling, and HR systems.",
            "Piloted infrastructure migrations and contributed to common Python engineering guidelines.",
          ],
        },
        {
          title: "Senior Software Engineer, Compliance and NLP",
          period: "Nov 2019 - Aug 2021",
          location: "London, UK",
          summary:
            "Helped establish the Compliance Product team before moving into NLP systems for support automation and internal knowledge services.",
          highlights: [
            "Built a training data platform that improved chatbot intent detection and customer satisfaction.",
            "Developed an NLP orchestrator for intent detection, search, and article recommendation models.",
            "Built a PostgreSQL ltree-backed knowledge base data service.",
          ],
        },
      ],
    },
    {
      company: "Fincite",
      mark: "FC",
      logo: {
        src: "/company-logos/fincite-mark.png",
        alt: "Fincite logo",
      },
      roles: [
        {
          title: "Senior Software Engineer",
          period: "Jun 2018 - Nov 2019",
          location: "Frankfurt am Main, Germany",
          summary:
            "Led client-facing and internal fintech products, including digital asset management software, with distributed teams in Peru and Ukraine.",
          highlights: [
            "Worked with product owners to shape architecture and delivery.",
            "Improved internal tooling, documentation, and hiring standards.",
          ],
        },
      ],
    },
    {
      company: "Inka Labs",
      mark: "IL",
      logo: {
        src: "/company-logos/inka-labs.png",
        alt: "Inka Labs logo",
      },
      roles: [
        {
          title: "Software Engineer",
          period: "Apr 2013 - May 2018",
          location: "Arequipa, Peru",
          summary:
            "Built full-stack software for German clients across fintech and investment tooling, later taking on team lead responsibilities.",
          highlights: [
            "Delivered digital family office, commodity marketplace, and portfolio analytics products.",
            "Collaborated with product and design teams during client demos and delivery.",
          ],
        },
      ],
    },
  ] satisfies Experience[],
  education: [
    "BSc Computer Science, Universidad Catolica San Pablo",
    "MIT Global Startup Labs",
  ],
}
