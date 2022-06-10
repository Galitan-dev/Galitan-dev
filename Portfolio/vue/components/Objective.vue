<template>
  <li class="row ">
    <h1>{{ name }}</h1>
    <Check v-for="i in 31" :key="i" />
  </li>
</template>

<script lang="ts">
import Check from 'Components/ObjectiveCheck.vue';

export default {
  name: 'Objective',
  components: { Check },
  props: {
    name: String,
  }
}
</script>

<style lang="less">
.row {
  margin: 20px 10px;
  padding: 0 30px;
  border-radius: 20px;
  border: 2px solid #555;
  align-items: center;
  justify-content: space-between;
  display: flex;
}

h1 {
  margin-right: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #555;
}
</style>