import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'

const ListItem = ({ title }) => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
)

const HomeScreen = () => {
  const { data, loading } = useQuery(gql`
    query {
      courses {
        code
        title
      }
    }
  `)

  if (loading) return <Loading />

  return (
    <FlatList
      style={styles.list}
      data={data.courses}
      keyExtractor={({ code }) => code}
      renderItem={({ item }) => <ListItem {...item} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  item: {
    marginBottom: 20,
  },
})

export default HomeScreen
