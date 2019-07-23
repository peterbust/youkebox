<template>
  <div :class="$style['wrapper']">
    <h2 :class="$style['title']">
      Queue
    </h2>
    <YbQueueListItem
      v-for="(track, i) in tracks"
      :key="i"
      :thumbnail="getTrack(track)['thumbnail_url']"
      :show="tracksShow[i]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import YbQueueListItem from '@/components/YbQueueListItem.vue'
import TransitionFlip from '@/components/TransitionFlip.vue'

export default {
  components: {
    YbQueueListItem,
    TransitionFlip, // eslint-disable-line
  },

  data() {
    return {
      tracks: [],
      tracksShow: new Array(3).fill(true),
    }
  },

  computed: {
    ...mapGetters({
      getTrack: 'getTrackByReference',
    }),

    stateQueue() {
      return this.$store.state.data.queue.queue
    },
  },

  watch: {
    stateQueue(newObject, oldObject) {
      this.onStateChangeAnimateUi(newObject, oldObject)
    },
  },

  created() {
    this.tracks = this.stateQueue
  },

  methods: {
    /**
     * Handle state changes in queue (for animation)
     * @param {object} newObject New state queue object
     * @param {object} oldObject Old state queue object
     * @returns {undefined}
     */
    onStateChangeAnimateUi(newObject, oldObject) {
      for (let i = 0; i < 3; i += 1) {
        if (newObject[i].title !== oldObject[i].title) {
          this.$set(this.tracksShow, i, false)
        }
      }

      setTimeout(() => {
        this.tracks = this.stateQueue
        this.tracksShow = this.tracksShow.map(() => true)
      }, 280)
    },
  },
}
</script>

<style lang="postcss" module>
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
