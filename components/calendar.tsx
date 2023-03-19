import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dayjsLocalizer(dayjs)

const Calendar = () => (
  <div>
    <ReactBigCalendar
      localizer={localizer}
      //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

export default Calendar
