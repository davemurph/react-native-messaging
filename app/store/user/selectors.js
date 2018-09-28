export const getUserItems = data => {
  return data ? Object.keys(data).map(key => {
    let user = data[key]
    let friends = user.friends ? Object.keys(user.friends) : []
    user.friends = friends
    return user
  }) : []
}