import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Post from '../components/Post'
import Loading from '../components/Loading'

const GROUP_QUERY = gql`
  query GetGroupData($id: ID!) {
    group(id: $id) {
      name
      members {
        id
        username
      }
      posts {
        id
        title
        text
        media
        createdAt
      }
    }
  }
`

const GroupScreen = ({ route }) => {
  const { id } = route.params

  const { loading, error, data } = useQuery(GROUP_QUERY, { variables: { id } })

  if (loading) return <Loading />
  if (error)
    return (
      <View>
        <Text>`Error! ${error.message}`</Text>
      </View>
    )

  const { members } = data.group
  const { posts } = data.group

  return (
    <>
      <FlatList
        data={members}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.id} | {item.username}
            </Text>
          </View>
        )}
      />

      <FlatList
        data={posts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            content={item.text}
            image={item.media}
            date={item.createdAt}
          />
        )}
      />
    </>
  )
}

export default GroupScreen
