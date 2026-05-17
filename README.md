# Adolfo Tamayo

Personal site for [adolfo-tamayo.me](https://adolfo-tamayo.me), built with Next.js, React, TypeScript, Tailwind CSS, shadcn-style primitives, NextAuth, and pnpm.

The public site is a minimal one-page profile. The `/ai-tools` area is intentionally protected behind Google authentication.

## Local Development

Install dependencies:

```bash
pnpm install
```

Pull Vercel development environment variables when needed:

```bash
vercel link
vercel env pull .env.local
```

Start the dev server:

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Required for protected AI tools and auth:

```bash
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GOOGLE_ID=
GOOGLE_SECRET=
OPENAI_API_KEY=
SECRET=
```

The public homepage should build and render without private runtime access. Protected routes should redirect unauthenticated visitors to the sign-in flow.

## Verification

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm test:e2e
```

Vercel should detect pnpm from `pnpm-lock.yaml`. This repo pins Node via `engines.node`; verify preview build logs before promoting a deployment.
