<template>
  <div class="o-breakpoint"></div>
</template>

<style lang="scss">
.o-breakpoint {
  bottom: 0.5rem;
  color: red;
  font: 700 0.75rem / 1 sans-serif;
  left: 0.5rem;
  pointer-events: none;
  position: fixed;
  text-transform: uppercase;
  z-index: 999;

  &::before,
  &::after {
    white-space: pre-wrap;
  }

  &::before {
    content: 'Breakpoint:\A';
  }

  &::after {
    content: var(--breakpoint);
  }
}
</style>
