import React from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native'
import { Container, Icon, Button, Toast } from 'native-base'
import { useQuery, useMutation } from '@apollo/client'
import { GROUP_MEMBERS, REMOVE_GROUP_MEMBER } from '../../graphql'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'
import { profileName } from '../../utils'

const MembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GROUP_MEMBERS,
    {
      variables: { id: groupId },
    }
  )

  const [removeGroupMember, { loading: removingMember }] = useMutation(
    REMOVE_GROUP_MEMBER,
    {
      onCompleted({ removeGroupMember }) {
        Toast.show({
          text: `Removed: ${profileName(removeGroupMember)}`,
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
      update(cache, { data: { removeGroupMember } }) {
        const { groupMembers } = cache.readQuery({
          query: GROUP_MEMBERS,
          variables: { id: groupId },
        })
        cache.writeQuery({
          query: GROUP_MEMBERS,
          variables: { id: groupId },
          data: {
            groupMembers: groupMembers.filter(
              ({ id }) => id !== removeGroupMember.id
            ),
          },
        })
      },
    }
  )

  const removeGroupMemberAction = userId => {
    removeGroupMember({ variables: { input: { userId, groupId } } })
  }

  if (loading || removingMember) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data.groupMembers}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <UserPreview
            user={item}
            right={
              <Button
                small
                style={{ backgroundColor: '#f9f9f9' }}
                onPress={() => removeGroupMemberAction(item.id)}
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
