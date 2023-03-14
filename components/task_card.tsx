import {
  GetTasksQuery,
  Task,
  UpdateTaskIsDoneDocument,
  UpdateTaskIsDoneMutation,
} from '@/graphql/dist/client'
import { useMutation } from '@apollo/client'
import { css } from '@emotion/react'
import { useState } from 'react'
import { ChangeEvent, MouseEvent } from 'react'

const taskCard = css`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
`
const checkbox = css`
  display: none;
`

const checkboxWrapper = css`
  display: flex;
  margin: 1rem;
  position: relative;
  width: 1.5rem;
  align-items: center;
`

const TaskCard = ({ task }: { task: Partial<Task> | undefined }) => {
  const [isDone, setIsDone] = useState(false)
  const [updateTaskIsDone] = useMutation<UpdateTaskIsDoneMutation>(
    UpdateTaskIsDoneDocument
  )

  const handleClick = (event: MouseEvent<HTMLLabelElement>) => {
    setIsDone(!isDone)
    updateTaskIsDone({
      variables: {
        taskId: task?.id,
        isDone: !isDone,
      },
    })
  }
  const handleDone = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked)
  }

  const checkboxWrapperLabel = css`
    background: none repeat scroll 0 0 #eeeeee;
    border: 1px solid #dddddd;
    border-radius: 50%;
    cursor: pointer;
    height: 1.5rem;
    width: 1.5rem;

    &:after {
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      content: '';
      height: 6px;
      left: 0.4rem;
      opacity: 0;
      position: absolute;
      top: 0.5rem;
      transform: rotate(-45deg);
      width: 12px;
    }

    ${isDone &&
    css`
      background-color: #66bb6a;
      border-color: #66bb6a;
      &:after {
        opacity: 1;
      }
    `}
  `

  return (
    <>
      <div key={task?.id} css={taskCard}>
        <div css={checkboxWrapper}>
          <input type="checkbox" css={checkbox}></input>
          <label css={checkboxWrapperLabel} onClick={handleClick}></label>
        </div>
        <label>{task?.name}</label>
      </div>
    </>
  )
}

const TaskCards = ({ data }: { data: GetTasksQuery | undefined }) => {
  return (
    <>
      {data?.tasks.map((task: Partial<Task>) => (
        <TaskCard task={task}></TaskCard>
      ))}
    </>
  )
}

export { TaskCard, TaskCards }
