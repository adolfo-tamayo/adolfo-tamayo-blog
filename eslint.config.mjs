import nextVitals from "eslint-config-next/core-web-vitals"

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
    ],
  },
]

export default eslintConfig
