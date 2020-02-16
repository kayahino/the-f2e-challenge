<template>
  <div class="card" @click="clickHandler">
    <div class="card__stock">
      <div :class="['stock', item.properties.mask_adult > 100 ? 'green' : item.properties.mask_adult > 0? 'orange' : 'gray']">
        <div class="title">成人口罩數量</div>
        <div class="quantity">{{ item.properties.mask_adult }}<span>片</span></div>
      </div>
      <div :class="['stock', item.properties.mask_child > 100 ? 'green' : item.properties.mask_child > 0 ? 'orange' : 'gray']">
        <div class="title">兒童口罩數量</div>
        <div class="quantity">{{ item.properties.mask_child }}<span>片</span></div>
      </div>
    </div>
    <div class="card__storeInfo">
      <div class="store-name">
        <div>{{ item.properties.name }} <span class="distance">{{ distance.toFixed(2) }} km</span></div>
      </div>
      <div class="store-info">
        <div class="title">地址</div>
        <div class="content">{{ item.properties.address }}</div>
        <div class="tool">
          <a :href="`http://maps.google.com/?q=${item.properties.name}`" target="_blank">於地圖查看</a>
        </div>
      </div>
      <div class="store-info">
        <div class="title">電話</div>
        <div class="content">{{ item.properties.phone }}</div>
        <div class="tool">
          <a :href="`tel:${item.properties.phone}`">撥打電話</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import getDistance from '@/utils/getDistance.js'
export default {
  props: {
    item: {
      required: true
    }
  },
  setup (props, { root, emit }) {
    onMounted(() => {
    })
    onBeforeUnmount(() => {
      distance.value = null
    })
    const isMobile = computed(() => root.$store.state.isMobile)
    const location = computed(() => root.$store.state.location)
    const distance = ref(getDistance(location.value.latitude, location.value.longitude, props.item.geometry.coordinates[1], props.item.geometry.coordinates[0]))

    function seeOnMap (latitude, longitude) {
      const baseURL = 'http://maps.google.com/?q='
      return `${baseURL}${latitude},${longitude}`
    }

    function clickHandler (e) {
      const { coordinates } = props.item.geometry
      if (isMobile.value) return false
      emit('showPosition', props.item.properties.id, { lat: coordinates[1], lng: coordinates[0] })
    }

    return {
      getDistance,
      location,
      isMobile,
      distance,
      seeOnMap,
      clickHandler
    }
  }
}
</script>

<style lang="scss">
  .card {
    margin-bottom: 24px;
    padding: 15px 18px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 3px 10px #0000001A;
    line-height: 1.6;
    cursor: pointer;
  }
  .card__stock {
    display: flex;
    justify-content: space-between;

    .quantity {
      margin-top: 10px;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 1px;

      > span {
        margin-left: 6px;
        font-weight: normal;
        font-size: 12px;
        color: rgba(#fff, 0.7);
      }
    }

    .stock {
      flex: 0 0 48%;
      padding: 12px 16px;
      font-size: 14px;
      color: #fff;
      border-radius: 10px;
      background-repeat: no-repeat;
      background-size: 50px 50px;
      background-position: 102% 80%;

      &.green {
        background-image: url('/ic_stock_full.png');
        background-color: #11787A;
      }

      &.orange {
        background-image: url('/ic_stock_few.png');
        background-color: #E67E22;
      }

      &.gray {
        background-image: url('/ic_stock_none.png');
        background-color: #70777C;
        opacity: 0.3;
      }
    }
  }

  .card__storeInfo {
    margin-top: 30px;
    font-size: 14px;

    .store-name {
      position: relative;
      display: flex;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;

      .distance {
        margin-left: 5px;
        font-size: 11px;
        color: #566778;
      }

      &::before {
        position: absolute;
        left: -18px;
        content: '';
        width: 4px;
        height: 24px;
        border-radius: 0 4px 4px 0;
        background-color: #F39C12;
      }
    }

    .store-info {
      display: flex;
      margin-top: 15px;
      color: #566778;

      .title {
        flex: 0 0 10%;
        margin-right: 10px;
        color: #34495E;
        white-space: nowrap;
      }

      .content {
        margin-right: 10px;
      }

      .tool {
        flex: 0 0 10%;
        margin-left: auto;
        font-size: 12px;
        white-space: nowrap;

        > a{
          color: #566778;
        }
      }
    }
  }

</style>
