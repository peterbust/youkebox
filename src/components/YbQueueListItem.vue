<template functional>
  <div
    class="album-cover"
    :class="$style['wrapper']"
    :style="{ backgroundImage: `url(${props.thumbnail})` }"
  />
</template>

<style lang="postcss" module>
.wrapper {
  width: 30%;
  padding-bottom: 30%;
  flex-flow: 1;
  margin: 1.666%;
  transition: all 500ms cubic-bezier(.25, .46, .45, .94);
  display: block;

  &:hover {
    transform: rotateY(180deg);
  }
}
</style>
