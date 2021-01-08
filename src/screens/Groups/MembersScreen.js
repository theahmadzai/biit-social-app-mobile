import React from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Icon, Button, Toast } from 'native-base'
import { useQuery, useMutation } from '@apollo/client'
import { GROUP_USERS, REMOVE_GROUP_USER } from '../../graphql'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'
import { profileName } from '../../utils'

const MembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GROUP_USERS,
    {
      variables: { id: groupId },
    }
  )

  const [removeGroupUser, { loading: removingUser }] = useMutation(
    REMOVE_GROUP_USER,
    {
      onCompleted({ removeGroupUser }) {
        Toast.show({
          text: `Removed: ${profileName(removeGroupUser)}`,
          duration: 3000,
          type: 'success',
        })
      },
      onError(err) {
        Toast.show({
          text: err.message,
          duration: 3000,
          type: 'danger',
        })
      },
      update(cache, { data: { removeGroupUser } }) {
        const { groupUsers } = cache.readQuery({
          query: GROUP_USERS,
          variables: { id: groupId },
        })
        cache.writeQuery({
          query: GROUP_USERS,
          variables: { id: groupId },
          data: {
            groupUsers: groupUsers.filter(
              ({ id }) => id !== removeGroupUser.id
            ),
          },
        })
      },
    }
  )

  const removeGroupUserAction = userId => {
    removeGroupUser({ variables: { input: { userId, groupId } } })
  }

  if (loading || removingUser) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data.groupUsers}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <UserPreview
            user={item}
            right={
              <Button
                small
                style={{ backgroundColor: '#f9f9f9' }}
                onPress={() => removeGroupUserAction(item.id)}
              >
                <Icon
                  active
                  name="remove"
                  style={{ fontSize: 24, color: 'red' }}
                />
              </Button>
            }
          />
        )}
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

export default MembersScreen
