import React, { useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Form, Item, Input, Icon, Button } from 'native-base'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SEARCH_USERS, GROUP_MEMBERS, ADD_GROUP_MEMBER } from '../../graphql'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'

const AddMembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const [searchFilter, setSearchFilter] = useState('')
  const [search, { data, loading, error }] = useLazyQuery(SEARCH_USERS)

  const [addGroupMember, { loading: addingMember }] = useMutation(
    ADD_GROUP_MEMBER,
    {
      onCompleted(data) {
        Alert.alert(
          'Success',
          `User: '${data.addGroupMember.username}' has been added.`
        )
      },
      onError(err) {
        Alert.alert(err.name, err.message)
      },
      update(cache, { data: { addGroupMember } }) {
        const { groupMembers } = cache.readQuery({
          query: GROUP_MEMBERS,
          variables: { id: groupId },
        })
        cache.writeQuery({
          query: GROUP_MEMBERS,
          variables: { id: groupId },
          data: { groupMembers: groupMembers.concat([addGroupMember]) },
        })
      },
    }
  )

  const searchUsersAction = () => {
    search({
      variables: { input: { query: searchFilter } },
    })
  }

  const addGroupMemberAction = username => {
    addGroupMember({
      variables: {
        input: { username, groupId },
      },
    })
  }

  if (loading || addingMember) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <Form style={{ padding: 10 }}>
        <Item regular>
          <Input
            placeholder="Search users..."
            value={searchFilter}
            onChangeText={setSearchFilter}
          />
          <Icon active name="search" onPress={searchUsersAction} />
        </Item>
      </Form>
      <FlatList
        data={data ? data.searchUsers : []}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <UserPreview
            user={item}
            right={
              <Button
                small
                style={{ backgroundColor: '#f9f9f9' }}
                onPress={() => addGroupMemberAction(item.username)}
              >
                <Icon
                  active
                  name="add"
                  style={{ fontSize: 24, color: 'green' }}
                />
              </Button>
            }
          />
        )}
      />
    </Container>
  )
}

export default AddMembersScreen
