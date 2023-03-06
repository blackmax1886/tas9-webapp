import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { css } from '@emotion/react'

const Button = css`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`

const Top: NextPage & {
  isRootPage?: boolean
} = () => {
  return (
    <div>
      <h1>tas9</h1>
      <p>Make your Day more efficient</p>
      <button
        css={Button}
        onClick={() => signIn('google', { callbackUrl: '/home' })}
      >
        Sign in with Google
      </button>
    </div>
  )
}

Top.isRootPage = true

export default Top
