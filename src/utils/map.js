import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'

const geojsonMarkerOptions = {
  radius: 8,
  fillColor: '#ff7800',
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

const createMap = (divId, options) => {
  let map = $L.map(divId, options)
  return map
}

const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options)
  tileLayer.addTo(map)
  return tileLayer
}

const pinMark = (map, data) => {
  $L
    .geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        return $L.circleMarker(latlng, geojsonMarkerOptions)
      }
    })
    .bindPopup((layer) => {
      return layer.feature.properties.name
    })
    .addTo(map)
}

const showDistanceRange = (map, latlng) => {
  const circle = $L.circleMarker(latlng, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 100
  }).addTo(map)
  return circle
}

export default {
  createMap,
  createTileLayer,
  pinMark,
  showDistanceRange
}
