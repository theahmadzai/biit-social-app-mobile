import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import HomeScreen from './../screens/HomeScreen'
import SettingsScreen from './../screens/SettingsScreen'
import SignInScreen from './../screens/SignInScreen'

const Tab = createBottomTabNavigator()

const BottomNavigation = (): JSX.Element => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarBadge: 2,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={SignInScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="logout" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
)

export default BottomNavigation
