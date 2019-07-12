<template>
  <div :class="$style.wrapper">
    <YbTracksListItem
      v-for="(track, i) in tracks"
      :key="i"
      :thumbnail="track['thumbnail_url']"
      :position-class-name="positionsGetClassName(i)"
      :select="select"
    />
    <button
      :class="[$style.button, select ? $style['is-active'] : '']"
      @click="select = !select"
    />
    <transition name="fade">
      <div
        v-show="!select"
        :class="$style['text-wrapper']"
      >
        <p :class="$style.text">
          {{ tracks[positions.active].title }}
        </p>
        <p :class="$style.text">
          {{ tracks[positions.active].artist }}
        </p>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="select"
        :class="$style['text-wrapper']"
      >
        <p :class="$style.text">
          Add to queue?
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import YbTracksListItem from './YbTracksListItem.vue'
import { addToEachInArray, getKeyByValue, makeKeyupEvent } from '@/utils'

export default {
  components: {
    YbTracksListItem,
  },

  data() {
    return {
      select: false,
      positions: {
        active: 0,
        next: [1, 2, 3, 4],
        previous: [-1, -2, -3, -4],
      },
    }
  },

  computed: {
    tracks() {
      return this.$store.state.tracks
    },
  },

  created() {
    this.positions.previous.forEach((val, i) => {
      this.positions.previous[i] += this.tracks.length
    })
    makeKeyupEvent('Space', () => this.toggleSelected())
    makeKeyupEvent('ArrowLeft', () => this.positionsNavigate(-1))
    makeKeyupEvent('ArrowRight', () => this.positionsNavigate(1))
  },

  methods: {
    /**
     * Adds a given number to positions object (component logic)
     * @param {object} positions Positions to handle
     * @param {number} add Number to add
     * @param {number} max Maximum value
     * @returns {object} Updated positions
     */
    positionsAdd(positions, add, max) {
      positions.active += add
      if (positions.active < 0) positions.active += max
      if (positions.active >= max) positions.active -= max

      positions.next = addToEachInArray(positions.next, add, 0, max)
      positions.previous = addToEachInArray(positions.previous, add, 0, max)

      return positions
    },

    /**
     * Return related position classname of given track
     * @param {number} i Index of the track
     * @returns {string} Class name || null
     */
    positionsGetClassName(i) {
      if (this.positions.active === i) return 'is-active'

      if (this.positions.next.includes(i)) {
        return `is-next-${getKeyByValue(this.positions.next, i) + 1}`
      }

      if (this.positions.previous.includes(i)) {
        return `is-previous-${getKeyByValue(this.positions.previous, i) + 1}`
      }

      return null
    },

    /**
     * Navigate number of tracks
     * @param {number} request Number to handle in positions
     * @returns {undefined}
     */
    positionsNavigate(request) {
      this.toggleSelected(false)
      this.positions = this.positionsAdd(this.positions, request, this.tracks.length)
    },

    /**
     * Toggle selected value
     * @returns {undefined}
     */
    toggleSelected(value = !this.select) {
      this.select = value
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
    opacity: .6;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--color-red) 100%);
  }
}

.button {
  z-index: 1;
  position: absolute;
  display: block;
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
  cursor: pointer;
  transition: all 320ms cubic-bezier(.25, .46, .45, .94);

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: .3rem;
    height: 1.75rem;
    margin: auto;
    background-color: var(--color-blue);
    transition: all 180ms cubic-bezier(.25, .46, .45, .94);
  }

  &:after {
    transform: rotate(90deg);
  }
}

.button.is-active {
  transform: scale(1.25);

  &:before {
    left: 11px;
    transform: rotate(45deg);
  }

  &:after {
    top: 11px;
    right: 14px;
    height: .875rem;
    transform: rotate(-45deg);
  }
}

.text-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 18%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.text {
  color: var(--color-white);
  font-family: var(--font-semibold);
  font-size: var(--font-size-m);

  &:nth-child(2) {
    font-family: var(--font-regular);
  }
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 320ms cubic-bezier(.25, .46, .45, .94);
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
