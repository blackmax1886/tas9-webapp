import { css } from '@emotion/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const header = css`
  display: flex;
  align-items: center;
  padding: 1rem;
`

const logo = css`
  font-size: 2rem;
`

const nav = css`
  margin-left: auto;
  display: flex;
`

const navItem = css`
  font-size: 1rem;
  padding: 1rem;
`

const Header = () => {
  return (
    <div css={header}>
      <div css={logo}>Tas9</div>
      <nav css={nav}>
        <button onClick={() => signOut()} css={navItem}>
          Sign Out
        </button>
        <div css={navItem}>Account</div>
      </nav>
    </div>
  )
}

const tabs = css`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid #d7dbdd;
  padding: 1rem, 0, 1rem, 1rem;
`

const tab = css`
  cursor: pointer;
  padding: 5px 30px;
  color: #16a2d7;
  font-size: 1rem;
  border-bottom: 2px solid transparent;
  text-decoration: none;
`
const selectedTab = css`
  ${tab}
  border-bottom-color: #4ebbe4;
`

const ContentHeader = () => {
  return (
    <div css={tabs}>
      <Link href="/home" css={selectedTab}>
        Task Manager
      </Link>
      <Link href="/timetable" css={tab}>
        Timetable
      </Link>
    </div>
  )
}

export { Header, ContentHeader }
