import React from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Card, CardItem, Body, Text } from 'native-base'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'

const Datesheet = () => {
  const { data, loading, error } = useQuery(
    gql`
      query StudentDatesheet {
        studentDatesheet {
          id
          title
          time
          day
          date
          class
          course
        }
      }
    `
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container style={{ padding: 10 }}>
      <Text
        style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1 }}
      >
        {data.studentDatesheet.length ? data.studentDatesheet[0].title : null}
      </Text>
      <FlatList
        data={data.studentDatesheet}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Card>
            <CardItem>
              <Body>
                <Text>{item.time}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{item.day}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{item.date}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{item.course}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      />
    </Container>
  )
}

export default Datesheet
