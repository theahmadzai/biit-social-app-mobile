import React from 'react'
import { Alert, RefreshControl, FlatList } from 'react-native'
import { Container, ListItem, Body, Text } from 'native-base'
import { useQuery } from '@apollo/client'
import { TEACHER_CLASSES } from '../graphql'
import Loading from '../components/Loading'
import { useNavigation } from '@react-navigation/native'

const TeacherWallScreen = () => {
  const { navigate } = useNavigation()

  const { data, loading, error, refetch, networkStatus } = useQuery(
    TEACHER_CLASSES
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        data={data?.teacherClasses ?? []}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ListItem onPress={() => navigate('Class', { classId: item.id })}>
            <Body>
              <Text>{item.name}</Text>
            </Body>
          </ListItem>
        )}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={networkStatus === 4}
          />
        }
      />
    </Container>
  )
}

export default TeacherWallScreen
