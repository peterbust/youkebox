<template>
  <div :class="$style['wrapper']">
    <h2 :class="$style['title']">
      Queue
    </h2>
    <YbQueueListItem
      v-for="(track, i) in queued"
      :key="i"
      :thumbnail="getTrack(track)['thumbnail_url']"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import YbQueueListItem from './YbQueueListItem.vue'
import store from '../store'

export default {
  components: { YbQueueListItem },

  computed: {
    ...mapGetters({
      getTrack: 'getTrackByReference',
    }),

    queued() {
      return this.$store.state.queue.queue
    },
  },

  // Temp
  mounted() {
    setTimeout(() => {
      store.dispatch('checkQueue')
    }, 2000)
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  position: absolute;
  top: 15%;
  left: 5%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;
  width: 30%;
}

.title {
  position: absolute;
  top: -3.5rem;
  left: 0;
  color: var(--color-red);
  font-family: var(--font-light);
  font-size: var(--font-size-xl);
  margin: 0 1.666%;
}
</style>
