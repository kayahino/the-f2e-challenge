<template>
  <div id="app">
    <Header ref="header" @popup="state.popupOpen = true" />
    <div class="wrapper">
      <keep-alive>
        <router-view class="container" ref="view" />
      </keep-alive>
      <Map class="map" />
    </div>
    <!-- <Map
      :coords="state.currentCoords"
      :maskData="state.maskData"
      v-if="state.tab === 'map' && state.isLoaded"
    />-->
    <transition name="slide" mode="out-in">
      <div class="howToBuy" ref="popup" v-if="state.popupOpen && menuOpen">
        <img src="@/assets/img/howToBuy.png" draggable="false" />
      </div>
    </transition>
    <div class="footer">
      <p>防疫專線 1922 ｜ 口罩資訊 1911</p>
      <p class="copyright">
        Design / PY Design
        <br />Made / Cleo
      </p>
    </div>
    <TopButton />
  </div>
</template>

<script>
import { reactive, onMounted, computed, ref, onUnmounted } from '@vue/composition-api'
import Header from '@/components/Header.vue'
import Map from '@/components/Map.vue'
import TopButton from '@/components/TopButton'
export default {
  name: 'app',
  components: {
    Header,
    Map,
    TopButton
  },
  setup (props, { root, emit }) {
    onMounted(async () => {
      root.$store.dispatch('getData')
      root.$store.dispatch('checkIfMobile')
      window.addEventListener('resize', resizeHandler)
      // const headerH = document.querySelector('.header').offsetHeight
      // popup.value.style = `top: ${headerH}px`
      if (isMobile.value) return false
      setTimeout(() => {
        const headerDOM = document.querySelector('.header')
        const footerDOM = document.querySelector('.footer')
        const containerHeight = window.innerHeight - headerDOM.offsetHeight - footerDOM.offsetHeight
        document.querySelector('.container').style = `height: ${containerHeight}px; overflow-y: auto;`
      }, 1000)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler)
    })

    const header = ref(null)
    const popup = ref(null)
    const view = ref(null)
    const menuOpen = computed(() => {
      if (!header.value.state.menuOpen) state.popupOpen = false
      return header.value.state.menuOpen
    })
    const state = reactive({
      tab: 'list',
      filterData: null,
      currentCoords: {},
      isLoaded: false,
      popupOpen: false,
      isMobile: false
    })

    const maskData = computed(() => root.$store.state.maskData)
    const isMobile = computed(() => root.$store.state.isMobile)

    function resizeHandler () {
      if (window.innerWidth > 600) state.showMap = true
      else state.showMap = false
    }

    function getCurrentGeoLocation () {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            pos => {
              resolve(pos.coords)
            },
            err => {
              console.warn(`ERROR ${err.code}: ${err.message}`)
              reject(err)
            }
          )
        }
      })
    }

    function getDistance (oLat, oLon, nLat, nLon) {
      const R = 6371 // km
      const dLat = toRad(nLat - oLat)
      const dLon = toRad(nLon - nLon)
      const lat1 = toRad(oLat)
      const lat2 = toRad(nLat)

      var a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2)
      var c = 2 * Math.asin(Math.sqrt(a))
      return c * R
    }

    // Converts numeric degrees to radians
    function toRad (Value) {
      return (Value * Math.PI) / 180
    }

    return {
      state,
      isMobile,
      maskData,
      getCurrentGeoLocation,
      getDistance,
      popup,
      header,
      menuOpen,
      view
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 320px;
  min-height: 100vh;
  color: #34495e;
  font-size: 16px;
}
.wrapper {
  flex: 1 0 auto;
  display: flex;

  .container {
    flex: 1 0 30%;
    width: 100%;
  }

  .map {
    flex: 1 1 70%;
  }
}

.footer {
  padding: 16px 24px;
  color: #fafafa;
  line-height: 1.6;
  background-color: #34495e;

  > p {
    margin: 0;
  }
  .copyright {
    margin-top: 8px;
    font-size: 12px;
    color: #566778;
  }
}

.howToBuy {
  position: absolute;
  top: 64px;
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #34495e;
  // transform: translateX(100%);
  z-index: 101;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter-to,
.slide-enter-leave {
  opacity: 1;
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.2s ease;
}
</style>
