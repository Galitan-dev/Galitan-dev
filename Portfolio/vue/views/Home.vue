<template>
  <div>
    <h2>{{ homePageMessage }}</h2>

    <HelloWorld />

    <RouterLink to="/about">Go to About page</RouterLink>
    <RouterLink to="/demo">See a great bulma demo page</RouterLink>
  </div>
</template>

<script lang="ts">
import HelloWorld from 'Components/HelloWorld.vue'
export default {
  name: 'Home',

  components: { HelloWorld },

  data() {
    return {
      homePageMessage: 'This is the Home page',
    }
  },
}
</script>