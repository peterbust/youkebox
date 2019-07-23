<template>
  <div :class="$style['wrapper']">
    <TransitionFlip>
      <div
        v-show="thumbnailShow"
        class="album-cover"
        :class="$style['album-cover']"
        :style="{ backgroundImage: `url(${thumbnailUrl})` }"
      />
    </TransitionFlip>
    <YbPlayerTimeBar />
    <div :class="$style['text-wrapper']">
      <h1 :class="$style['title']">
        {{ track.title }}
      </h1>
      <h2 :class="$style['artist']">
        {{ track.artist }}
      </h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import TransitionFlip from '@/components/TransitionFlip.vue'
import YbPlayerTimeBar from '@/components/YbPlayerTimeBar.vue'

export default {
  components: {
    TransitionFlip,
    YbPlayerTimeBar,
  },

  data() {
    return {
      thumbnailUrl: '',
      thumbnailShow: true,
    }
  },

  computed: {
    ...mapGetters({
      getTrack: 'getTrackByReference',
    }),

    track() {
      return this.getTrack(store.state.data.queue.current)
    },

    queueOverwrittenAt() {
      return store.state.data.overwrittenAt.queue
    },
  },

  watch: {
    queueOverwrittenAt() {
      this.onStateChangeAnimateThumbnail()
    },
  },

  created() {
    this.thumbnailUrl = this.track.thumbnail_url
  },

  methods: {
    /**
     * Handle state change album cover (for animation)
     * @returns {undefined}
     */
    onStateChangeAnimateThumbnail() {
      this.thumbnailShow = false

      setTimeout(() => {
        this.thumbnailUrl = this.track.thumbnail_url
        this.thumbnailShow = true
      }, 280)
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  position: absolute;
  top: 8.5%;
  right: 5%;
  width: 50%;
}

.album-cover {
  width: 30%;
  padding-bottom: 30%;
}

.text-wrapper {
  position: absolute;
  width: 57%;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  color: var(--color-white);
  font-family: var(--font-semibold);
  font-size: var(--font-size-xl);
  padding-bottom: .25rem;
}

.artist {
  color: var(--color-white);
  font-family: var(--font-regular);
  font-size: var(--font-size-l);
}
</style>
