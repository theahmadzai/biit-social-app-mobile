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
