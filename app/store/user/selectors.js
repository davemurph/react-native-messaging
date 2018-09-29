export const getUserItems = data => {
  return data ? Object.keys(data).map(key => {
    let user = data[key]
    let friends = user.friends ? Object.keys(user.friends) : []
    let userTransformed = {
      id: key,
      email: user.email,
      username: user.username,
      friends: friends
    }
    return userTransformed
  }) : []
}