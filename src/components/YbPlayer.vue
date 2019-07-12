<template>
  <div :class="$style['wrapper']">
    <transition name="flip">
      <div
        v-show="thumbnailShow"
        class="album-cover"
        :class="$style['album-cover']"
        :style="{ backgroundImage: `url(${thumbnailUrl})` }"
      />
    </transition>
    <div :class="$style['time-bar']">
      <div
        v-show="thumbnailShow"
        :class="$style['time-bar-progress']"
        :style="{ width: `${progressInPercentage}%` }"
      />
    </div>
    <div :class="$style['text-wrapper']">
      <h1 :class="$style['title']">
        {{ track.title }}
      </h1>
      <h2 :class="$style['artist']">
        {{ track.artist }}
      </h2>
    </div>
    <p :class="$style['time-indicator']">
      {{ remainingTime }}
    </p>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { enforceMinimumDigits } from '@/utils'

export default {
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
      return this.getTrack(this.$store.state.queue.current)
    },

    progressInPercentage() {
      return this.calcProgressPercentage(this.track.duration, this.track.remaining)
    },

    remainingTime() {
      return this.track.remaining < this.track.duration
        ? this.formatRemainingTime(this.track.duration, this.track.remaining)
        : '00:00'
    },

    stateTrackTitle() {
      return this.track.title
    },
  },

  watch: {
    stateTrackTitle() {
      this.onStateChangeAnimateThumbnail()
      store.dispatch('handleRemainingTime')
    },
  },

  created() {
    this.thumbnailUrl = this.track.thumbnail_url
  },

  methods: {
    /**
     * Calculate track time progress in percentage
     * @param {number} duration Total duration of track
     * @param {number} remaining Remaining time left
     * @returns {number} Progress in percentage
     */
    calcProgressPercentage: (duration, remaining) => 100 / duration * remaining,

    /**
     * Calculates- and formats the remaining time
     * @param {number} duration Total duration of track in minutes
     * @param {number} remaining Remaining time left in minutes
     * @returns {string} Remaining time as formatted string; `-xx:xx`
     */
    formatRemainingTime(durationInMinutes, remainingTimeInMinutes) {
      const totalSeconds = (durationInMinutes - remainingTimeInMinutes) * 60
      const minutes = enforceMinimumDigits(Math.floor(totalSeconds / 60), 2)
      const seconds = enforceMinimumDigits(Math.floor(totalSeconds - (minutes * 60)), 2)
      return totalSeconds > 0 ? `-${minutes}:${seconds}` : '00:00'
    },

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

.time-bar {
  position: absolute;
  width: 100%;
  height: 2.5%;
  bottom: -7%;
  background-color: var(--color-red);
  overflow: hidden;
}

.time-bar-progress {
  position: absolute;
  height: 100%;
  background-color: var(--color-white);
  transition: all 1000ms linear;
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

.time-indicator {
  position: absolute;
  right: 0;
  bottom: -2%;
  color: var(--color-white);
  font-family: var(--font-light);
  font-size: var(--font-size-m);
}
</style>
