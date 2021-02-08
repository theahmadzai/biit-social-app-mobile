import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { Menu } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import HomeScreen from '../../screens/HomeScreen'
import CreateWallPostScreen from '../../screens/CreateWallPostScreen'
import DatesheetScreen from '../../screens/DatesheetScreen'
import TimetableScreen from '../../screens/TimetableScreen'
import { useAuth } from '../../contexts/AuthContext'

const Stack = createStackNavigator()

const HomeStack = () => {
  const [visible, setVisible] = useState(false)

  const { user } = useAuth()

  const openMenu = () => setVisible(true)

  const closeMenu = () => setVisible(false)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => {
            user.role === 'STUDENT' ? (
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={openMenu}>
                    <Feather
                      name="more-vertical"
                      size={18}
                      style={{ padding: 20 }}
                    />
                  </TouchableOpacity>
                }
              >
                <Menu.Item
                  title="Datesheet"
                  onPress={() => navigation.navigate('Datesheet')}
                />
                <Menu.Item
                  title="Timetable"
                  onPress={() => navigation.navigate('Timetable')}
                />
              </Menu>
            ) : null
          },
        })}
      />
      <Stack.Screen
        name="CreateWallPost"
        component={CreateWallPostScreen}
        options={{
          title: 'Create Wall Post',
        }}
      />
      <Stack.Screen name="Datesheet" component={DatesheetScreen} />
      <Stack.Screen name="Timetable" component={TimetableScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack
