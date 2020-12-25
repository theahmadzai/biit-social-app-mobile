import React from 'react'
import { Alert, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import MemberPreview from '../../components/MemberPreview'
import Loading from '../../components/Loading'

const GROUP_MEMBERS_QUERY = gql`
  query GetGroupMembers($id: ID!) {
    getGroupMembers(id: $id) {
      id
      username
      image
    }
  }
`

const MembersScreen = ({ route }) => {
  const { groupId } = route.params

  const { data, loading, error } = useQuery(GROUP_MEMBERS_QUERY, {
    variables: { id: groupId },
  })

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <FlatList
      data={data.getGroupMembers}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <MemberPreview {...item} />}
    />
  )
}

export default MembersScreen
