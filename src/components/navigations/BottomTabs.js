import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import HomeStack from './HomeStack'
import GroupsStack from './GroupsStack'
import ProfileStack from './UserStack'
import NotificationsStack from './NotificationsStack'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#008e50',
        inactiveTintColor: '#000000',
        showLabel: false,
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: props => <Feather {...props} name="activity" />,
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsStack}
        options={{
          tabBarIcon: props => <Feather {...props} name="users" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileStack}
        options={{
          tabBarIcon: props => <Feather {...props} name="settings" />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStack}
        options={{
          tabBarBadge: 2,
          tabBarIcon: props => <Feather {...props} name="bell" />,
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
