import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubTask: Subtask;
  createTask: Task;
  createUser: User;
};


export type MutationCreateSubTaskArgs = {
  input: NewSubtask;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationCreateUserArgs = {
  input: NewUser;
};

export type NewSubtask = {
  content?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  taskId: Scalars['String'];
};

export type NewTask = {
  content?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type NewUser = {
  Email: Scalars['String'];
  Name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  subtasks: Array<Subtask>;
  tasks: Array<Task>;
  user: User;
};


export type QuerySubtasksArgs = {
  taskId?: InputMaybe<Scalars['String']>;
};


export type QueryTasksArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Subtask = {
  __typename?: 'Subtask';
  archived: Scalars['Boolean'];
  assigned_at?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['String']>;
  task: Task;
};

export type Task = {
  __typename?: 'Task';
  archived: Scalars['Boolean'];
  assigned_at?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['String']>;
  subtasks: Array<Subtask>;
  type?: Maybe<Scalars['String']>;
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  tasks: Array<Task>;
};

export type CreateTaskMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, name: string, done: boolean, archived: boolean } };

export type GetTasksQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, name: string, content?: string | null }> };


export const CreateTaskDocument = gql`
    mutation createTask {
  createTask(
    input: {name: "homework2", content: "physics", userId: "01GS0APAFMWDF1PBXDF81EBEKK"}
  ) {
    id
    name
    done
    archived
  }
}
    `;
export const GetTasksDocument = gql`
    query getTasks($userId: String!) {
  tasks(userId: $userId) {
    id
    name
    content
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createTask(variables?: CreateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTaskMutation>(CreateTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTask', 'mutation');
    },
    getTasks(variables: GetTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksQuery>(GetTasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTasks', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;