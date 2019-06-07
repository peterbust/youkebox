<template>
  <div
    :class="[
      $style['album-cover'],
      $style[positionClassName],
    ]"
  >
    <!-- <p>
      {{ track.title }}
      <br>
      {{ track.artist }}
    </p> -->
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      required: true,
    },

    positionClassName: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style module>
  .album-cover {
    position: absolute;
    bottom: -175%;
    left: 42.5%;
    width: 15%;
    padding-bottom: 15%;
    background: black;
    transition: all 500ms cubic-bezier(.25, .46, .45, .94);
  }

  .is-active { transform: translate(0, -440%) scale(1.5); }

  .is-previous-1 { transform: translate(-140%, -420%); }
  .is-previous-2 { transform: translate(-245%, -400%); }
  .is-previous-3 { transform: translate(-350%, -380%); }
  .is-previous-4 { transform: translate(-455%, -180%); }

  .is-next-1 { transform: translate(140%, -420%); }
  .is-next-2 { transform: translate(245%, -400%); }
  .is-next-3 { transform: translate(350%, -380%); }
  .is-next-4 { transform: translate(455%, -180%); }
</style>
