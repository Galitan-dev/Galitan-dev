<template>
  <div>
    <Objective class="objective" v-for="(name, i) in objectives" :key="i" :name="name" />
  </div>
</template>

<script lang="ts">
import Objective from "Components/Objective.vue"

export default {
  name: "Objectives",
  components: { Objective },
  data() {
    return {
      objectives: [
        "Devoirs faits avant 19h",
        "Serviette rangée",
        "Dents brossées",
        "Crême acnée",
        "Chambre rangée",
        "Sac fait la veille",
        "Douche avant 20h",
        "Au moins une corvée familiale",
        "Arrivé au collège en avance",
        "Aucune insulte",
        "Piano"
      ]
    }
  },
}
</script>