<template>
  <div
    class="mapContainer"
    id="map-container"
  >
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
let map = null

export default {
  name: 'mask-map',
  components: {},
  props: {
    coords: {
      default: () => {
        return {
          latitude: 25.033408,
          longitude: 121.564099
        }
      }
    },
    maskData: {
      required: true
    }
  },

  setup (props, { root }) {
    onMounted(async () => {
      createMap()
    })

    const state = reactive({
      rangeCircle: null
    })

    function createMap (la = 25.033408, long = 121.564099, zoom = 12) {
      map = root.$utils.map.createMap('map-container')
      const baseLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      root.$utils.map.createTileLayer(map, baseLayer, {
        minZoom: 8,
        maxZoom: 18
      })
      map.setView({ lng: long, lat: la }, zoom)
      root.$utils.map.pinMark(map, props.maskData)
      // showRange()
    }

    function flyToCurrentPos () {
      const { longitude, latitude } = props.coords
      if (map) {
        map.flyTo({ lng: longitude, lat: latitude }, 15)
        // state.rangeCircle.setLatLng({ lat: latitude, lng: longitude })
      } else {
        createMap(latitude, longitude, 15)
      }
    }

    // function showRange () {
    //   console.log(props.coords)
    //   const { latitude, longitude } = props.coords
    //   state.rangeCircle = root.$utils.map.showDistanceRange(map, { lat: latitude, lng: longitude })
    // }

    return {
      state,
      flyToCurrentPos
    }
  }
}
</script>

<style lang="">
</style>
