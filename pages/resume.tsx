import type { GetServerSideProps } from "next"

export default function ResumeRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/#experience",
    permanent: true,
  },
})
