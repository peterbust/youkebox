<template functional>
  <transition name="flip">
    <slot />
  </transition>
</template>

<style scoped>
.flip-enter-active,
.flip-leave-active {
  transition: all 280ms cubic-bezier(.25, .46, .45, .94);
}

.flip-enter,
.flip-leave-to {
  transform: rotateY(90deg);
}
</style>
