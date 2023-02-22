import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import jwt from "jsonwebtoken"
import { GraphQLClient } from 'graphql-request';
import { Account, getSdk, NewUser, PartialAccount } from '@/graphql/dist/client';

const token = jwt.sign(
  { role: 'adapter'},
  process.env.SECRET || 'uVhTdmE4TeAubNhjwJF19FQB4anphxO1ZYtGEpkmMGI='
)

// Can be replaced by ApolloClient?
const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080/query',
  {
    headers: {
      authorization: `bearer ${token}`,
    }
  }
)

const sdk = getSdk(client)

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.SECRET || 'uVhTdmE4TeAubNhjwJF19FQB4anphxO1ZYtGEpkmMGI=',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user.accessToken = jwt.sign(
        {
          userId: token.userId,
        },
        process.env.SECRET || 'uVhTdmE4TeAubNhjwJF19FQB4anphxO1ZYtGEpkmMGI=',
        { expiresIn: '7d' },
      );

      return session;
    },
  },
  adapter: {
    createUser: async (newUser: NewUser) => {
      const { createUser } = await sdk.createUser({user: newUser})
      return {emailVerified: null, ...createUser}
    },

    getUser: async (id: string) => {
      const { user } = await sdk.getUser({id: id})
      if (!user) return null

      return {emailVerified: null, ...user, accessToken: 'jwt'}
    },
    getUserByEmail: async (email: string) => {
      const { userByEmail } = await sdk.getUserByEmail({email: email})
      if (!userByEmail) return null
      
      return {emailVerified: null, ...userByEmail}
    },
    getUserByAccount: async (partialAccount: PartialAccount) => {
      const { userByAccount } = await sdk.getUserByAccount({partialAccount: partialAccount})
      if (!userByAccount) return null
      
      return {emailVerified: null, ...userByAccount}
    },
    linkAccount: async ({ provider, providerAccountId, userId }) => {
      const account: Account = {
        provider: provider,
        providerAccountId: providerAccountId,
        userId: userId
      }
      await sdk.linkAccount({account: account});
    },
    // @ts-ignore
    createSession: () => {},
    // @ts-ignore
    getSessionAndUser: () => {},
    // @ts-ignore
    updateSession: () => {},
    // @ts-ignore
    deleteSession: () => {},
    // @ts-ignore
    updateUser: () => {},
  }
});
