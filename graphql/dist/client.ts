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

export type Account = {
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSubTask: Subtask;
  createTask: Task;
  createUser: User;
  deleteTask?: Maybe<Task>;
  linkAccount: User;
  updateTaskContent: Task;
  updateTaskIsDone: Task;
  updateTaskStartEnd: Task;
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


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};


export type MutationLinkAccountArgs = {
  input?: InputMaybe<Account>;
};


export type MutationUpdateTaskContentArgs = {
  content: Scalars['String'];
  id: Scalars['String'];
};


export type MutationUpdateTaskIsDoneArgs = {
  id: Scalars['String'];
  isDone: Scalars['Boolean'];
};


export type MutationUpdateTaskStartEndArgs = {
  end: Scalars['String'];
  id: Scalars['String'];
  start: Scalars['String'];
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
  email: Scalars['String'];
  emailVerified?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PartialAccount = {
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  subtasks: Array<Subtask>;
  task: Task;
  tasks: Array<Task>;
  user?: Maybe<User>;
  userByAccount?: Maybe<User>;
  userByEmail?: Maybe<User>;
};


export type QuerySubtasksArgs = {
  taskId?: InputMaybe<Scalars['String']>;
};


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryTasksArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserByAccountArgs = {
  partialAccount: PartialAccount;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type Subtask = {
  __typename?: 'Subtask';
  archived: Scalars['Boolean'];
  content?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  task: Task;
};

export type Task = {
  __typename?: 'Task';
  archived: Scalars['Boolean'];
  content?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  priority?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  subtasks: Array<Subtask>;
  type?: Maybe<Scalars['String']>;
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  tasks: Array<Task>;
};

export type CreateTaskMutationVariables = Exact<{
  task: NewTask;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, name: string, done: boolean, archived: boolean } };

export type GetTasksQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, name: string, content?: string | null, done: boolean, due?: string | null, start?: string | null, end?: string | null, group?: string | null, type?: string | null, priority?: string | null, archived: boolean }> };

export type GetTaskQueryVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type GetTaskQuery = { __typename?: 'Query', task: { __typename?: 'Task', id: string, name: string, content?: string | null, done: boolean, due?: string | null, start?: string | null, end?: string | null, group?: string | null, type?: string | null, priority?: string | null, archived: boolean } };

export type UpdateTaskIsDoneMutationVariables = Exact<{
  taskId: Scalars['String'];
  isDone: Scalars['Boolean'];
}>;


export type UpdateTaskIsDoneMutation = { __typename?: 'Mutation', updateTaskIsDone: { __typename?: 'Task', id: string, name: string, content?: string | null, done: boolean, due?: string | null, start?: string | null, end?: string | null, group?: string | null, type?: string | null, priority?: string | null, archived: boolean } };

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['String'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'Task', id: string } | null };

export type UpdateTaskContentMutationVariables = Exact<{
  taskId: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdateTaskContentMutation = { __typename?: 'Mutation', updateTaskContent: { __typename?: 'Task', name: string, content?: string | null } };

export type UpdateTaskStartEndMutationVariables = Exact<{
  taskId: Scalars['String'];
  start: Scalars['String'];
  end: Scalars['String'];
}>;


export type UpdateTaskStartEndMutation = { __typename?: 'Mutation', updateTaskStartEnd: { __typename?: 'Task', name: string, start?: string | null, end?: string | null } };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', id: string, name?: string | null, email: string } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name?: string | null, email: string } | null };

export type GetUserByAccountQueryVariables = Exact<{
  partialAccount: PartialAccount;
}>;


export type GetUserByAccountQuery = { __typename?: 'Query', userByAccount?: { __typename?: 'User', id: string, name?: string | null, email: string } | null };

export type CreateUserMutationVariables = Exact<{
  user: NewUser;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name?: string | null, email: string } };

export type LinkAccountMutationVariables = Exact<{
  account: Account;
}>;


export type LinkAccountMutation = { __typename?: 'Mutation', linkAccount: { __typename?: 'User', id: string, name?: string | null, email: string, googleId?: string | null } };


export const CreateTaskDocument = gql`
    mutation createTask($task: NewTask!) {
  createTask(input: $task) {
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
    done
    due
    start
    end
    group
    type
    priority
    archived
  }
}
    `;
export const GetTaskDocument = gql`
    query getTask($taskId: String!) {
  task(id: $taskId) {
    id
    name
    content
    done
    due
    start
    end
    group
    type
    priority
    archived
  }
}
    `;
export const UpdateTaskIsDoneDocument = gql`
    mutation updateTaskIsDone($taskId: String!, $isDone: Boolean!) {
  updateTaskIsDone(id: $taskId, isDone: $isDone) {
    id
    name
    content
    done
    due
    start
    end
    group
    type
    priority
    archived
  }
}
    `;
export const DeleteTaskDocument = gql`
    mutation deleteTask($taskId: String!) {
  deleteTask(id: $taskId) {
    id
  }
}
    `;
export const UpdateTaskContentDocument = gql`
    mutation updateTaskContent($taskId: String!, $content: String!) {
  updateTaskContent(id: $taskId, content: $content) {
    name
    content
  }
}
    `;
export const UpdateTaskStartEndDocument = gql`
    mutation updateTaskStartEnd($taskId: String!, $start: String!, $end: String!) {
  updateTaskStartEnd(id: $taskId, start: $start, end: $end) {
    name
    start
    end
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
    query getUserByAccount($partialAccount: PartialAccount!) {
  userByAccount(partialAccount: $partialAccount) {
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
export const LinkAccountDocument = gql`
    mutation linkAccount($account: Account!) {
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
    createTask(variables: CreateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTaskMutation>(CreateTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTask', 'mutation');
    },
    getTasks(variables: GetTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTasksQuery>(GetTasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTasks', 'query');
    },
    getTask(variables: GetTaskQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTaskQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskQuery>(GetTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTask', 'query');
    },
    updateTaskIsDone(variables: UpdateTaskIsDoneMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskIsDoneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskIsDoneMutation>(UpdateTaskIsDoneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTaskIsDone', 'mutation');
    },
    deleteTask(variables: DeleteTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTaskMutation>(DeleteTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTask', 'mutation');
    },
    updateTaskContent(variables: UpdateTaskContentMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskContentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskContentMutation>(UpdateTaskContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTaskContent', 'mutation');
    },
    updateTaskStartEnd(variables: UpdateTaskStartEndMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskStartEndMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskStartEndMutation>(UpdateTaskStartEndDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTaskStartEnd', 'mutation');
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
    linkAccount(variables: LinkAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LinkAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LinkAccountMutation>(LinkAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'linkAccount', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;