const arrayChunk = (arr, chunkSize) => {
  const n = arr.length

  if (chunkSize >= n) {
    return [arr]
  }

  if (n === 0) {
    return []
  }

  const r = n % chunkSize
  const q = (n - r) / chunkSize
  const result = []

  for (var i = 0; i <= q; i++) {
    var items = arr.slice(i * chunkSize, i * chunkSize + chunkSize)

    if (items.length) {
      result.push(items)
    }
  }
  return result
}

export {
  arrayChunk
}
