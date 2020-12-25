import React from 'react'
import { Alert, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../../contexts/AuthContext'
import GroupPreview from '../../components/GroupPreview'
import Loading from '../../components/Loading'

const USER_GROUPS_QUERY = gql`
  query GetUserGroups($id: ID!) {
    getUserGroups(id: $id) {
      id
      name
      logo
      description
    }
  }
`

const GroupsScreen = () => {
  const { user } = useAuth()

  const { data, loading, error } = useQuery(USER_GROUPS_QUERY, {
    variables: { id: user.id },
  })

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <FlatList
      data={data.getUserGroups}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <GroupPreview {...item} />}
    />
  )
}

export default GroupsScreen
