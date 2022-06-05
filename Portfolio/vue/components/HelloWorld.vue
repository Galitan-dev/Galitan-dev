<template>
  <div class="hello-world-component">
    <h2>
      {{ message }}
    </h2>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HelloWorld',

  data() {
    return {
      message: 'This is a message from Hello World component',
    }
  },
}
</script>
