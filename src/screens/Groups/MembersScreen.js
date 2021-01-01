import React from 'react'
import { Alert, RefreshControl } from 'react-native'
import { Container, List, Icon, Button } from 'native-base'
import { gql, useQuery, useMutation } from '@apollo/client'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'

const GROUP_MEMBERS_QUERY = gql`
  query GetGroupMembers($id: ID!) {
    getGroupMembers(id: $id) {
      id
      username
      image
      role
      profile {
        firstName
        middleName
        lastName

        ... on StudentProfile {
          session
          section
        }
      }
    }
  }
`

const REMOVE_GROUP_MEMBER_MUTATION = gql`
  mutation RemoveGroupMember($input: RemoveGroupMemberInput!) {
    removeGroupMember(input: $input) {
      id
      username
      image
      role
      profile {
        firstName
        middleName
        lastName
      }
    }
  }
`

const MembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const { data, loading, error, refetch, networkStatus } = useQuery(
    GROUP_MEMBERS_QUERY,
    {
      variables: { id: groupId },
    }
  )

  const [removeGroupMember, { loading: removingMember }] = useMutation(
    REMOVE_GROUP_MEMBER_MUTATION,
    {
      onCompleted(data) {
        Alert.alert(
          'Success',
          `User: '${data.removeGroupMember.username}' has been removed.`
        )
      },
      onError(err) {
        Alert.alert(err.name, err.message)
      },
    }
  )

  const removeGroupMemberAction = username => {
    removeGroupMember({
      variables: {
        input: { username, groupId },
      },
    })
  }

  if (loading || removingMember) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <Container>
      <List
        dataArray={data.getGroupMembers}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <UserPreview
            user={item}
            right={
              <Button
                small
                style={{ backgroundColor: '#f9f9f9' }}
                onPress={() => removeGroupMemberAction(item.username)}
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
      ></List>
    </Container>
  )
}

export default MembersScreen
