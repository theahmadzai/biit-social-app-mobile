import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities'
import { getAuthToken } from './utils'
import { IP, PORT } from './constants'

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
      uri: `ws://${IP}:${PORT}/graphql`,
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
      createUploadLink({ uri: `http://${IP}:${PORT}/graphql` }),
    ])
  ),
  cache: new InMemoryCache({
    typePolicies: {
      Mutation: {
        fields: {
          togglePostLike: {
            merge: false,
          },
        },
      },
      Query: {
        fields: {
          groupPosts: {
            merge: false,
          },
          groupUsers: {
            merge: false,
          },
          postLikes: {
            merge: false,
          },
          postComments: {
            merge: false,
          },
        },
      },
    },
  }),
})

export default client
