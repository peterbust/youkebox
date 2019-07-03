<template>
  <div :class="$style['wrapper']">
    <div
      class="album-cover"
      :class="$style['album-cover']"
      :style="{ backgroundImage: `url(${track.thumbnail_url})` }"
    />
    <div :class="$style['time-bar']">
      <div
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
import { mapGetters } from 'vuex'

export default {
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
     * Sets a minimum of x digits
     * @param {number} n Number to handle
     * @param {number} minimumDigits Number of minimum digits
     * @returns {string} Minimum digit string
     */
    enforceMinimumDigits(n, minimumDigits) {
      let digitsToAdd = ''
      for (let i = 0; i < minimumDigits; i += 1) digitsToAdd += '0'
      return n.toString().length < minimumDigits
        ? (digitsToAdd + n).slice(-minimumDigits)
        : n.toString()
    },

    /**
     * Calculates- and formats the remaining time
     * @param {number} duration Total duration of track in minutes
     * @param {number} remaining Remaining time left in minutes
     * @returns {string} Remaining time as formatted string; `-xx:xx`
     */
    formatRemainingTime(durationInMinutes, remainingTimeInMinutes) {
      const totalSeconds = (durationInMinutes - remainingTimeInMinutes) * 60
      const minutes = this.enforceMinimumDigits(Math.floor(totalSeconds / 60), 2)
      const seconds = this.enforceMinimumDigits(Math.floor(totalSeconds - (minutes * 60)), 2)
      return totalSeconds > 0 ? `-${minutes}:${seconds}` : '00:00'
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  position: absolute;
  top: 5.25%;
  right: 5%;
  width: 50%;
  padding-bottom: 30px;
}

.album-cover {
  width: 30%;
  padding-bottom: 30%;
}

.time-bar {
  position: absolute;
  width: 100%;
  height: 10px;
  bottom: 0;
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
  bottom: 13%;
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
  bottom: 7.5%;
  color: var(--color-white);
  font-family: var(--font-light);
  font-size: var(--font-size-m);
}
</style>
