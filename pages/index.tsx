import type { NextPage } from "next";
import { useQuery } from "@apollo/client";

import { GetUserByEmailDocument, GetUserByEmailQuery } from "../graphql/dist/client";
import { GetTasksDocument } from "../graphql/dist/client";
import { GetTasksQuery } from "../graphql/dist/client";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const { data } = useQuery<GetTasksQuery>(
    GetTasksDocument,
    {
      variables: { userId: session?.user.id },
      skip: status === 'loading'
  });
  return (
    <div style={{ margin: "0 auto", width: "1000px" }}>
      {data?.tasks?.map((task) => (
        <div key={task.id}>
          <h1>{task.content}</h1>
          <p>id:{task.id}</p>
          <p>name:{task.name}</p>
          <p>content:{task.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
