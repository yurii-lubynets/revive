export function formatDate(lastMessageDate) {
  if (!lastMessageDate) {
    return ''
  }
  const date = new Date(lastMessageDate)

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()

  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes
  const time = hours + ':' + minutes + ' ' + ampm

  return `${month} ${day}, ${year}, ${time}`
}
