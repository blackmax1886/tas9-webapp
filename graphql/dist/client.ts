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
  createTask: Task;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};

export type NewTask = {
  content: Scalars['String'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  subtasks: Array<Subtask>;
  tasks: Array<Task>;
};

export type Subtask = {
  __typename?: 'Subtask';
  archived?: Maybe<Scalars['Boolean']>;
  assigned_at?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  parent_task: Task;
  priority?: Maybe<Scalars['String']>;
};

export type Task = {
  __typename?: 'Task';
  archived?: Maybe<Scalars['Boolean']>;
  assigned_at?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GetTaskQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, name: string, content?: string | null, done: boolean, user: { __typename?: 'User', name: string } }> };

export type CreateTodoMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', name: string, done: boolean, type: string, assigned_at?: string | null, user: { __typename?: 'User', id: string, name: string } } };


export const GetTaskDocument = gql`
    query getTask {
  tasks {
    id
    name
    content
    done
    user {
      name
    }
  }
}
    `;
export const CreateTodoDocument = gql`
    mutation createTodo {
  createTask(input: {content: "this is task text", userId: "2"}) {
    user {
      id
      name
    }
    name
    done
    type
    assigned_at
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getTask(variables?: GetTaskQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTaskQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskQuery>(GetTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTask', 'query');
    },
    createTodo(variables?: CreateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTodo', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;