<template>
  <div :class="$style['wrapper']">
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
}
</script>

<style lang="postcss" module>
.wrapper {
  position: absolute;
  top: 15%;
  left: 6.5%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 30%;
}
</style>
