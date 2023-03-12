import { GetTasksQuery, Task } from '@/graphql/dist/client'

const TaskCard = ({ data }: { data: GetTasksQuery | undefined }) => {
  return (
    <>
      {data?.tasks.map((task) => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <p>id:{task.id}</p>
          <p>content:{task.content}</p>
        </div>
      ))}
    </>
  )
}

export default TaskCard
