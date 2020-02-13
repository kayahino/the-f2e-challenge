import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'
import icon from '@/assets/img/location.svg'

const geojsonMarkerOptions = {
  radius: 8,
  fillColor: '#ff7800',
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

const locationIcon = $L.icon({
  iconUrl: icon,
  // shadowUrl: 'leaf-shadow.png',
  iconSize: [40, 40], // size of the icon
  iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
})

// const markers = []

const createMap = (divId, options) => {
  let map = $L.map(divId, options)
  console.log(map)
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
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(feature.properties.name)
        layer.storeID = feature.properties.id
      }
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

const setPosMarker = (map, latlng) => {
  const marker = $L.marker({ lat: latlng.latitude, lng: latlng.longitude }, { icon: locationIcon }).addTo(map)
  return marker
}

// const getBounds = (c1, c2) => {
//   return $L.latLngBounds(c1, c2)
// }

export default {
  createMap,
  createTileLayer,
  pinMark,
  showDistanceRange,
  setPosMarker
}
