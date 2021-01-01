import React, { useState } from 'react'
import { Alert } from 'react-native'
import { Container, List, Form, Item, Input, Icon, Button } from 'native-base'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import UserPreview from '../../components/UserPreview'
import Loading from '../../components/Loading'

const SEARCH_USERS_QUERY = gql`
  query SearchUsers($input: SearchUsersInput!) {
    searchUsers(input: $input) {
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

const ADD_GROUP_MEMBER_MUTATION = gql`
  mutation AddGroupMember($input: AddGroupMemberInput!) {
    addGroupMember(input: $input) {
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

const AddMembersScreen = ({ route }) => {
  const groupId = route.params.group.id

  const [searchFilter, setSearchFilter] = useState('')
  const [search, { data, loading, error }] = useLazyQuery(SEARCH_USERS_QUERY)

  const [addGroupMember, { loading: addingMember }] = useMutation(
    ADD_GROUP_MEMBER_MUTATION,
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
  if (error) {
    Alert.alert(error.name, error.message)
  }

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
      <List
        dataArray={data ? data.searchUsers : []}
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
      ></List>
    </Container>
  )
}

export default AddMembersScreen
