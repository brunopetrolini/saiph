import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient()}>
        <Component {...props} />
      </ApolloProvider>
    );
  }
}

function getApolloClient() {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch
  })

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: httpLink,
    cache
  })
}


