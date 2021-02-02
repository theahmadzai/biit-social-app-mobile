import React from 'react'
import {
  Alert,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/Loading'
import { APP_URL } from '../constants'
import { profileName, profileDescription } from '../utils'

const ProfileScreen = ({ route }) => {
  const { user: authUser, logout } = useAuth()

  const id = route.params && route.params.id ? route.params.id : authUser.id

  const { data, loading } = useQuery(
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
        }
      }
    `,
    {
      variables: { id },
      onError(err) {
        Alert.alert(err.name, err.message)
      },
    }
  )

  if (loading) return <Loading />

  return (
    <ScrollView style={styles.container}>
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
              <Text>Designation: {data.user.profile.designation.trim()}</Text>
              <Text>Status: {data.user.profile.status.trim()}</Text>
              <Text>Phone: {data.user.profile.phone.trim()}</Text>
              <Text>Email: {data.user.profile.email.trim()}</Text>
            </>
          )}
          {route.params ? null : (
            <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'teal',
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
    fontSize: 28,
    color: '#393939',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: 'teal',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
