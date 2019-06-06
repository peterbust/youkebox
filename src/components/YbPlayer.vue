<template>
  <pre>{{ getTrack(this.$store.state.queue.current) }}</pre>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getTrack: 'getTrackByReference',
    }),
  },
}
</script>
