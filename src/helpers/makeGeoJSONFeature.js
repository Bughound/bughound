export default (latitude, longitude, properties = {}) => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: properties,
        geometry: {
          type: 'Point',
          coordinates: [
            longitude,
            latitude
          ]
        }
      }
    ]
  }
}
