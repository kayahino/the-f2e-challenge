<template>
  <transition name="fade">
    <div
      :class="['to-top', state.isPin ? '' : 'sticky']"
      @click="scrollToTop"
      v-if="state.isShow"
    >
      TOP
    </div>
  </transition>
</template>

<script>
import { reactive, onMounted, onUnmounted } from '@vue/composition-api'
export default {
  setup (props, context) {
    onMounted(() => {
      pinButton()
      window.addEventListener('scroll', scrollHandler)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollHandler)
    })

    const state = reactive({
      isPin: false,
      isShow: false
    })

    function scrollHandler () {
      if (window.pageYOffset > 100) {
        state.isShow = true
      } else {
        state.isShow = false
      }
      pinButton()
    }

    function pinButton () {
      const footer = document.querySelector('.footer')
      const footerHeight = footer ? footer.offsetHeight : 0
      const scroll = window.pageYOffset
      if (scroll >= document.body.scrollHeight - window.innerHeight - footerHeight) {
        state.isPin = false
      } else {
        state.isPin = true
      }
    }

    function scrollToTop () {
      const currentScroll = window.pageYOffset
      const smoothness = 8
      const val = currentScroll - (currentScroll / smoothness)
      window.scrollTo(0, val)
      if (currentScroll > 0) requestAnimationFrame(scrollToTop)
    }

    return {
      state,
      scrollToTop
    }
  }
}
</script>

<style lang="scss">
  .to-top {
    position: fixed;
    bottom: 40px;
    right: 30px;
    width: 46px;
    height: 46px;
    color: #fafafa;
    text-align: center;
    line-height: 46px;
    font-size: 12px;
    letter-spacing: 0.75px;
    border-radius: 50%;
    background-color: #34495E;
    box-shadow: 0 10px 20px #34495E4D;
    cursor: pointer;

    &.sticky {
      position: absolute;
      bottom: 40px;
      right: 30px;
    }
  }

  // fade
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-enter-leave {
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

</style>
