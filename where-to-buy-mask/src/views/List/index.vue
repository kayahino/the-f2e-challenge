<script>
import { reactive, onMounted, computed, watch, onBeforeUnmount, ref } from '@vue/composition-api'
import getDistance from '@/utils/getDistance.js'
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/event-bus.js'
import TopButton from '@/components/TopButton'
import ListCard from '@/components/ListCard'

export default {
  components: {
    TopButton,
    ListCard
  },
  setup (props, { root, emit, parent }) {
    onMounted(() => {
      state.status = getDay()
    })
    onBeforeUnmount(() => {
    })

    const headerHeight = computed(() => parent.header.$el.offsetHeight)
    const footerHeight = computed(() => parent.footer.offsetHeight)
    const frameHeight = computed(() => window.innerHeight - headerHeight.value - footerHeight.value)
    const state = reactive({
      status: '雙數',
      page: 1,
      max: 20,
      range: 2,
      isMore: false,
      sort: 'distance',
      remained: 0,
      modalOpen: false
    })

    const maskData = computed(() => root.$store.state.maskData)
    const location = computed(() => root.$store.state.location)
    const isLoading = computed(() => root.$store.state.isLoading)
    const isMobile = computed(() => root.$store.state.isMobile)
    const errMsg = computed(() => root.$store.state.errMsg)
    const lastUpdatedTime = computed(() => root.$store.state.lastUpdated)
    const userStatus = computed(() => root.$store.state.status)
    const dataFiltered = computed(() => {
      return pageController(dataSorted.value, state.range, state.page)
    })

    const dataSorted = computed(() => {
      return sortData(areaData.value, state.sort)
    })

    const areaData = ref(null)
    watch(location, (prev, next) => {
      if (location.value.latitude) {
        state.page = 1
        areaData.value = null
        areaData.value = filter(state.range, state.page)
      }
    })

    function filter (range, page) {
      if (!maskData.value.features) return false
      const filteredAll = maskData.value.features.filter(el => {
        const { longitude, latitude } = location.value
        return getDistance(latitude, longitude, el.geometry.coordinates[1], el.geometry.coordinates[0]) <= range
      })
      return filteredAll
    }

    const pageController = (data, range, page) => {
      if (!data) return false
      const filteredByPage = data.slice(0, page * state.max)
      if (filteredByPage.length < data.length) {
        state.isMore = true
        state.remained = data.length - filteredByPage.length
      } else {
        state.isMore = false
        state.remained = 0
      }
      return filteredByPage
    }

    function sortData (rawData, pattern) {
      const sortPattern = {
        distance: sortByDistance,
        stock: sortByStock
      }
      if (!rawData) return false
      return sortPattern[pattern](rawData)
    }

    function sortByStock (data) {
      return data.sort((a, b) => {
        return a.properties.mask_adult < b.properties.mask_adult ? 1 : -1
      })
    }

    function sortByDistance (data) {
      const { longitude, latitude } = location.value
      return data.sort((a, b) => {
        const aD = getDistance(latitude, longitude, a.geometry.coordinates[1], a.geometry.coordinates[0])
        const bD = getDistance(latitude, longitude, b.geometry.coordinates[1], b.geometry.coordinates[0])
        return aD > bD ? 1 : -1
      })
    }

    function getDay () {
      const day = new Date().getDay()
      return day === 0 ? '雙數' : day % 2 !== 0 ? '奇數' : '偶數'
    }

    function showPosition (id, location) {
      EventBus.$emit('showPos', id, location)
    }

    return {
      state,
      location,
      userStatus,
      dataFiltered,
      lastUpdatedTime,
      isLoading,
      isMobile,
      errMsg,
      showPosition,
      frameHeight
    }
  },
  methods: {
    ...mapActions([
      'getLocation',
      'getData',
      'setDataCache'
    ])
  }
}
</script>
<template src="./template.html" />
<style lang="scss" src="./style.scss" scoped />
