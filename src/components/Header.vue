<template>
  <div :class="['header', state.menuOpen ? 'isOpen' : '']" ref="header">
    <div class="wrap">
      <div class="header__logo" @click="toIndex">
        <div class="logo">
          <div class="circle"></div>
        </div>
        <div class="title">口罩即時查</div>
      </div>
      <div class="menu__trigger" @click="state.menuOpen = !state.menuOpen">
        <div class="dash top"></div>
        <div class="dash bottom"></div>
      </div>
    </div>
    <div class="header__menu">
      <router-link :to="{ name: 'index' }" class="link active">口罩供給現況</router-link>
      <a href="#" class="link" @click.prevent="$emit('openModal')">口罩怎麼買</a>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted, ref, computed } from '@vue/composition-api'
export default {
  setup (props, context) {
    onMounted(() => {
      document.body.addEventListener('click', closeMenu)
      window.addEventListener('scroll', menuHandler)
    })

    onUnmounted(() => {
      document.body.removeEventListener('click', closeMenu)
      window.removeEventListener('scroll', menuHandler)
    })
    const header = ref(null)
    const isMobile = computed(() => context.root.$store.isMobile)

    const state = reactive({
      menuOpen: false
    })

    function toIndex () {
      context.root.$router.push({ name: 'index' }).catch((err) => {
        console.log(err)
      })
    }

    function closeMenu (e) {
      if (!header.value.contains(e.target)) {
        state.menuOpen = false
      }
    }

    function menuHandler () {
      if (!state.menuOpen) return false
      state.menuOpen = false
    }

    return {
      state,
      isMobile,
      toIndex,
      menuHandler,
      header
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    z-index: 100;

    > .wrap {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #fff;
      z-index: 99;
      transition: background 0.2s linear;
    }
  }
  .header__logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo {
      width: 41px;
    }
    .title {
      margin-left: 10px;
    }
  }

  .header__menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-right: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 99;

    .link {
      align-self: stretch;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      text-decoration: none;
      color: #34495E;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: #34495E;
        border-radius: 4px 4px 0 0;
        display: none;
      }
      &.router-link-active::after {
        display: block;
      }
    }
  }

  .circle {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: #11787A;
    &::after {
      content: '';
      position: absolute;
      left: 75%;
      top: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #fff;
      background-color: #E67E22;
    }
  }
  .menu__trigger {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 26px;
    height: 24px;
    cursor: pointer;
    display: none;

    .dash {
      position: absolute;
      width: 26px;
      height: 4px;
      background-color: #34495E;
      transition: all 0.2s linear;

      &.top {
        margin-top: -4px;
      }

      &.bottom {
        margin-top: 8px;
        width: 50%;
      }
    }
  }

  .header.isOpen {

    .wrap {
      background-color: #34495E;
    }

    .header__menu {
      color: #fafafa;
      background-color: #34495E;
      transform: translateY(0);
      transition: background 0.2s linear, transform 0.2s linear 0.2s;
    }
    .title {
      color: #fafafa;
    }
    .circle {
      border-color: #34495E;

      &::after {
        border-color: #34495E;
      }
    }
    .dash.top {
      margin-top: 0;
      background-color: #fafafa;
      transform: rotate(45deg);
    }
    .dash.bottom {
      margin-top: 0;
      width: 100%;
      background-color: #fafafa;
      transform: rotate(-45deg);
    }
  }
    @media only screen and (max-width: 480px) {
    .header__menu {
      top: 100%;
      left: 0;
      right: 0;
      display: block;
      height: auto;
      padding: 0;
      text-align: center;
      transform: translateY(-100%);
      transition: transform 0.2s linear, background 0.2s linear;
      cursor: pointer;
      z-index: auto;
      // display: none;

      .link {
        padding: 20px;
        color: #fff;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1)
        }

        &.active::after {
          display: none;
        }
      }
    }

    .menu__trigger {
      display: flex;
    }
  }
</style>
