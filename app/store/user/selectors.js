export const getUserItems = data => {
  return data ? Object.keys(data).map(key => data[key]) : []
}