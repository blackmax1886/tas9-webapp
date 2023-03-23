import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
  stringOrDate,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { css } from '@emotion/react'
import { Task } from '@/graphql/dist/client'

dayjs.locale('ja')
const formatString = 'YYYY-MM-DD HH:mm'
const localizer = dayjsLocalizer(dayjs)
const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar)

const tasksAsEvents = (tasks: Partial<Task>[] | undefined) => {
  if (!tasks) {
    return []
  }
  const events = tasks.map((task) => {
    return {
      taskId: task.id,
      title: task.name,
      start: dayjs(task.start, formatString).toDate(),
      end: dayjs(task.end, formatString).toDate(),
    }
  })
  return events
}

const calendar = css`
  height: 800px;
`

const timeslot = css`
  height: 50px;
`

type TimeSlotWrapperProps = {
  children: React.ReactNode
}

// TODO: Fix type error from TimeSlowWrapper arg
const TimeSlotWrapper: React.FC<TimeSlotWrapperProps> = ({ children }) => {
  return <div css={timeslot}>{children}</div>
}

const Calendar = ({
  tasks,
  onDropFromOutside,
  onEventDrop,
}: {
  tasks: Partial<Task>[] | undefined
  onDropFromOutside: ({
    start,
    end,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => void
  onEventDrop: ({
    event,
    start,
    end,
  }: {
    event: object
    start: stringOrDate
    end: stringOrDate
  }) => void
}) => {
  const events = tasksAsEvents(tasks)
  const defaultDate = dayjs().toDate()
  const scrollToTime = dayjs().toDate()
  return (
    <div>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        defaultView="day"
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        onDropFromOutside={onDropFromOutside}
        onEventDrop={onEventDrop}
        components={{
          // @ts-expect-error to be fixed
          timeSlotWrapper: TimeSlotWrapper,
        }}
        css={calendar}
      />
    </div>
  )
}

export default Calendar
