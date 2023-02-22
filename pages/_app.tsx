import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import {SessionProvider} from "next-auth/react"
import { setContext } from '@apollo/client/link/context'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const httpLink = createHttpLink({
    uri: "http://localhost:8080/query",
    // credentials: "include",
  });
  const authLink = setContext((_, {headers}) => {
    const token = session.user.accessToken
    console.log(token)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  })
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
