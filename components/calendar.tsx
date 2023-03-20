import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { css } from '@emotion/react'

const localizer = dayjsLocalizer(dayjs)

const calendar = css`
  height: 800px;
`

const Calendar = () => {
  return (
    <div>
      <ReactBigCalendar
        localizer={localizer}
        //   events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        css={calendar}
      />
    </div>
  )
}

export default Calendar
