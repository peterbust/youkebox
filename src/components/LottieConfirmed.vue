<template>
  <div
    ref="lottie"
    :class="$style['wrapper']"
  />
</template>

<script>
import lottie from 'lottie-web'
import lottieConfirmedData from '@/assets/lottie/confirmed.json'

export default {
  data() {
    return {
      animation: null,
    }
  },

  mounted() {
    this.init()
    this.$root.$on('LottieConfirmed', () => this.play())
  },

  methods: {
    /**
     * Setup Lottie animation
     * @returns {undefined}
     */
    init() {
      this.animation = lottie.loadAnimation({
        container: this.$refs.lottie,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: lottieConfirmedData,
      })
    },

    /**
     * Play animation
     * @returns {undefined}
     */
    play() {
      this.animation.goToAndPlay(0)
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  position: absolute;
  display: block;
  top: 11%;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  text-align: center;
  opacity: 1;
}
</style>
