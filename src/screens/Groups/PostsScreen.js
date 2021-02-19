import React from 'react'
import { Alert, RefreshControl, FlatList } from 'react-native'
import { Container } from 'native-base'
import { useQuery } from '@apollo/client'
import CreatePostForm from '../../components/CreatePostForm'
import { GROUP_POSTS } from '../../graphql'
import PostPreview from '../../components/PostPreview'
import Loading from '../../components/Loading'

const PostsScreen = ({ route }) => {
  const { id: groupId } = route.params.group

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GROUP_POSTS,
    { variables: { id: groupId } }
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        ListHeaderComponent={<CreatePostForm postableId={groupId} />}
        data={data.groupPosts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <PostPreview post={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
    </Container>
  )
}

export default PostsScreen
