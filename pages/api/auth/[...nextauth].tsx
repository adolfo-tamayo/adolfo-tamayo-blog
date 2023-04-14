import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error(
    "Google OAuth environment variables are not configured correctly"
  )
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // OAuth authentication providers
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
  ]
})