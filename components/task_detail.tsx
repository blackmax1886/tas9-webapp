import { Task } from '@/graphql/dist/client'
import { css } from '@emotion/react'
import {
  UpdateTaskContentMutation,
  UpdateTaskContentDocument,
} from '@/graphql/dist/client'
import { useMutation } from '@apollo/client'
import { KeyboardEvent, useState, ChangeEvent, useEffect, useRef } from 'react'
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
  white-space: pre-wrap;
  font-size: 1rem;
`

const TaskDetail = ({ selectedTask }: { selectedTask: Partial<Task> }) => {
  const [content, setContent] = useState(selectedTask.content || '')
  const isMounted = useRef(false)
  const [updateTaskContent] = useMutation<UpdateTaskContentMutation>(
    UpdateTaskContentDocument
  )

  useEffect(() => {
    if (isMounted.current) {
      console.log('content useEffect')
      updateTaskContent({
        variables: { taskId: selectedTask.id, content: content },
      })
      return
      // const timeoutId = setTimeout(
      //   () =>
      //     updateTaskContent({
      //       variables: { taskId: selectedTask?.id, content: content },
      //     }),
      //   1000
      // )
      // return clearTimeout(timeoutId)
    }
    isMounted.current = true
  }, [content])

  // useEffect(() => {
  //   if (isContentModified) {
  //     console.log(isContentModified.current)
  //     console.log('update start')
  //     const timeoutId = setTimeout(
  //       () =>
  //         updateTaskContent({
  //           variables: { taskId: selectedTask?.id, content: content },
  //         }),
  //       1000
  //     )
  //     isContentModified.current = false
  //     return clearTimeout(timeoutId)
  //   }
  // }, [isContentModified])

  const handleChangeTaskContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value || '')
    console.log('onChange')
  }

  return (
    <div css={taskDetail}>
      <h1>{selectedTask?.name}</h1>
      <div css={taskContentWrapper}>
        <input
          css={taskContent}
          value={content}
          onChange={handleChangeTaskContent}
        ></input>
        {/* <ContentEditable
          html={content}
          onChange={handleChangeTaskContent}
          onKeyPress={handleKeyDown}
          css={taskContent}
        ></ContentEditable> */}
      </div>
    </div>
  )
}

export { TaskDetail }
