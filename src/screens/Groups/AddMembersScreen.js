import React, { useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Form, Item, Input, Icon, Button, Toast } from 'native-base'
import { useLazyQuery, useMutation } from '@apollo/client'
import { SEARCH_USERS, GROUP_USERS, ADD_GROUP_USER } from '../../graphql'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'
import { profileName } from '../../utils'

const AddMembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const [searchFilter, setSearchFilter] = useState('')
  const [search, { data, loading, error }] = useLazyQuery(SEARCH_USERS)

  const [addGroupUser, { loading: addingUser }] = useMutation(ADD_GROUP_USER, {
    onCompleted({ addGroupUser }) {
      Toast.show({
        text: `Added: ${profileName(addGroupUser)}`,
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
    update(cache, { data: { addGroupUser } }) {
      try {
        const { groupUsers } = cache.readQuery({
          query: GROUP_USERS,
          variables: { id: groupId },
        })
        cache.writeQuery({
          query: GROUP_USERS,
          variables: { id: groupId },
          data: { groupUsers: groupUsers.concat([addGroupUser]) },
        })
      } catch (err) {
        console.log(err.message)
      }
    },
  })

  const searchUsersAction = () => {
    search({ variables: { input: { query: searchFilter } } })
  }

  const addGroupUserAction = userId => {
    addGroupUser({ variables: { input: { userId, groupId } } })
  }

  if (loading || addingUser) return <Loading />
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
                onPress={() => addGroupUserAction(item.id)}
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
