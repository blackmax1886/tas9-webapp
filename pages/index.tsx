import { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const Top: NextPage = () => {
  return (
    <div>
      <h1>tas9</h1>
      <p>Make your Day more efficient</p>
      <button onClick={() => signIn('google', { callbackUrl: '/home' })}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Top
