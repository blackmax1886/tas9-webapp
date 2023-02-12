import type { NextPage } from "next";
import { useQuery } from "@apollo/client";

import { GetTaskDocument } from "../graphql/dist/client";
import { GetTaskQuery } from "../graphql/dist/client";

const Home: NextPage = () => {
  const { data } = useQuery<GetTaskQuery>(GetTaskDocument);
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
