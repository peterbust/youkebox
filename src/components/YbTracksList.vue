<template>
  <div :class="$style.wrapper">
    <YbTracksListItem
      v-for="(track, i) in tracks"
      :key="i"
      :track="track"
      :position-class-name="getPositionClassName(i)"
    />
    <button :class="$style.button" />
  </div>
</template>

<script>
import YbTracksListItem from './YbTracksListItem.vue'
import getKeyByValue from '@/utils'

export default {
  components: { YbTracksListItem },

  data() {
    return {
      currentTrack: 0,
    }
  },

  computed: {
    tracks() {
      return this.$store.state.tracks
    },

    positions() {
      const positions = {
        active: this.currentTrack,
        next: [],
        previous: [],
      }

      for (let i = 1; i < 5; i += 1) {
        positions.next.push(this.currentTrack + i)
        positions.previous.push(this.currentTrack - i)
      }

      positions.next.forEach((value, i) => {
        if (value > this.tracks.length - 1) {
          positions.next[i] = Math.abs(this.tracks.length - value)
        }
      })

      positions.previous.forEach((value, i) => {
        if (value < 0) {
          positions.previous[i] = this.tracks.length - Math.abs(value)
        }
      })

      return positions
    },
  },

  /**
   * Set up event listeners
   */
  mounted() {
    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'ArrowLeft') {
        if (this.currentTrack === 0) this.currentTrack = this.tracks.length - 1
        else this.currentTrack -= 1
      }

      if (evt.key === 'ArrowRight') {
        if (this.currentTrack === this.tracks.length - 1) this.currentTrack = 0
        else this.currentTrack += 1
      }
    })
  },

  methods: {
    /**
     * Return current position classname of track key
     * @param {number} i Index of the track
     * @returns {string} Class name or null
     */
    getPositionClassName(i) {
      if (this.positions.active === i) return 'is-active'

      if (this.positions.next.includes(i)) {
        return `is-next-${getKeyByValue(this.positions.next, i) + 1}`
      }

      if (this.positions.previous.includes(i)) {
        return `is-previous-${getKeyByValue(this.positions.previous, i) + 1}`
      }

      return null
    },
  },
}
</script>

<style module>
  .wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55%;
  }

  .wrapper::before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 85%;
    opacity: .7;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--color-red) 100%);
  }

  .button {
    position: absolute;
    right: 0;
    bottom: 18%;
    left: 0;
    width: 5%;
    padding-bottom: 5%;
    border: none;
    border-radius: 50%;
    outline: none;
    margin: 0 auto;
    background-color: var(--color-green);
  }
</style>
