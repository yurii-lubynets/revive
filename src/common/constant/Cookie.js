export const createCookie = (name, value, days) => {
  let expires
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toGMTString()}`
  } else {
    expires = ''
  }
  document.cookie = `${name}=${value}${expires}path=/`
}
export const readCookie = name => {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}
export const deleteCookie = name => (document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`)
