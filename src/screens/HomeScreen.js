import React from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Icon, Fab } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext'
import { useQuery } from '@apollo/client'
import { WALL_POSTS } from '../graphql'
import PostPreview from '../components/PostPreview'
import Loading from '../components/Loading'

const HomeScreen = () => {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  const { data, loading, error, refetch, networkStatus } = useQuery(WALL_POSTS)

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data?.wallPosts ?? []}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <PostPreview post={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
      {user.role === 'ADMIN' ? (
        <Fab
          position="bottomRight"
          style={{ backgroundColor: 'white' }}
          onPress={() => navigate('CreateWallPost')}
        >
          <Icon name="md-create" style={{ color: 'black' }} />
        </Fab>
      ) : null}
    </Container>
  )
}

export default HomeScreen
