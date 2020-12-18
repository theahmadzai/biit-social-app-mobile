import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { List, Avatar } from 'react-native-paper'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '../../components/Loading'
import { APP_URL } from '../../constants'

const Group = ({ navigation, ...group }) => {
  const { name, description, logo } = group

  return (
    <List.Item
      title={name}
      description={description}
      descriptionNumberOfLines={1}
      left={props => (
        <Avatar.Image {...props} source={{ uri: APP_URL + logo }} />
      )}
      onPress={() => {
        navigation.navigate('Group', { ...group })
      }}
    />
  )
}

const GroupsScreen = ({ navigation }) => {
  const {
    user: { id },
  } = useAuth()

  console.log(id)

  const { loading, error, data } = useQuery(
    gql`
      query getUserGroups($id: ID!) {
        user(id: $id) {
          id
          groups {
            id
            name
            logo
            description
          }
        }
      }
    `,
    {
      variables: { id },
    }
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
      data={data.user.groups}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => <Group navigation={navigation} {...item} />}
    />
  )
}

export default GroupsScreen
