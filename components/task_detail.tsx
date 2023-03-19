import { Task } from '@/graphql/dist/client'
import { css } from '@emotion/react'
import {
  UpdateTaskContentMutation,
  UpdateTaskContentDocument,
} from '@/graphql/dist/client'
import { useMutation } from '@apollo/client'
import { useState, ChangeEvent, useEffect, useRef, use } from 'react'
import { useUpdateEffect } from 'react-use'

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
  font-size: inherit;
  font-family: inherit;
`

const TaskDetail = ({ selectedTask }: { selectedTask: Partial<Task> }) => {
  const [content, setContent] = useState(selectedTask.content || '')
  const [updateTaskContent] = useMutation<UpdateTaskContentMutation>(
    UpdateTaskContentDocument
  )

  useUpdateEffect(() => {
    const timeoutId = setTimeout(() => {
      updateTaskContent({
        variables: { taskId: selectedTask?.id, content: content },
      })
      console.log('run update')
    }, 3000)
    return () => {
      console.log('run cleanup')
      clearTimeout(timeoutId)
    }
  }, [content])

  const handleChangeTaskContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value || '')
  }

  return (
    <div css={taskDetail}>
      <h1>{selectedTask?.name}</h1>
      <div css={taskContentWrapper}>
        <textarea
          css={taskContent}
          value={content}
          onChange={handleChangeTaskContent}
        ></textarea>
      </div>
    </div>
  )
}

export { TaskDetail }
