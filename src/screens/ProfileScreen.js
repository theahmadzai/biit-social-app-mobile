import React from 'react'
import { Alert, View, StyleSheet, Text, Image } from 'react-native'
import { Container, ListItem, Left, Right, Icon } from 'native-base'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import Loading from '../components/Loading'
import { APP_URL } from '../constants'
import { profileName, profileDescription } from '../utils'

const ProfileScreen = ({ route }) => {
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
      variables: { id: route?.params?.userId ?? user.id },
    }
  )

  if (loading) return <Loading />
  if (error) Alert.alert(error.name, error.message)

  return (
    <Container>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: APP_URL + data.user.image }}
      />

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{profileName(data.user)}</Text>
          <Text>{profileDescription(data.user)}</Text>
        </View>

        {data.user.role === 'STUDENT' ? (
          <>
            <ListItem>
              <Left>
                <Text>Session:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.session}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Semester:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.semester}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Program:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.program}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Section:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.section}</Text>
              </Right>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Left>
                <Text>Designation:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.designation.trim()}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Status:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.status.trim()}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Phone:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.phone.trim()}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Email:</Text>
              </Left>
              <Right>
                <Text>{data.user.profile.email.trim()}</Text>
              </Right>
            </ListItem>
          </>
        )}
        <ListItem noBorder>
          <Left>
            <Text>Groups joined:</Text>
          </Left>
          <Right>
            <Text>{data?.user?.groups?.length ?? 0}</Text>
          </Right>
        </ListItem>
      </View>
    </Container>
  )
}

export default ProfileScreen

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
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#393939',
    fontWeight: '600',
  },
})
