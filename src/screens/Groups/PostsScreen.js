import React from 'react'
import { View, Text, Button, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import PostPreview from '../../components/PostPreview'
import Loading from '../../components/Loading'

const GROUP_POSTS_QUERY = gql`
  query GetGroupPosts($id: ID!) {
    getGroupPosts(id: $id) {
      id
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
`

const PostsScreen = ({ navigation, route }) => {
  const { id } = route.params

  const { data, loading, error } = useQuery(GROUP_POSTS_QUERY, {
    variables: { id },
  })

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
        title="Create Post"
        onPress={() =>
          navigation.navigate('CreatePost', {
            groupId: id,
          })
        }
      />

      <FlatList
        data={data.getGroupPosts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <PostPreview navigation={navigation} {...item} />
        )}
      />
    </>
  )
}

export default PostsScreen
