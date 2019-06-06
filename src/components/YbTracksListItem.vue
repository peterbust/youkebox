<template>
  <div
    :class="[
      $style.album,
      $style['is-positioned'],
      $style[`position-${index}`],
    ]"
  >
    <p>
      {{ track.title }}
      <br>
      {{ track.artist }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    track: {
      type: Object,
      required: true,
    },

    index: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style module>
  .album {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 20rem;
    height: 20rem;
    box-shadow: .5rem .5rem .25rem 0px rgba(0, 0, 0, .25);
    background: black;
    bottom: -30rem;
    left: 40rem;
    text-align: center;
  }

  .is-positioned {
    transition: all 500ms cubic-bezier(.25, .46, .45, .94);
  }

  .position--3 {
    bottom: -30rem;
    left: -20rem;
  }

  .position--2 {
    bottom: 5rem;
    left: 0;
  }

  .position--1 {
    bottom: 10rem;
    left: 20rem;
  }

  .position-active {
    bottom: 15rem;
    left: 40rem;
  }

  .position-1 {
    bottom: 10rem;
    left: 60rem;
  }

  .position-2 {
    bottom: 5rem;
    left: 80rem;
  }

  .position-3 {
    bottom: -30rem;
    left: 100rem;
  }
</style>
