<template>
  <div class="Map">
    <div id="map-container"></div>
  </div>
</template>

<script>
import { onMounted, reactive, computed, watch } from '@vue/composition-api'
import { EventBus } from '@/utils/event-bus.js'
let map = null
let marker = null

export default {
  name: 'mask-map',
  components: {},

  setup (props, { root }) {
    onMounted(async () => {
      createMap()
      EventBus.$on('showPos', (id, latlng) => {
        const targetMarker = Object.values(map._layers).find(layer => layer.storeID === id)
        focusPoint(latlng, targetMarker)
      })
    })

    const state = reactive({
      rangeCircle: null
    })

    const maskData = computed(() => root.$store.state.maskData)
    const coords = computed(() => root.$store.state.location)

    function createMap (la = 25.033408, long = 121.564099, zoom = 12) {
      map = root.$utils.map.createMap('map-container', {
        center: { lng: long, lat: la },
        zoom: zoom,
        minZoom: 8,
        maxZoom: 16
      })
      const baseLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      root.$utils.map.createTileLayer(map, baseLayer, {
        minZoom: 8,
        maxZoom: 18
      })
      console.log(map.getCenter())
      // map.setView(, zoom)
      // showRange()
    }

    watch(coords, (prev, next) => {
      if (map && coords.value.latitude) {
        const { latitude, longitude } = coords.value
        flyToCurrentPos()
        console.log(map.getCenter(), coords.value)
        root.$utils.map.pinMark(map, maskData.value)
        if (!marker) {
          marker = root.$utils.map.setPosMarker(map, coords.value)
          marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup()
        } else {
          marker.setLatLng({ lat: latitude, lng: longitude })
        }
      }
    })

    function flyToCurrentPos () {
      const { longitude, latitude } = coords.value
      if (map) {
        // const oCoords = Object.values(map.getCenter())
        // const nCoords = [latitude, longitude]
        // map.fitBounds([oCoords, nCoords], {
        //   paddingBottomRight: [80, 80],
        //   maxZoom: 16
        // })
        map.setView({ lng: longitude, lat: latitude }, 15)
        // state.rangeCircle.setLatLng({ lat: latitude, lng: longitude })
      } else {
        createMap(latitude, longitude, 15)
      }
    }

    function focusPoint (latlng, marker) {
      map.flyTo(latlng)
      marker.openPopup()
    }

    // function showRange () {
    //   console.log(props.coords)
    //   const { latitude, longitude } = props.coords
    //   state.rangeCircle = root.$utils.map.showDistanceRange(map, { lat: latitude, lng: longitude })
    // }

    return {
      state,
      coords,
      maskData,
      flyToCurrentPos,
      focusPoint
    }
  }
}
</script>

<style lang="scss" scoped>
.Map {
  width: 100%;
}

#map-container {
  height: 100%;
}
</style>
