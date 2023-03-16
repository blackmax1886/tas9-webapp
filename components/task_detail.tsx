import { Task } from '@/graphql/dist/client'
import { css } from '@emotion/react'
import {
  UpdateTaskContentMutation,
  UpdateTaskContentDocument,
} from '@/graphql/dist/client'
import { useMutation } from '@apollo/client'
import { useState, FormEvent, useEffect } from 'react'
import ContentEditable from 'react-contenteditable'

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
  const [content, setContent] = useState('')
  const [updateTaskContent] = useMutation<UpdateTaskContentMutation>(
    UpdateTaskContentDocument
  )
  // show content of selected task
  useEffect(() => {
    setContent(selectedTask?.content || '')
  }, [selectedTask])

  // useEffect(() => {
  //   if (selectedTask && selectedTask?.content !== content) {
  //     updateTaskContent({
  //       variables: { taskId: selectedTask?.id, content: content },
  //     })
  //   }
  // }, [content, selectedTask])
  const handleChangeTaskContent = (event: FormEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.textContent || '')
    updateTaskContent({
      variables: { taskId: selectedTask?.id, content: content },
    })
  }
  return (
    <div css={taskDetail}>
      <h1>{selectedTask?.name}</h1>
      <div css={taskContentWrapper}>
        <ContentEditable
          html={content}
          onChange={handleChangeTaskContent}
          css={taskContent}
        ></ContentEditable>
      </div>
    </div>
  )
}

export { TaskDetail }
