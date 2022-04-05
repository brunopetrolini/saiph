import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home() {
  const { user } = useUser()

  return (
    <div>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  returnTo: '/api/auth/login'
})
