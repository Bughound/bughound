export default (date) => {
  const present = new Date()
  const created = new Date(date)

  var seconds = Math.floor((present - created) / 1000)
  var minutes = Math.floor(seconds / 60)
  var hours = Math.floor(minutes / 60)
  var days = Math.floor(hours / 24)

  hours = hours - (days * 24)
  minutes = minutes - (days * 24 * 60) - (hours * 60)
  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
