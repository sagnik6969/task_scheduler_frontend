<template>
  <button
    class="py-2 px-3 space-x-2 flex items-center font-medium bg-slate-100 hover:bg-slate-200 rounded-md duration-300"
  >
    <v-icon v-if="icon" :icon="icon"></v-icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script setup>
defineProps(['icon'])
</script>
