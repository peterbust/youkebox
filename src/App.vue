<template>
  <div id="app">
    <div class="background" />
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
import queue from '@/state/queue.json'
import queue2 from '@/state/queue2.json'

export default {
  components: {
    YbPlayer,
    YbQueueList,
    YbTracksList,
    LottieConfirmed,
  },

  mounted() {
    document.body.style.cursor = 'none'

    setTimeout(() => {
      if (!store.state.app.localEnv) {
        store.dispatch('fetchData', { type: 'tracks' })
        this.fetchQueue()
      }

      setInterval(() => store.dispatch('checkDisabledTracks'), 10000)

      // Mock queue commit for local development
      if (store.state.app.localEnv) {
        this.$store.commit('overwriteData', { property: 'queue', data: queue })
        store.dispatch('checkInQueueForUndisabled')
        setTimeout(() => {
          this.$store.commit('overwriteData', { property: 'queue', data: queue2 })
          store.dispatch('checkInQueueForUndisabled')
        }, 5000)
      }
    }, 5000)
  },

  methods: {
    /**
     * Repeatedly fetch queue
     * @returns {undefined}
     */
    fetchQueue() {
      store.dispatch('fetchData', { type: 'queue' })
      setTimeout(() => this.fetchQueue(), 5000)
    },
  },
}
</script>

<style lang="postcss" scoped>
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

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('./assets/images/background.png');
  background-size: cover;
}
</style>
