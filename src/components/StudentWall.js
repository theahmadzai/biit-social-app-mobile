import React from 'react'
import { Alert, View, Text } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import Loading from './Loading'

const StudentWall = () => {
  const { user } = useAuth()

  const { data, loading, error } = useQuery(
    gql`
      query {
        whoami {
          id
          role
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
    <View>
      <Text>Student Wall: {JSON.stringify(data, 4, null)}</Text>
    </View>
  )
}

export default StudentWall
