import React from 'react'
import { StyleSheet, Alert, FlatList } from 'react-native'
import { FAB } from 'react-native-paper'
import { gql, useQuery } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../contexts/AuthContext'
import GroupPreview from '../../components/GroupPreview'
import Loading from '../../components/Loading'

const USER_GROUPS_QUERY = gql`
  query GetUserGroups($id: ID!) {
    getUserGroups(id: $id) {
      id
      name
      description
      image
    }
  }
`

const GroupsScreen = () => {
  const navigation = useNavigation()

  const { user } = useAuth()

  const { data, loading, error } = useQuery(USER_GROUPS_QUERY, {
    variables: { id: user.id },
  })

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="black"
        onPress={() => console.log('abc')}
        // onPress={() => {
        //
        //   navigation.navigate('CreateGroup')
        // }}
        // loading={true}
      />
      <FlatList
        data={data.getUserGroups}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <GroupPreview {...item} />}
      />
    </>
  )
}

export default GroupsScreen

const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'white',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
