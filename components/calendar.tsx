import {
  Calendar as ReactBigCalendar,
  dayjsLocalizer,
  stringOrDate,
} from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { css } from '@emotion/react'

const localizer = dayjsLocalizer(dayjs)
const DragAndDropCalendar = withDragAndDrop(ReactBigCalendar)

const calendar = css`
  height: 800px;
`

const Calendar = ({
  onDropFromOutside,
}: {
  onDropFromOutside: ({
    start,
    end,
  }: {
    start: stringOrDate
    end: stringOrDate
  }) => void
}) => {
  return (
    <div>
      <DragAndDropCalendar
        localizer={localizer}
        //   events={myEventsList}
        defaultView="day"
        onDropFromOutside={onDropFromOutside}
        css={calendar}
      />
    </div>
  )
}

export default Calendar
