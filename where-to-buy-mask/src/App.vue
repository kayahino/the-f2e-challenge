<template>
  <div id="app">
     <Header ref="header" @popup="state.popupOpen = true" @openModal="state.modalOpen = true" />
    <div class="wrapper">
      <keep-alive>
        <router-view class="container" />
      </keep-alive>
      <keep-alive>
        <Map class="map" v-if="!isMobile" />
      </keep-alive>
    </div>
    <transition name="slide" mode="out-in">
      <div class="howToBuy" ref="popup" v-if="state.popupOpen && menuOpen">
        <img src="@/assets/img/howToBuy.png" draggable="false" />
      </div>
    </transition>
    <transition name="popup" mode="out-in">
      <Modal v-if="state.modalOpen" ref="maskInfo">
        <div slot="modal-content">
          <img src="@/assets/img/howToBuy.png" draggable="false" />
        </div>
      </Modal>
    </transition>
    <div class="footer" ref="footer">
      <p>防疫專線 1922 ｜ 口罩資訊 1911</p>
      <p class="copyright">
        Design / PY Design
        <br />Made / Cleo
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, computed, ref, onBeforeUnmount } from '@vue/composition-api'
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal'
import { EventBus } from '@/utils/event-bus.js'
export default {
  name: 'app',
  components: {
    Header,
    Map: () => import('@/components/Map.vue'),
    Modal
  },
  setup (props, { root, emit }) {
    onMounted(async () => {
      root.$store.dispatch('getData')
      root.$store.dispatch('checkIfMobile')
      window.addEventListener('resize', resizeHandler)
      document.body.addEventListener('click', closeModal, true)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler)
      document.body.removeEventListener('click', closeModal)
      EventBus.$off()
    })

    const header = ref(null)
    const footer = ref(null)
    const popup = ref(null)
    const maskInfo = ref(null)
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
      isMobile: false,
      modalOpen: false
    })
    const isMobile = computed(() => root.$store.state.isMobile)

    function resizeHandler () {
      if (window.innerWidth < 600) root.$store.commit('SET_IS_MOBILE', true)
      else root.$store.commit('SET_IS_MOBILE', false)
    }

    const closeModal = (e) => {
      if (!state.modalOpen) return false
      if (maskInfo.value.$el.children[0].contains(e.target)) return false
      state.modalOpen = false
    }

    return {
      state,
      isMobile,
      popup,
      header,
      footer,
      menuOpen,
      maskInfo
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

.popup-enter,
.popup-leave-to {
  transform: scale(0.1);
  opacity: 0;
}

.popup-enter-to,
.popup-enter-leave {
  transform: scale(1);
  opacity: 1;
}

.popup-enter-active {
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.popup-leave-active {
  transition: transform 0.3s ease, opacity 0.2s ease 0.1s;
}

.popup__title {
  padding: 4px 50px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #E67E22;
  border-radius: 4px;
  white-space: nowrap;
}
.popup__table {
  table-layout: fixed;
  border-collapse:collapse;
  width: 100%;
}
.popup__table td,
.popup__table th {
  width: 8.6%;
  text-align: center;
}
.popup__table > thead tr {
  background-color: #34495E33;
}
.popup__table > thead::after {
  content: '';
  display: block;
  padding-bottom: 10px;
}
.popup__note {
  display: flex;
  margin-top: 10px;
}
.popup__note > div:first-child {
  flex: 0 0 35px;
}
.popup__note > div:nth-child(2) {
  flex: 1 1 auto;
}
.popup__table th:first-child {
  width: 12%;
  margin-right: 10px;
  text-align: left;
}
</style>
