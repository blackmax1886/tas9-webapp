import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/')
    return null
  }

  return <>{children}</>
}

export default AuthGuard
