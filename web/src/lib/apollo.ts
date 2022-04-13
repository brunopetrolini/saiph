import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  fetch
})

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})
