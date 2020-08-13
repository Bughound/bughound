export default (value) => {
  if (value) {
    localStorage.setItem('authtoken', value)
  } else {
    localStorage.removeItem('authtoken')
  }
}
