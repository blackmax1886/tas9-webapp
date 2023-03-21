import {
  DeleteTaskDocument,
  DeleteTaskMutation,
  GetTasksQuery,
  Task,
  UpdateTaskIsDoneDocument,
  UpdateTaskIsDoneMutation,
} from '@/graphql/dist/client'
import { useMutation, QueryResult } from '@apollo/client'
import { css } from '@emotion/react'
import { useState } from 'react'
import Image from 'next/image'

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

const taskLabel = css`
  flex: 1 0 auto;
  max-width: 80%;
  overflow-wrap: break-word;
`

const deleteButton = css`
  background: transparent;
  border: none;
`

const TaskCard = ({
  task,
  refetch,
  openTaskDetail,
  isSelected,
  setSelectedTaskId,
}: {
  task: Partial<Task> | undefined
  refetch: QueryResult<GetTasksQuery>['refetch']
  openTaskDetail: (taskId: string | undefined) => void
  isSelected: boolean
  setSelectedTaskId: (taskId: string) => void
}) => {
  const [isDone, setIsDone] = useState(task?.done)
  const [updateTaskIsDone] = useMutation<UpdateTaskIsDoneMutation>(
    UpdateTaskIsDoneDocument,
    {
      onCompleted() {
        refetch()
      },
    }
  )
  const [deleteTask] = useMutation<DeleteTaskMutation>(DeleteTaskDocument, {
    onCompleted() {
      refetch()
    },
  })

  const handleTaskIsDone = () => {
    setIsDone(!isDone)
    updateTaskIsDone({
      variables: {
        taskId: task?.id,
        isDone: !isDone,
      },
    })
  }

  const handleClickTask = () => {
    openTaskDetail(task?.id)
  }

  const handleDeleteTask = () => {
    deleteTask({ variables: { taskId: task?.id } })
    if (isSelected) {
      setSelectedTaskId('')
    }
  }

  const taskCard = css`
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    border: 2px solid white;
    ${isSelected &&
    css`
      border: 2px solid #66bb6a;
    `}
  `

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
          <label css={checkboxWrapperLabel} onClick={handleTaskIsDone}></label>
        </div>
        <label css={taskLabel} onClick={handleClickTask}>
          {task?.name}
        </label>
        <button css={deleteButton} onClick={handleDeleteTask}>
          <Image
            src="/delete-button.png"
            alt="delete"
            height={24}
            width={24}
          ></Image>
        </button>
      </div>
    </>
  )
}

const TaskCards = ({
  data,
  refetch,
  openTaskDetail,
  selectedTaskId,
  setSelectedTaskId,
}: {
  data: GetTasksQuery | undefined
  refetch: QueryResult<GetTasksQuery>['refetch']
  openTaskDetail: (taskId: string | undefined) => void
  selectedTaskId: string
  setSelectedTaskId: (taskId: string) => void
}) => {
  return (
    <>
      {data?.tasks.map((task: Partial<Task>) => (
        <TaskCard
          key={task.id}
          task={task}
          refetch={refetch}
          openTaskDetail={openTaskDetail}
          isSelected={task.id === selectedTaskId}
          setSelectedTaskId={setSelectedTaskId}
        ></TaskCard>
      ))}
    </>
  )
}

const DraggableTaskCard = ({
  task,
  refetch,
  setDraggedTask,
}: {
  task: Partial<Task> | undefined
  refetch: QueryResult<GetTasksQuery>['refetch']
  setDraggedTask: (task: Partial<Task> | undefined) => void
}) => {
  const [isDone, setIsDone] = useState(task?.done)
  const [updateTaskIsDone] = useMutation<UpdateTaskIsDoneMutation>(
    UpdateTaskIsDoneDocument,
    {
      onCompleted() {
        refetch()
      },
    }
  )
  const [deleteTask] = useMutation<DeleteTaskMutation>(DeleteTaskDocument, {
    onCompleted() {
      refetch()
    },
  })

  const handleTaskIsDone = () => {
    setIsDone(!isDone)
    updateTaskIsDone({
      variables: {
        taskId: task?.id,
        isDone: !isDone,
      },
    })
  }

  const handleDeleteTask = () => {
    deleteTask({ variables: { taskId: task?.id } })
  }
  const handleDragStart = () => {
    console.log('drag start taskId:', task?.id)
    setDraggedTask(task)
  }

  const taskCard = css`
    display: flex;
    font-size: 1.5rem;
    align-items: center;
    border: 2px solid white;
  `

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
      <div key={task?.id} draggable={true} css={taskCard}>
        <div css={checkboxWrapper}>
          <input type="checkbox" css={checkbox}></input>
          <label css={checkboxWrapperLabel} onClick={handleTaskIsDone}></label>
        </div>
        <label css={taskLabel} onDragStart={handleDragStart} draggable>
          {task?.name}
        </label>
        <button css={deleteButton} onClick={handleDeleteTask}>
          <Image
            src="/delete-button.png"
            alt="delete"
            height={24}
            width={24}
          ></Image>
        </button>
      </div>
    </>
  )
}

const DraggableTaskCards = ({
  data,
  refetch,
  setDraggedTask,
}: {
  data: GetTasksQuery | undefined
  refetch: QueryResult<GetTasksQuery>['refetch']
  setDraggedTask: (task: Partial<Task> | undefined) => void
}) => {
  return (
    <>
      {data?.tasks.map((task: Partial<Task>) => (
        <DraggableTaskCard
          key={task.id}
          task={task}
          refetch={refetch}
          setDraggedTask={setDraggedTask}
        ></DraggableTaskCard>
      ))}
    </>
  )
}

export { TaskCard, TaskCards, DraggableTaskCard, DraggableTaskCards }
