<template>
  <div
    class="album-cover"
    :class="$style['wrapper']"
    :style="{ backgroundImage: `url(${thumbnail})` }"
  />
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  width: 30%;
  padding-bottom: 30%;

  &:nth-child(2) { margin: auto; }
}
</style>
