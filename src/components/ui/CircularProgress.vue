<template>
  <div class="text-center">
    <v-progress-circular :model-value="value" :rotate="360" :size="60" :width="8" color="#16A34A">
      <template v-slot:default>
        <div class="text-slate-700 font font-semibold text-sm">{{ value }}%</div>
      </template>
    </v-progress-circular>
  </div>
</template>

<script setup>
defineProps(['value'])
</script>
