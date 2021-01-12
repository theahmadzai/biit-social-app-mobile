import React from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container } from 'native-base'
import { useQuery } from '@apollo/client'
import { POST_LIKES } from '../../graphql'
import Loading from '../../components/Loading'
import UserPreview from '../../components/UserPreview'

const LikesScreen = ({ route }) => {
  const { postId } = route.params

  const { data, loading, error, refetch, networkStatus } = useQuery(
    POST_LIKES,
    { variables: { id: postId } }
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data.postLikes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <UserPreview user={item.user} />}
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

export default LikesScreen
