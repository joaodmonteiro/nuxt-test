<template>
  <div>
    <Nuxt />
    <BreakpointIndicator v-if="$root.context.isDev" />
  </div>
</template>

<script>
export default {
  name: 'LayoutsDefault',
}
</script>
