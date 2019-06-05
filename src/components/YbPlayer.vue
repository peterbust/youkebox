<template>
  <pre>{{ getSong(this.$store.state.queue.current) }}</pre>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getSong: 'getSongByReference',
    }),
  },
}
</script>
