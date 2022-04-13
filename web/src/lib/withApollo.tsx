import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { GetServerSidePropsContext, NextPage } from "next";

export type ApolloClientContext = GetServerSidePropsContext;

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};

export function getApolloClient(initialState?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    fetch,
  });

  const cache = new InMemoryCache().restore(initialState ?? {});

  return new ApolloClient({
    link: httpLink,
    cache,
  });
}
