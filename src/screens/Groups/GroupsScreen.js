import React from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Fab, Icon } from 'native-base'
import { useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { USER_GROUPS } from '../../graphql'
import { useAuth } from '../../contexts/AuthContext'
import GroupPreview from '../../components/GroupPreview'
import Loading from '../../components/Loading'

const GroupsScreen = () => {
  const { navigate } = useNavigation()
  const { user } = useAuth()

  const { data, loading, error, refetch, networkStatus } = useQuery(
    USER_GROUPS,
    { variables: { id: user.id } }
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data.userGroups}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <GroupPreview group={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
      <Fab
        position="bottomRight"
        style={{ backgroundColor: 'white' }}
        onPress={() => navigate('CreateGroup')}
      >
        <Icon name="add" style={{ color: 'black' }} />
      </Fab>
    </Container>
  )
}

export default GroupsScreen
