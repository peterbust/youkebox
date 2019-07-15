<template functional>
  <transition name="fade">
    <slot />
  </transition>
</template>

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
