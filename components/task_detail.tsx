import { Task } from '@/graphql/dist/client'
import { css } from '@emotion/react'

const taskDetail = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const taskContentWrapper = css`
  flex: 1 0 auto;
  display: flex;
`

const taskContent = css`
  flex: 1 0 auto;
  border: none;
  outline: none;
  resize: none;
  background-color: rgba(26, 24, 29, 0.06);
  padding: 1rem;
`

const TaskDetail = ({
  selectedTask,
}: {
  selectedTask: Partial<Task> | undefined
}) => {
  return (
    <div css={taskDetail}>
      <h1>{selectedTask?.name}</h1>
      <div css={taskContentWrapper}>
        <div contentEditable={true} css={taskContent}>
          {selectedTask?.content}
        </div>
      </div>
    </div>
  )
}

export { TaskDetail }
