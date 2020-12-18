import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { List, Avatar } from 'react-native-paper'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/Loading'
import { APP_URL } from '../../constants'

const MembersScreen = ({ route }) => {
  const { groupId: id } = route.params

  const { data, loading, error } = useQuery(
    gql`
      query GetGroupPosts($id: ID!) {
        group(id: $id) {
          id
          members {
            id
            username
            image
          }
        }
      }
    `,
    { variables: { id } }
  )

  if (loading) return <Loading />
  if (error)
    return (
      <View>
        <Text>`Error! ${error.message}`</Text>
      </View>
    )

  return (
    <FlatList
      data={data.group.members}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <List.Item
          title={item.username}
          left={props => (
            <Avatar.Image {...props} source={{ uri: APP_URL + item.image }} />
          )}
          onPress={() => {}}
        />
      )}
    />
  )
}

export default MembersScreen
