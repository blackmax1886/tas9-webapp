import type { NextPage } from 'next'
import { KeyboardEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import {
  CreateTaskMutation,
  CreateTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
  GetTaskQuery,
  GetTaskDocument,
} from '../graphql/dist/client'
import { useSession } from 'next-auth/react'
import { ContentHeader, Header } from '../components/header'
import Board from '@/components/board'
import { useState } from 'react'
import { css } from '@emotion/react'
import { TaskCards } from '@/components/task_card'

const container = css`
  display: flex;
`
const addTask = css`
  box-sizing: border-box;
  margin-bottom: 3px;
  padding: 12px 16px;
  border-color: transparent;
  border-radius: 2px;
  background-color: rgba(26, 24, 29, 0.06);
  width: 100%;
  font-size: 1rem;
`
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, refetch } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user.id },
    skip: status === 'loading',
  })
  //TODO: rename inputValue
  const [inputValue, setInputValue] = useState('')
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
    onCompleted() {
      refetch()
      setInputValue('')
    },
  })
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const { data: selected } = useQuery<GetTaskQuery>(GetTaskDocument, {
    variables: { taskId: selectedTaskId },
    skip: !selectedTaskId,
  })

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTask({
        variables: {
          task: {
            name: inputValue,
            userId: session?.user.id,
          },
        },
      })
    }
  }

  const openTaskDetail = (taskId: string | undefined) => {
    if (taskId) {
      setSelectedTaskId(taskId)
    }
  }

  return (
    <div style={{ margin: '0 auto', width: '1600px' }}>
      <Header></Header>
      <ContentHeader></ContentHeader>
      <div css={container}>
        <Board>
          <div>
            <input
              type="text"
              value={inputValue}
              placeholder="+ add new task"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              css={addTask}
            ></input>
          </div>
          <TaskCards
            data={data}
            refetch={refetch}
            openTaskDetail={openTaskDetail}
          ></TaskCards>
        </Board>
        <Board>
          <h1>{selected?.task.name}</h1>
          <p>{selected?.task.content}</p>
        </Board>
        <Board>
          <p>subtask detail & edit</p>
        </Board>
      </div>
    </div>
  )
}

export default Home
