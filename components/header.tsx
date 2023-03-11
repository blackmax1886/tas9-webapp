import { css } from '@emotion/react'

const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`

const logo = css`
  font-size: 1.5rem;
`

const Header = () => {
  return (
    <div css={header}>
      <div css={logo}>Tas9</div>
      <div>Account</div>
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
`
const selectedTab = css`
  ${tab}
  border-bottom-color: #4ebbe4;
`

const ContentHeader = () => {
  return (
    <div css={tabs}>
      <div css={selectedTab}>Task Manager</div>
      <div css={tab}>Timetable</div>
    </div>
  )
}

export { Header, ContentHeader }
