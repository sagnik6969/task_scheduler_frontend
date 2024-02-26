<template>
  <button
    class="py-2 px-6 space-x-2 flex border-2 border-black items-center font-medium bg-black text-white hover:bg-green-200 hover:text-black rounded-md duration-300"
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
