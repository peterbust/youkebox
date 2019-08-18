<template>
  <div class="wrapper">
    <h2 class="title">
      Queue
    </h2>
    <YbQueueListItem
      v-for="(track, i) in queuedTracks"
      :key="i"
      :thumbnail="getTrack(track)['thumbnail_url']"
      :show="showQueuedTracks[i]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import YbQueueListItem from '@/components/YbQueueListItem.vue'
import TransitionFlip from '@/components/TransitionFlip.vue'

export default {
  components: {
    YbQueueListItem,
    TransitionFlip, // eslint-disable-line
  },

  data() {
    return {
      queuedTracks: [{}, {}, {}],
      showQueuedTracks: new Array(3).fill(true),
    }
  },

  computed: {
    ...mapGetters({
      getTrack: 'getTrackByReference',
    }),

    queueOverwrittenAt() {
      return store.state.data.overwrittenAt.queue
    },
  },

  watch: {
    queueOverwrittenAt() {
      this.handleQueueChange()
    },
  },

  methods: {
    /**
     * Animate changed track covers
     */
    handleQueueChange() {
      const queuedTracks = store.state.data.queue.queue

      for (let i = 0; i < 3; i += 1) {
        if (!queuedTracks[i]) queuedTracks[i] = {}

        if (this.queuedTracks[i].title !== queuedTracks[i].title) {
          this.$set(this.showQueuedTracks, i, false)
        }
      }

      setTimeout(() => {
        this.queuedTracks = queuedTracks
        this.showQueuedTracks = this.showQueuedTracks.map(() => true)
      }, 280)
    },
  },
}
</script>

<style lang="postcss" scoped>
.wrapper {
  position: absolute;
  top: 13.75%;
  left: 5%;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-items: center;
  width: 30%;
}

.title {
  position: absolute;
  top: -30%;
  left: 0;
  color: var(--color-red);
  font-family: var(--font-light);
  font-size: var(--font-size-xl);
  margin: 0 1.666%;
}
</style>
