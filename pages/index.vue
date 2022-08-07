<template>
  <NuxtTutorial />
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PagesIndex',
  computed: {
    ...mapGetters('api', {
      hasArtists: 'HAS_ARTISTS',
    }),
    ...mapState('api', {
      artists: 'ARTISTS',
    }),
  },
}
</script>
