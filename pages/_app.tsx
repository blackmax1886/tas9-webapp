import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { RootLayout, GuardLayout } from './layouts'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/query',
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
          <Component {...pageProps} />
        </LayoutComponent>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
