<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: 'App',

  mounted() {
    console.log('App has been mounted!!!')
  },
}
</script>