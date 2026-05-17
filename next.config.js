/** @type {import('next').NextConfig} */
for (const envKey of ["NEXTAUTH_URL", "NEXTAUTH_URL_INTERNAL", "VERCEL_URL"]) {
  if (process.env[envKey] === '""') {
    delete process.env[envKey]
  }
}

if (!process.env.NEXTAUTH_URL && !process.env.VERCEL_URL) {
  process.env.NEXTAUTH_URL = "http://localhost:3000"
}

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
