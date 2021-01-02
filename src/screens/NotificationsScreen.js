import React, { useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { Container, ListItem, Text, Body } from 'native-base'
import { gql, useSubscription } from '@apollo/client'
import Loading from '../components/Loading'

const NOTIFICATION_SUBSCRIPTION = gql`
  subscription {
    notification {
      title
    }
  }
`

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([])

  const { loading, error } = useSubscription(NOTIFICATION_SUBSCRIPTION, {
    async onSubscriptionData({ subscriptionData: { data } }) {
      setNotifications([...notifications, data.notification.title])
    },
  })

  if (loading) return <Loading />
  if (error) {
    Alert.alert(error.name, error.message)
  }

  return (
    <Container>
      <FlatList
        data={notifications}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem>
            <Body>
              <Text>{item}</Text>
            </Body>
          </ListItem>
        )}
      />
    </Container>
  )
}

export default NotificationsScreen
