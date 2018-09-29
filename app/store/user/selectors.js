import generateAvatarUrl from '../../services/avatar'

export const getUserItems = data => {
  return data ? Object.keys(data).map(key => {
    let user = data[key]
    let friends = user.friends ? Object.keys(user.friends) : []
    let userTransformed = {
      id: key,
      email: user.email,
      username: user.username,
      avatarUrl: generateAvatarUrl(128, user.email),
      friends: friends
    }
    return userTransformed
  }) : []
}