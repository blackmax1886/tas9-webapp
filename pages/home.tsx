import type { NextPage } from 'next'
import { KeyboardEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import {
  CreateTaskMutation,
  CreateTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
} from '../graphql/dist/client'
import { useSession } from 'next-auth/react'
import { ContentHeader, Header } from '../components/header'
import { useState } from 'react'
import { css } from '@emotion/react'

const board = css`
  box-sizing: border-box;
  border-radius: 4px;
  background: #edecee;
  padding: 8px;
  padding-bottom: 30px;
  width: 33%;
  margin: 1rem;
`

const addTask = css`
  box-sizing: border-box;
  margin-bottom: 3px;
  padding: 12px 16px;
  border-color: transparent;
  border-radius: 2px;
  background-color: rgba(26, 24, 29, 0.06);
  width: 100%;
`
const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, refetch } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user.id },
    skip: status === 'loading',
  })
  const [inputValue, setInputValue] = useState('')
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
    onCompleted() {
      refetch()
      setInputValue('')
    },
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

  return (
    <div style={{ margin: '0 auto', width: '1600px' }}>
      <Header></Header>
      <ContentHeader></ContentHeader>
      <div css={board}>
        <div>
          <input
            type="text"
            value={inputValue}
            placeholder="add new task"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            css={addTask}
          ></input>
        </div>
        {data?.tasks?.map((task) => (
          <div key={task.id}>
            <h1>{task.name}</h1>
            <p>id:{task.id}</p>
            <p>content:{task.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
