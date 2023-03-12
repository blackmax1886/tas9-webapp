import { css } from '@emotion/react'
import { ReactNode } from 'react'

const board = css`
  box-sizing: border-box;
  border-radius: 4px;
  background: #edecee;
  padding: 8px;
  padding-bottom: 30px;
  width: 33%;
  margin: 1rem;
`
const Board = ({ children }: { children: ReactNode }) => {
  return <div css={board}>{children}</div>
}

export default Board
