<template>
  <div :class="$style.list">
    <YbTracksListItem
      v-for="(track, i) in tracks"
      :key="i"
      :track="track"
      :index="getPosition(i)"
    />
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
        1: this.currentTrack + 1,
        2: this.currentTrack + 2,
        3: this.currentTrack + 3,
        [-1]: this.currentTrack - 1,
        [-2]: this.currentTrack - 2,
        [-3]: this.currentTrack - 3,
      }

      if (positions[-1] < 0) positions[-1] = this.tracks.length - Math.abs(positions[-1])
      if (positions[-2] < 0) positions[-2] = this.tracks.length - Math.abs(positions[-2])
      if (positions[-3] < 0) positions[-3] = this.tracks.length - Math.abs(positions[-3])

      if (positions[1] > this.tracks.length - 1) {
        positions[1] = Math.abs(this.tracks.length - positions[1])
      }

      if (positions[2] > this.tracks.length - 1) {
        positions[2] = Math.abs(this.tracks.length - positions[2])
      }

      if (positions[3] > this.tracks.length - 1) {
        positions[3] = Math.abs(this.tracks.length - positions[3])
      }

      return positions
    },
  },

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
     * Return current position of track (if so)
     * @param {number} trackIndex Index of the track
     * @returns {string} Found position or null
     */
    getPosition(trackIndex) {
      const isPositioned = Object.values(this.positions).includes(trackIndex)
      return isPositioned ? getKeyByValue(this.positions, trackIndex) : null
    },
  },
}
</script>

<style module>
  .list {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100rem;
    height: 50%;
    margin-left: -50rem;
  }
</style>
