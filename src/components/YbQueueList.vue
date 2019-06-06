<template>
  <div>
    <pre
      v-for="track in queue"
      :key="track.title"
    >
      {{ getTrack(track) }}
    </pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getTrack: 'getTrackByReference',
    }),

    queue() {
      return this.$store.state.queue.queue
    },
  },
}
</script>
