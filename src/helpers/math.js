const mapRange = (number, inMin, inMax, outMin, outMax) => {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

const inRange = (x, min, max) => {
  return ((x - min) * (x - max) <= 0)
}

export {
  inRange,
  mapRange
}
