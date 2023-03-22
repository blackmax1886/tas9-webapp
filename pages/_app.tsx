import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { RootLayout, GuardLayout } from '../components/layouts'
import { NextComponentType } from 'next'
import { css, Global } from '@emotion/react'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { isRootPage?: boolean }
}

const global = css`
  body {
    font-family: sans-serif;
    font-size: 1rem;
  }
`

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    credentials: 'include',
  })
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  })

  const LayoutComponent = Component.isRootPage ? RootLayout : GuardLayout

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <LayoutComponent>
          <Global styles={global} />
          <Component {...pageProps} />
        </LayoutComponent>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
