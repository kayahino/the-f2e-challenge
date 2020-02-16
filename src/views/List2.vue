<template>
  <div class="list-page">
    <div class="location-bar" @click="$router.push({ name: 'search' })">
      <p class="location" v-if="!userStatus">請選擇欲查找的區域</p>
      <p class="location" v-else-if="userStatus === 'LOCATE_BY_LATLNG'">目前位置</p>
      <p class="location" v-else>{{ userStatus }}</p>
      <div class="locate-btn">
        <img src="@/assets/img/ic_location.png" draggable="false">
      </div>
    </div>
    <div class="content">
      <div class="status"><span>{{ state.status }}</span> 購買日</div>
      <div class="help">
        <div class="icon">?</div>
        <div class="tooltip">
          身分證末一碼為 {{ state.status === '雙數' ? '奇數或偶數' : state.status }}<br />
          可以在此天購買口罩
        </div>
      </div>
    </div>
    <div class="info">
     <div>
       距離方圓 1 公里 以內的供應商 <br />
       資訊更新時間 {{ lastUpdatedTime }}
     </div>
     <div class="refresh">
       <div :class="['btn', dataFiltered ? '' : 'disabled']" @click="getData">
         重整列表
       </div>
     </div>
   </div>
   <div class="loading" v-if="isLoading">
     <p v-if="!errMsg">Loading...</p>
     <p v-else>{{ errMsg }}</p>
   </div>
   <div class="mask-list" v-else>
    <div class="filter">
      <div class="filter-icon"><i class="fas fa-sort-amount-down-alt"></i></div>
      <div :class="['filter-btn', state.sort === 'distance' ? 'active' : '']" @click="state.sort = 'distance'">依距離</div>
      <div :class="['filter-btn', state.sort === 'stock' ? 'active' : '']" @click="state.sort = 'stock'">依成人口罩數目</div>
    </div>
    <div v-for="item in dataFiltered" :key="item.properties.id">
      <ListCard :item="item" @showPosition="showPosition" />
    </div>
    <div class="see-more" v-if="state.isMore">
      <p>尚有 {{ state.remained }} 筆</p>
      <div class="btn" @click="seeMore">查看更多</div>
    </div>
   </div>
   <!-- <TopButton /> -->
  </div>
</template>

<script>
import { reactive, onMounted, computed, watch, onBeforeUnmount, ref } from '@vue/composition-api'
import getDistance from '@/utils/getDistance.js'
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/event-bus.js'
// import TopButton from '@/components/TopButton'
import ListCard from '@/components/ListCard'

export default {
  components: {
    // TopButton,
    ListCard
  },
  setup (props, { root, emit }) {
    onMounted(() => {
      state.status = getDay()
    })
    onBeforeUnmount(() => {
      console.log('unmounted')
    })
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
    const errMsg = computed(() => root.$store.state.errMsg)
    const lastUpdatedTime = computed(() => root.$store.state.lastUpdated)
    const userStatus = computed(() => root.$store.state.status)
    // const dataCache = computed(() => root.$store.state.dataCache)
    const dataFiltered = computed(() => {
      return pageController(dataSorted.value, state.range, state.page)
    })

    const dataSorted = computed(() => {
      return sortData(areaData.value, state.sort)
    })

    const areaData = ref(null)
    watch(location, (prev, next) => {
      if (location.value.latitude) {
        console.log('change')
        state.page = 1
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
      // const [...newData] = rawData
      // return sortPattern[pattern](newData)
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

    function seeMore () {
      state.page += 1
      // dataFiltered.value = filter(state.range, state.page)
    }

    // function toSearchPage () {
    //   root.$router.push({ name: 'search' })
    //   //  state.page = 1
    //   //  root.$store.dispatch('getLocation')
    // }

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
      maskData,
      dataFiltered,
      lastUpdatedTime,
      isLoading,
      errMsg,
      seeMore,
      showPosition
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
