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

export type AccountOfUser = {
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubTask: Subtask;
  createTask: Task;
  createUser: User;
  linkAccount: User;
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


export type MutationLinkAccountArgs = {
  input?: InputMaybe<AccountOfUser>;
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
  userByAccount: User;
  userByEmail: User;
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


export type QueryUserByAccountArgs = {
  providerAccountId: Scalars['String'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
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
  googleId?: Maybe<Scalars['String']>;
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

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', id: string, name: string, email: string } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string } };

export type GetUserByAccountQueryVariables = Exact<{
  providerAccountId: Scalars['String'];
}>;


export type GetUserByAccountQuery = { __typename?: 'Query', userByAccount: { __typename?: 'User', id: string, name: string, email: string } };

export type CreateUserMutationVariables = Exact<{
  user: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string } };

export type LinkTestAccountMutationVariables = Exact<{
  account: AccountOfUser;
}>;


export type LinkTestAccountMutation = { __typename?: 'Mutation', linkAccount: { __typename?: 'User', id: string, name: string, email: string, googleId?: string | null } };


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
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    name
    email
  }
}
    `;
export const GetUserDocument = gql`
    query getUser($id: String!) {
  user(id: $id) {
    id
    name
    email
  }
}
    `;
export const GetUserByAccountDocument = gql`
    query getUserByAccount($providerAccountId: String!) {
  userByAccount(providerAccountId: $providerAccountId) {
    id
    name
    email
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($user: NewUser!) {
  createUser(input: $user) {
    id
    name
    email
  }
}
    `;
export const LinkTestAccountDocument = gql`
    mutation linkTestAccount($account: AccountOfUser!) {
  linkAccount(input: $account) {
    id
    name
    email
    googleId
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
    },
    getUserByEmail(variables: GetUserByEmailQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByEmailQuery>(GetUserByEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByEmail', 'query');
    },
    getUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    },
    getUserByAccount(variables: GetUserByAccountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserByAccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByAccountQuery>(GetUserByAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByAccount', 'query');
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    linkTestAccount(variables: LinkTestAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LinkTestAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LinkTestAccountMutation>(LinkTestAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'linkTestAccount', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;