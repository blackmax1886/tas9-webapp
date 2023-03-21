import { KeyboardEvent, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  CreateTaskMutation,
  CreateTaskDocument,
  GetTasksQuery,
  GetTasksDocument,
  UpdateTaskStartEndMutation,
  UpdateTaskStartEndDocument,
} from '../graphql/dist/client'
import { useSession } from 'next-auth/react'
import { ContentHeader, Header } from '../components/header'
import Board from '@/components/board'
import { css } from '@emotion/react'
import { DraggableTaskCards } from '@/components/task_card'
import Calendar from '@/components/calendar'
import { Task } from '../graphql/dist/client'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { Event, SlotInfo, stringOrDate } from 'react-big-calendar'

dayjs.locale('ja')
const formatString = 'YYYY-MM-DD HH:mm'

const container = css`
  display: flex;
  min-height: 800px;
`
const addTask = css`
  box-sizing: border-box;
  margin-bottom: 3px;
  padding: 12px 16px;
  border-color: transparent;
  border-radius: 2px;
  background-color: rgba(26, 24, 29, 0.06);
  width: 100%;
  font-size: inherit;
`

const calendarWrapper = css`
  width: 67%;
  margin: 1rem;
  padding: 8px;
  padding-bottom: 30px;
`

const TimeTable = () => {
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

  const [draggedTask, setDraggedTask] = useState<Partial<Task> | null>()
  const [updateTaskStartEnd] = useMutation<UpdateTaskStartEndMutation>(
    UpdateTaskStartEndDocument,
    {
      onCompleted() {
        // Idea: to optimize, do not use refetch & use only mutation & add event to calendar manually
        refetch()
      },
    }
  )

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
  const handleDropFromOutside = ({
    start,
    end,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => {
    updateTaskStartEnd({
      variables: {
        taskId: draggedTask?.id,
        start: dayjs(start).format(formatString),
        end: dayjs(end).format(formatString),
      },
    })
    setDraggedTask(null)
  }

  return (
    <div style={{ margin: '0 auto', width: '1600px' }}>
      <Header />
      <ContentHeader selected="Timetable" />
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
          <DraggableTaskCards
            data={data}
            refetch={refetch}
            setDraggedTask={setDraggedTask}
          ></DraggableTaskCards>
        </Board>
        <div css={calendarWrapper}>
          <Calendar onDropFromOutside={handleDropFromOutside} />
        </div>
      </div>
    </div>
  )
}

export default TimeTable
