import { withAuth } from "next-auth/middleware"

const authProxy = withAuth({
  pages: {
    signIn: "/login",
  },
})

export function proxy(...args) {
  return authProxy(...args)
}

export const config = { matcher: ["/ai-tools/:path*"] }
