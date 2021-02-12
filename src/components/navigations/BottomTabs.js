import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import HomeStack from './HomeStack'
import WallStack from './WallStack'
import GroupsStack from './GroupsStack'
import UserStack from './UserStack'
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
        name="Wall"
        component={WallStack}
        options={{
          tabBarIcon: props => <Feather {...props} name="target" />,
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
        name="User"
        component={UserStack}
        options={{
          tabBarIcon: props => <Feather {...props} name="user" />,
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
