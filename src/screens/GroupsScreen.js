import React from 'react'
import { StyleSheet, View, Text, Button, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import { useAuth } from '../contexts/AuthContext'

const GROUPS_QUERY = gql`
  query {
    groups {
      id
      name
      members {
        id
        username
      }
    }
  }
`

const Group = ({ navigation, ...group }) => {
  const { user } = useAuth()

  const { name, members, membersCount } = group

  let button = <Button title="Join" />

  if (members.find(i => i.id == user.id)) {
    button = <Button title="Joined" />
  }

  return (
    <View style={styles.group}>
      <Text>
        {name} ({membersCount})
      </Text>
      <View style={{ flexDirection: 'row' }}>
        {button}
        <View style={{ paddingLeft: 10 }}>
          <Button
            title="View"
            onPress={() => {
              navigation.navigate('Group', { ...group })
            }}
          />
        </View>
      </View>
    </View>
  )
}

const GroupsScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GROUPS_QUERY)

  if (loading) return <Loading />
  if (error)
    return (
      <View>
        <Text>`Error! ${error.message}`</Text>
      </View>
    )

  const groups = data.groups.map(group => ({
    ...group,
    membersCount: group.members.length,
  }))

  return (
    <FlatList
      data={groups}
      keyExtractor={({ name }) => name}
      renderItem={({ item }) => <Group navigation={navigation} {...item} />}
    />
  )
}

export default GroupsScreen

const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    margin: 10,
  },
})
