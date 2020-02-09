<template>
  <div class="card">
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
        <div>{{ item.properties.name }} <span class="distance">{{ distance }} km</span></div>
      </div>
      <div class="store-info">
        <div class="title">地址</div>
        <div>{{ item.properties.address }}</div>
        <div class="tool">
          <a :href="`http://maps.google.com/?q=${item.properties.name}`" target="_blank">於地圖查看</a>
        </div>
      </div>
      <div class="store-info">
        <div class="title">電話</div>
        <div>{{ item.properties.phone }}</div>
        <div class="tool" v-if="isMobile">
          <a :href="`tel:${item.properties.phone}`">撥打電話</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from '@vue/composition-api'
export default {
  props: {
    item: {
      required: true
    }
  },
  setup (props, { root }) {
    onMounted(() => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        isMobile.value = true
      }
    })
    const isMobile = ref(false)
    const location = computed(() => root.$store.state.location)
    const distance = ref(getDistance(location.value.latitude, location.value.longitude, props.item.geometry.coordinates[1], props.item.geometry.coordinates[0]))

    function seeOnMap (latitude, longitude) {
      const baseURL = 'http://maps.google.com/?q='
      return `${baseURL}${latitude},${longitude}`
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
      return (c * R).toFixed(1)
    }

    // Converts numeric degrees to radians
    function toRad (Value) {
      return (Value * Math.PI) / 180
    }

    return {
      getDistance,
      location,
      isMobile,
      distance,
      seeOnMap
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
        color: #34495E;
        margin-right: 10px;
      }

      .tool {
        margin-left: auto;
        font-size: 12px;

        > a{
          color: #566778;
        }
      }
    }
  }

</style>
