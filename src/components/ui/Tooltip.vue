<template>
  <v-tooltip text="Tooltip" :disabled="open" location="bottom" v-model="show">
    <template v-slot:activator="{ props }">
      <div @click="show = !show" v-bind="props" class="w-fit">
        <slot></slot>
      </div>
    </template>
  </v-tooltip>
</template>
<script setup>
import { ref } from 'vue'
defineProps(['open'])
const show = ref(false)
</script>
