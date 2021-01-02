import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAuthToken = async () => {
  let auth = await AsyncStorage.getItem('auth')
  let token = null

  if (auth) {
    const authState = JSON.parse(auth)

    if ('token' in authState) {
      token = authState.token
    }
  }

  return token ? `Bearer ${token}` : null
}

export const profileName = ({ profile }) => {
  let name = profile.firstName.trim()
  if (profile.middleName.trim().length) name += ` ${profile.middleName.trim()}`
  if (profile.lastName.length) name += ` ${profile.lastName.trim()}`
  return name
}

export const profileDescription = ({ role, username }) => {
  if (role === 'STUDENT') {
    return `Student (${username})`
  }

  if (role === 'TEACHER') {
    return `Teacher (${username})`
  }

  return ''
}
