import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { css } from '@emotion/react'

const Button = css`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 0.5rem;
  text-align: center;
  font-size: 1rem;
  border-radius: 0.25rem;
`

const card = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  padding: 2.5rem;
  box-sizing: border-box;
  border: 1px solid #dadce0;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  text-align: center;
`

const heading = css`
  font-family: sans-serif;
  margin: 0px 0 -0.125rem;
  padding: 0;
  color: #fff;
  text-align: center;
  color: #202124;
  font-family: 'Google Sans', 'Noto Sans Myanmar UI', arial, sans-serif;
  font-size: 36px;
  font-weight: 400;
`

const Top: NextPage & {
  isRootPage?: boolean
} = () => {
  return (
    <div css={card}>
      <h1 css={heading}>tas9</h1>
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
