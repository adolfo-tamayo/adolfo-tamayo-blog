# My Personal Blog: About Me, Resume, Experience, and AI Projects Portfolio

Welcome to my personal blog built using Next.js, Markdown, and TypeScript. This site features an about me section, my resume and experience, and a set of portfolio projects where I experiment with various AI APIs.

This site is based on the [blog-starter-typescript](https://github.com/vercel/next.js/tree/canary/examples/blog-starter-typescript) template, showcasing Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages).

Additions include:
* [NextAuth](https://next-auth.js.org/) for authentication

For the backend we are using:
* Vercel Edge functions to run the backend that handles chat messages.
* Langchain for abstractions to interact with LLMs

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/adolfo-tamayo/adolfo-tamayo-blog.git
```

2. Enter the project directory:
```bash
cd adolfo-tamayo-blog
```

3. Install dependencies using Yarn:
```bash
yarn
```

4. Set up your environment variables in a `.env` file in the project root:
```
NEXTAUTH_SECRET= // Randomly generated, check next-auth documentation
GOOGLE_ID= // From Google Cloud Console > APIs & Services > OAuth consent screen
GOOGLE_SECRET= // From Google Cloud Console > APIs & Services > OAuth consent screen
OPENAI_API_KEY= // From your OpenAI account > Settings > User > API Keys
```

5. Start the development server

```bash
vercel dev
```

Now, the site should be up and running on [http://localhost:3000](http://localhost:3000)!