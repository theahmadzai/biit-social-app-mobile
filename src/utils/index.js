export const profileName = profile => {
  let name = profile.firstName
  if (profile.middleName.trim().length) name += ` ${profile.middleName}`
  if (profile.lastName.trim().length) name += ` ${profile.lastName}`
  return name
}
