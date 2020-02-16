import 'leaflet/dist/leaflet.css'
import $L from 'leaflet'
import icon from '@/assets/img/location.svg'
import convert from './convert-data'

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

const createMap = (divId, options, data) => {
  let map = $L.map(divId, options)
  pinMark(map, data)
  return map
}

const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options)
  tileLayer.addTo(map)
  return tileLayer
}

const pinMark = (map, data) => {
  return new Promise((resolve, reject) => {
    $L
      .geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          return $L.circleMarker(latlng, geojsonMarkerOptions)
        },
        onEachFeature: (feature, layer) => {
          const tableData = convert.convert(feature.properties.available)
          const template = convert.tableTemplate(tableData)
          layer.bindPopup(`
          <h3 class="popup__title">${feature.properties.name}</h3>
          ${template}
          <div class="popup__note">
            <div>備註</div><div>${feature.properties.note.length === 0 ? '無' : feature.properties.note}</div>
          </div>
        `)
          layer.storeID = feature.properties.id
        }
      })
      .addTo(map)
    resolve()
  })
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

// function dataToTable (dataString) {
//   const dataAry = dataString.split('、')
//   const dataTable = {
//     morning: [],
//     afternoon: [],
//     evening: []
//   }
//   dataAry.forEach(el => {
//     if (el.includes('上午')) {
//       dataTable.morning.push(el.split('上午')[0])
//     } else if (el.includes('下午')) {
//       dataTable.afternoon.push(el.split('下午')[0])
//     } else {
//       dataTable.evening.push(el.split('晚上')[0])
//     }
//   })

//   return dataTable
// }

export default {
  createMap,
  createTileLayer,
  pinMark,
  showDistanceRange,
  setPosMarker
}
