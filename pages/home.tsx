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

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data, refetch } = useQuery<GetTasksQuery>(GetTasksDocument, {
    variables: { userId: session?.user.id },
    skip: status === 'loading',
  })
  const [inputValue, setInputValue] = useState('')
  // TODO: show new task on task list without reloading
  const [createTask] = useMutation<CreateTaskMutation>(CreateTaskDocument, {
    onCompleted() {
      refetch()
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
      <div>
        <input
          type="text"
          value={inputValue}
          placeholder="add new task"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
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
  )
}

export default Home
