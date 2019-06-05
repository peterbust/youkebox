<template>
  <div>
    <pre
      v-for="song in queue"
      :key="song.title"
    >
      {{ getSong(song) }}
    </pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getSong: 'getSongByReference',
    }),

    queue() {
      return this.$store.state.queue.queue
    },
  },
}
</script>
