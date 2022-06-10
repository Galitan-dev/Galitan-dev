<template>
  <div>
    <h2>{{ homePageMessage }}</h2>

    <HelloWorld />

    <RouterLink to="/about">Go to About page</RouterLink>
    <RouterLink to="/demo">See a great bulma demo page</RouterLink>

    <IsometricLandscape />
  </div>
</template>

<script lang="ts">
import HelloWorld from 'Components/HelloWorld.vue'
import IsometricLandscape from 'Components/IsometricLandscape.vue'

export default {
  name: 'Home',

  components: { HelloWorld, IsometricLandscape },

  data() {
    return {
      homePageMessage: 'This is the Home page',
    }
  },
}
</script>