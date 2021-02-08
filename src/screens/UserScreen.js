import React from 'react'
import { Alert, View, StyleSheet, Text, Image, FlatList } from 'react-native'
import { Container } from 'native-base'
import { gql, useQuery } from '@apollo/client'
import GroupPreview from '../components/GroupPreview'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/Loading'
import { APP_URL } from '../constants'
import { profileName, profileDescription } from '../utils'

const UserScreen = () => {
  const { user } = useAuth()

  const { data, loading, error } = useQuery(
    gql`
      query GetUserProfile($id: ID!) {
        user(id: $id) {
          id
          username
          image
          role
          profile {
            firstName
            middleName
            lastName

            ... on StudentProfile {
              session
              program
              section
              semester
            }

            ... on EmployeeProfile {
              designation
              status
              phone
              email
            }
          }
          groups {
            id
            name
            description
            image
          }
        }
      }
    `,
    {
      variables: { id: user.id },
    }
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}></View>
            <Image
              style={styles.avatar}
              source={{ uri: APP_URL + data.user.image }}
            />
            <View style={styles.body}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>{profileName(data.user)}</Text>
                <Text>{profileDescription(data.user)}</Text>
                {data.user.role === 'STUDENT' ? (
                  <>
                    <Text>Session: {data.user.profile.session}</Text>
                    <Text>Program: {data.user.profile.program}</Text>
                    <Text>Semester: {data.user.profile.semester}</Text>
                    <Text>Section: {data.user.profile.section}</Text>
                  </>
                ) : (
                  <>
                    <Text>
                      Designation: {data.user.profile.designation.trim()}
                    </Text>
                    <Text>Status: {data.user.profile.status.trim()}</Text>
                    <Text>Phone: {data.user.profile.phone.trim()}</Text>
                    <Text>Email: {data.user.profile.email.trim()}</Text>
                  </>
                )}
              </View>
            </View>
          </>
        }
        data={data.user.groups}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <GroupPreview group={item} />}
      />
    </Container>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#008e50',
    height: 100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 30,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 24,
    color: '#393939',
    fontWeight: '600',
  },
})
