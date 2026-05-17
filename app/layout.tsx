import type { Metadata } from "next"

import "@/styles/index.css"

export const metadata: Metadata = {
  title: "Adolfo Tamayo",
  description:
    "Tech Lead, AI Engineering at Lawhive. AI infrastructure, platform engineering, and fintech systems.",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
