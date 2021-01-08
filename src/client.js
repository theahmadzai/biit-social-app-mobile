import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
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
    ])
  ),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          groupUsers: {
            merge: false,
          },
        },
      },
    },
  }),
})

export default client
