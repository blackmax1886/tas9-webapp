import { GetTasksQuery, Task } from '@/graphql/dist/client'
import { css } from '@emotion/react'

const taskCard = css`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
`
const checkbox = css`
  display: none;
`

const checkboxOverride = css`
  display: flex;
  margin: 1rem;
  position: relative;
  width: 1.5rem;
  align-items: center;
`

const checkboxOverrideLabel = css`
  background: none repeat scroll 0 0 #eeeeee;
  border: 1px solid #dddddd;
  cursor: pointer;
  height: 1.5rem;
  width: 1.5rem;

  &:after {
    border-style: none none solid solid;
    content: '';
    height: 5px;
    left: 6px;
    opacity: 0;
    -ms-transform: rotate(-45deg); /* IE 9 */
    -webkit-transform: rotate(-45deg); /* Safari and Chrome */
    transform: rotate(-90deg);
    width: 10px;
  }
`

const TaskCard = ({ data }: { data: GetTasksQuery | undefined }) => {
  return (
    <>
      {data?.tasks.map((task) => (
        <div key={task.id} css={taskCard}>
          <div css={checkboxOverride}>
            <input type="checkbox" css={checkbox}></input>
            <label css={checkboxOverrideLabel}></label>
          </div>
          <label>{task.name}</label>
        </div>
      ))}
    </>
  )
}

export default TaskCard
