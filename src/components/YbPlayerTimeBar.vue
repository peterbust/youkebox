<template>
  <div>
    <div :class="$style['bar']">
      <div
        :class="$style['bar-progress']"
        :style="{ width: `${progressInPercentage}%` }"
      />
    </div>
    <p :class="$style['time']">
      {{ remainingTime }}
    </p>
  </div>
</template>

<script>
import store from '@/store'
import { enforceMinimumDigits } from '@/utils'

let interval

export default {
  data() {
    return {
      seconds: 0,
    }
  },

  computed: {
    duration() {
      return store.state.queue.current.duration
    },

    remaining() {
      return store.state.queue.current.remaining + this.seconds
    },

    progressInPercentage() {
      return 100 / this.duration * this.remaining
    },

    remainingTime() {
      return this.remaining < this.duration
        ? this.formatRemainingTime(this.duration, this.remaining)
        : '00:00'
    },

    queueUpdatedAt() {
      return store.state.updatedAt.queue
    },
  },

  watch: {
    queueUpdatedAt() {
      this.seconds = 0
      this.intervalClear()
      this.intervalSet()
    },
  },

  methods: {
    /**
     * Bread interval
     * @returns {undefined}
     */
    intervalClear() {
      window.clearTimeout(interval)
    },

    /**
     * Add a second each second to seconds for computing remaining time
     * Break interval when done
     * @returns {undefined}
     */
    intervalSet() {
      interval = window.setInterval(() => {
        if (this.remaining < this.duration) this.seconds += (1 / 60)
        else this.intervalClear()
      }, 1000)
    },

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
  },
}
</script>

<style lang="postcss" module>
.bar {
  position: absolute;
  width: 100%;
  height: 2.5%;
  bottom: -7%;
  background-color: var(--color-red);
  overflow: hidden;
}

.bar-progress {
  position: absolute;
  height: 100%;
  background-color: var(--color-white);
  transition: all 1000ms linear;
}

.time {
  position: absolute;
  right: 0;
  bottom: -2%;
  color: var(--color-white);
  font-family: var(--font-light);
  font-size: var(--font-size-m);
}
</style>
