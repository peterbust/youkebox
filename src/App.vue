<template>
  <div id="app">
    <video
      width="100%"
      autoplay
      loop
      src="/assets/movies/bg.mp4"
    />
    <YbQueueList />
    <YbPlayer />
    <YbTracksList />
    <LottieConfirmed />
  </div>
</template>

<script>
import store from '@/store'
import YbPlayer from '@/components/YbPlayer.vue'
import YbQueueList from '@/components/YbQueueList.vue'
import YbTracksList from '@/components/YbTracksList.vue'
import LottieConfirmed from '@/components/LottieConfirmed.vue'
import queue2 from '@/state/queue2.json'

export default {
  components: {
    YbPlayer,
    YbQueueList,
    YbTracksList,
    LottieConfirmed,
  },

  created() {
    if (!store.state.app.localEnv) this.initDataRequests()
    setInterval(() => store.dispatch('checkDisabledTracks'), 10000)

    // Mock queue commit for local environment
    if (store.state.app.localEnv) {
      setTimeout(() => this.$store.commit('overwriteData', { property: 'queue', data: queue2 }), 5000)
    }
  },

  methods: {
    /**
     * Fetch tracks and repeatedly fetch queue
     * @returns {undefined}
     */
    initDataRequests() {
      store.dispatch('fetchData', { type: 'tracks' })
      setInterval(() => store.dispatch('fetchData', { type: 'queue' }), 5000)
    },
  },
}
</script>

<style lang="postcss">
:root {
  --color-black: #000;
  --color-white: #faf2ef;
  --color-blue: #182645;
  --color-green: #3BD487;
  --color-red: #ed6a54;
  --font-light: 'Graphik Light', Helvetica, Arial, sans-serif;
  --font-regular: 'Graphik Regular', Helvetica, Arial, sans-serif;
  --font-semibold: 'Graphik Semibold', Helvetica, Arial, sans-serif;
  --font-size-xl: 2.5vw;
  --font-size-l: 2vw;
  --font-size-m: 1.5vw;
}

@font-face {
  font-family: 'Graphik Light';
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src: local('Graphik Light'),
    url('./assets/fonts/light.woff2') format('woff2'),
    url('./assets/fonts/light.woff') format('woff');
}

@font-face {
  font-family: 'Graphik Regular';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src: local('Graphik Regular'),
    url('./assets/fonts/regular.woff2') format('woff2'),
    url('./assets/fonts/regular.woff') format('woff');
}

@font-face {
  font-family: 'Graphik Semibold';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src: local('Graphik Semibold'),
    url('./assets/fonts/semibold.woff2') format('woff2'),
    url('./assets/fonts/semibold.woff') format('woff');
}

body { background-color: var(--color-black); }

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-blue);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.15;
}

::selection {
  color: var(--color-blue);
  background: var(--color-red);
}

.album-cover {
  background-color: rgba(255,255,255,.05);
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 .75rem .4rem rgba(0,0,0,.1);
}
</style>
