import React from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, Card, CardItem, Body, Text } from 'native-base'
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'

const Timetable = () => {
  const { data, loading, error } = useQuery(
    gql`
      query StudenTimetable {
        studentTimetable {
          id
          time
          day
          class
          course
          teacher
        }
      }
    `
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container style={{ padding: 10 }}>
      <FlatList
        data={data.studentTimetable}
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
                <Text>{item.class}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{item.course}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{item.teacher}</Text>
              </Body>
            </CardItem>
          </Card>
        )}
      />
    </Container>
  )
}

export default Timetable
