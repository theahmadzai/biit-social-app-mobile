import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Post from '../../components/Post'
import Loading from '../../components/Loading'

const GroupScreen = ({ navigation, route }) => {
  const { id } = route.params

  const { data, loading, error } = useQuery(
    gql`
      query GetGroupPosts($id: ID!) {
        group(id: $id) {
          id
          posts {
            id
            title
            text
            user {
              id
              username
              image
            }
            media {
              id
              filename
            }
            createdAt
          }
        }
      }
    `,
    { variables: { id } }
  )

  if (loading) return <Loading />
  if (error)
    return (
      <View>
        <Text>`Error! ${error.message}`</Text>
      </View>
    )

  return (
    <>
      <Button
        title="Post"
        onPress={() =>
          navigation.navigate('Post', {
            groupId: id,
          })
        }
      />

      <FlatList
        data={data.group.posts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Post {...item} />}
      />
    </>
  )
}

export default GroupScreen
