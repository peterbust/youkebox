<template functional>
  <div
    class="album-cover"
    :class="[
      $style['wrapper'],
      $style[props.positionClassName],
      props.positionClassName === 'is-active' && props.select ? $style['is-selected'] : ''
    ]"
    :style="{ backgroundImage: `url(${props.thumbnail})` }"
  />
</template>

<style lang="postcss" module>
  .wrapper {
    position: absolute;
    bottom: -175%;
    left: 42.5%;
    width: 15%;
    padding-bottom: 15%;
    transition: all 500ms cubic-bezier(.25, .46, .45, .94);
  }

  .is-active {
    z-index: 1;
    transform: translate(0, -440%) scale(1.5);
  }

  .is-selected { transform: translate(0, -457%) scale(1.85); }

  .is-previous-1 { transform: translate(-140%, -420%); }
  .is-previous-2 { transform: translate(-245%, -400%); }
  .is-previous-3 { transform: translate(-350%, -380%); }
  .is-previous-4 { transform: translate(-455%, -180%); }

  .is-next-1 { transform: translate(140%, -420%); }
  .is-next-2 { transform: translate(245%, -400%); }
  .is-next-3 { transform: translate(350%, -380%); }
  .is-next-4 { transform: translate(455%, -180%); }
</style>
