<template functional>
  <TransitionFlip>
    <div
      v-show="props.show"
      class="album-cover"
      :class="$style['wrapper']"
      :style="{ backgroundImage: `url(${props.thumbnail})` }"
    />
  </TransitionFlip>
</template>

<style lang="postcss" module>
.wrapper {
  display: block;
  flex-flow: 1;
  width: 30%;
  padding-bottom: 30%;
  margin: 1.666%;
}
</style>
