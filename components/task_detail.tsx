import { Task } from '@/graphql/dist/client'
import { css } from '@emotion/react'

const taskContent = css`
  flex: 1 0 auto;
  border: none;
  outline: none;
  resize: none;
  background-color: rgba(26, 24, 29, 0.06);
  font-size: 1rem;
  font-family: sans-serif;
`

const TaskDetail = ({
  selectedTask,
}: {
  selectedTask: Partial<Task> | undefined
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <h1>{selectedTask?.name}</h1>
      <div
        css={css`
          flex: 1 0 auto;
          display: flex;
        `}
      >
        <div contentEditable={true} css={taskContent}>
          {selectedTask?.content}
        </div>
      </div>
    </div>
  )
}

export { TaskDetail }
