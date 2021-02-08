import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WallScreen from '../../screens/WallScreen'
// import {useAuth} from '../../contexts/AuthContext'

const Stack = createStackNavigator()

const WallStack = () => {
  // const {user} = useAuth()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wall"
        component={WallScreen}
        options={{
          title: 'BSCS-8B',
        }}
      />
    </Stack.Navigator>
  )
}

export default WallStack
