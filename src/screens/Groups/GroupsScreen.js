import React from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Fab, Icon } from 'native-base'
import { gql, useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'
import GroupPreview from '../../components/GroupPreview'
import Loading from '../../components/Loading'

const USER_GROUPS_QUERY = gql`
  query GetUserGroups($id: ID!) {
    getUserGroups(id: $id) {
      id
      name
      description
      image
    }
  }
`

const GroupsScreen = () => {
  const { user } = useAuth()
  const navigation = useNavigation()

  const { data, loading, error, refetch, networkStatus } = useQuery(
    USER_GROUPS_QUERY,
    {
      variables: { id: user.id },
    }
  )

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <Container>
      <FlatList
        data={data.getUserGroups}
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
        onPress={() => navigation.navigate('CreateGroup')}
      >
        <Icon name="add" style={{ color: 'black' }} />
      </Fab>
    </Container>
  )
}

export default GroupsScreen
