<template>
  <div class="wrapper">
    <TransitionFlip>
      <div
        v-show="thumbnailShow"
        class="album-cover"
        :style="{ backgroundImage: `url(${thumbnail})` }"
      />
    </TransitionFlip>
    <YbPlayerTimeBar />
    <div class="text-wrapper">
      <h1 class="title">
        {{ track.title }}
      </h1>
      <h2 class="artist">
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
      thumbnail: '',
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

  methods: {
    /**
     * Handle state change album cover (for animation)
     */
    onStateChangeAnimateThumbnail() {
      if (this.track.thumbnail_url !== this.thumbnail) {
        this.thumbnailShow = false
        setTimeout(() => {
          this.thumbnail = this.track.thumbnail_url
          this.thumbnailShow = true
        }, 280)
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
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
