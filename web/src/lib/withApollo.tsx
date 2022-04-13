import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  }
}

function getApolloClient(initialState?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch
  })

  const cache = new InMemoryCache().restore(initialState ?? {});

  return new ApolloClient({
    link: httpLink,
    cache
  })
}


