export function getDistance (oLat, oLon, nLat, nLon) {
  const R = 6371 // km
  const dLat = toRad(nLat - oLat)
  const dLon = toRad(nLon - oLon)
  const lat1 = toRad(oLat)
  const lat2 = toRad(nLat)

  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2)
  const c = 2 * Math.asin(Math.sqrt(a))
  return c * R
}

// Converts numeric degrees to radians
function toRad (Value) {
  return (Value * Math.PI) / 180
}

export default getDistance
