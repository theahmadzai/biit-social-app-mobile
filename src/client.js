import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities'
import { getAuthToken } from './utils'

const API_URL = 'http://192.168.1.2:3000/graphql'

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    new WebSocketLink({
      uri: `ws://192.168.1.2:3000/graphql`,
      options: {
        reconnect: true,
        async connectionParams() {
          return { authToken: await getAuthToken() }
        },
      },
    }),
    ApolloLink.from([
      setContext(async (_, { headers }) => ({
        headers: { ...headers, authorization: await getAuthToken() },
      })),
      createUploadLink({ uri: API_URL }),
    ]),
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )

      if (networkError) console.log(`[Network error]: ${networkError}`)
    })
  ),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          groupMembers: {
            merge: false,
          },
        },
      },
    },
  }),
})

export default client
