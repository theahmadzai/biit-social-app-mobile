import React, { useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Form, Item, Input, Icon, Button, Toast } from 'native-base'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SEARCH_USERS, GROUP_MEMBERS, ADD_GROUP_MEMBER } from '../../graphql'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'
import { profileName } from '../../utils'

const AddMembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const [searchFilter, setSearchFilter] = useState('')
  const [search, { data, loading, error }] = useLazyQuery(SEARCH_USERS)

  const [addGroupMember, { loading: addingMember }] = useMutation(
    ADD_GROUP_MEMBER,
    {
      onCompleted({ addGroupMember }) {
        Toast.show({
          text: `Added: ${profileName(addGroupMember)}`,
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
      update(cache, { data: { addGroupMember } }) {
        try {
          const { groupMembers } = cache.readQuery({
            query: GROUP_MEMBERS,
            variables: { id: groupId },
          })
          cache.writeQuery({
            query: GROUP_MEMBERS,
            variables: { id: groupId },
            data: { groupMembers: groupMembers.concat([addGroupMember]) },
          })
        } catch (err) {
          console.log(err.message)
        }
      },
    }
  )

  const searchUsersAction = () => {
    search({ variables: { input: { query: searchFilter } } })
  }

  const addGroupMemberAction = userId => {
    addGroupMember({ variables: { input: { userId, groupId } } })
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
                onPress={() => addGroupMemberAction(item.id)}
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
