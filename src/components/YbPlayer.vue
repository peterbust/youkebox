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
    <p :class="$style['remaining-time']">
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
     * Sets a minimum of two digits by prepending or appending a 0
     * @param {number} n Number to handle
     * @returns {string} Two digit string
     */
    enforceTwoDigits: n => (`0${n}`).slice(-2),

    /**
     * Calculates- and formats the remaining time
     * @param {number} duration Total duration of track
     * @param {number} remaining Remaining time left
     * @returns {string} Remaining time as formatted string; `-xx:xx`
     */
    formatRemainingTime(duration, remaining) {
      const totalSeconds = (duration - remaining) * 60
      const minutes = this.enforceTwoDigits(Math.floor(totalSeconds / 60))
      const seconds = this.enforceTwoDigits(Math.floor(totalSeconds - (minutes * 60)))
      return `-${minutes}:${seconds}`
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

.remaining-time {
  position: absolute;
  right: 0;
  bottom: 7.5%;
  color: var(--color-white);
  font-family: var(--font-light);
  font-size: var(--font-size-m);
}
</style>
