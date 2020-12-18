import React from 'react'
import { View, Text, FlatList } from 'react-native'
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

const GroupsScreen = ({ navigation }) => {
  const {
    user: { id },
  } = useAuth()

  const { loading, error, data } = useQuery(USER_GROUPS_QUERY, {
    variables: { id },
  })

  if (loading) return <Loading />
  if (error)
    return (
      <View>
        <Text>`Error! ${error.message}`</Text>
      </View>
    )

  return (
    <FlatList
      data={data.getUserGroups}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => (
        <GroupPreview navigation={navigation} {...item} />
      )}
    />
  )
}

export default GroupsScreen
