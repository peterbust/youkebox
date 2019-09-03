<template>
  <div>
    <div class="bar">
      <div
        class="bar-progress"
        :style="{ width: `${progressInPercentage}%` }"
      />
    </div>
    <p class="time">
      {{ remainingTime }}
    </p>
  </div>
</template>

<script>
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
      return this.$store.state.data.queue.current.duration
    },

    progressInPercentage() {
      return 100 / this.duration * (this.duration - this.remaining)
    },

    remaining() {
      return this.$store.state.data.queue.current.remaining - this.seconds
    },

    remainingTime() {
      return this.remaining > 0
        ? this.formatRemainingTime(this.remaining)
        : '00:00'
    },

    queueOverwrittenAt() {
      return this.$store.state.data.overwrittenAt.queue
    },
  },

  watch: {
    queueOverwrittenAt() {
      this.seconds = 0
      this.intervalClear()
      this.intervalSet()
    },
  },

  methods: {
    /**
     * Clear interval
     */
    intervalClear() {
      window.clearTimeout(interval)
    },

    /**
     * Add a second each second to seconds for computing remaining time
     * Break interval when done
     */
    intervalSet() {
      interval = window.setInterval(() => {
        if (this.remaining > 0) this.seconds += (1 / 60)
        else this.intervalClear()
      }, 1000)
    },

    /**
     * Calculates- and formats the remaining time
     * @param {number} remaining Remaining time left in minutes
     * @returns {string} Remaining time as formatted string; `-xx:xx`
     */
    formatRemainingTime(remaining) {
      const minutes = enforceMinimumDigits(Math.floor(remaining), 2)
      const seconds = enforceMinimumDigits(Math.floor((remaining * 60) - (minutes * 60)), 2)
      return remaining > 0 ? `-${minutes}:${seconds}` : '00:00'
    },
  },
}
</script>

<style lang="postcss" scoped>
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
  font-family: var(--font-regular);
  font-size: var(--font-size-m);
}
</style>
