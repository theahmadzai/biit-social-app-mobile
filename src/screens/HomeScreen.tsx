import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'

interface Course {
  code: string
  title: string
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  item: {
    marginBottom: 20,
  },
})

const ListItem = ({ title }: Course): JSX.Element => (
  <View style={styles.item}>
    <Text>{title}</Text>
  </View>
)

const HomeScreen = (): JSX.Element => {
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
      keyExtractor={({ code }: Course) => code}
      renderItem={({ item }) => <ListItem {...item} />}
    />
  )
}

export default HomeScreen
