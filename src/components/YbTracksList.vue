<template>
  <div :class="$style.wrapper">
    <YbTracksListItem
      v-for="(track, i) in tracks"
      :key="i"
      :thumbnail="track['thumbnail_url']"
      :position-class-name="getPositionClassName(i)"
    />
    <button :class="$style.button" />
    <div :class="$style['text-wrapper']">
      <p :class="$style.text">
        {{ tracks[currentTrack].title }}
      </p>
      <p :class="$style.text">
        {{ tracks[currentTrack].artist }}
      </p>
    </div>
  </div>
</template>

<script>
import YbTracksListItem from './YbTracksListItem.vue'
import getKeyByValue from '@/utils'

const makeKeyupEvent = (code, action) =>
  document.addEventListener('keyup', (evt) => {
    if (evt.code === code) action()
  })

export default {
  components: { YbTracksListItem },

  data() {
    return {
      currentTrack: 0,
      isSelected: false,
    }
  },

  computed: {
    tracks() {
      return this.$store.state.tracks
    },

    positions() {
      const noOfTracks = this.tracks.length
      const obj = {
        active: this.currentTrack,
        next: [],
        previous: [],
      }

      // Set next- and previous indexes (hardcoded 4 times)
      for (let i = 1; i < 5; i += 1) {
        obj.next.push(this.currentTrack + i)
        obj.previous.push(this.currentTrack - i)
      }

      // Correct next indexes larger then total number of tracks
      obj.next.forEach((val, i) => {
        if (val > noOfTracks - 1) obj.next[i] = Math.abs(noOfTracks - val)
      })

      // Correct negative previous indexes
      obj.previous.forEach((val, i) => {
        if (val < 0) obj.previous[i] = noOfTracks - Math.abs(val)
      })

      return obj
    },
  },

  /**
   * Set up key events
   */
  created() {
    makeKeyupEvent('Space', () => {
      this.isSelected = true
    })

    makeKeyupEvent('ArrowLeft', () => {
      this.isSelected = false
      if (this.currentTrack === 0) this.currentTrack = this.tracks.length - 1
      else this.currentTrack -= 1
    })

    makeKeyupEvent('ArrowRight', () => {
      this.isSelected = false
      if (this.currentTrack === this.tracks.length - 1) this.currentTrack = 0
      else this.currentTrack += 1
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

<style lang="postcss" module>
  .wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55%;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 85%;
      opacity: .7;
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--color-red) 100%);
    }
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

  .text-wrapper {
    position: absolute;
    bottom: 4%;
    width: 100%;
    text-align: center;
  }

  .text {
    color: var(--color-white);
    font-family: var(--font-semibold);
    font-size: 1.5rem;
    line-height: 1.75rem;

    &:nth-child(2) { font-family: var(--font-regular); }
  }
</style>
