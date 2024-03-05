<template>
  <div class="flex space-x-4">
    <div
      :class="
        props.notitle
          ? 'flex-1 shadow-xl bg-white border-gray-200 rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3'
          : 'flex-1 shadow-lg bg-black border-2 border-white rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3'
      "
    >
      <h1
        :class="
          props.notitle
            ? 'text-6xl font-extrabold text-black'
            : 'text-6xl font-extrabold text-white'
        "
      >
        {{ $store.getters.getUserCompletedTaskCount }}
      </h1>
      <div :class="props.notitle ? 'font-semibold text-black' : 'font-semibold text-white'">
        <p>Tasks</p>
        <p>completed</p>
      </div>
    </div>
    <div
      :class="
        props.notitle
          ? 'flex-1  shadow-xl bg-white border-gray-200 rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3'
          : 'flex-1 shadow-lg bg-black border-2 border-white rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3'
      "
    >
      <h1
        :class="
          props.notitle
            ? 'text-6xl font-extrabold text-black'
            : 'text-6xl font-extrabold text-white'
        "
      >
        {{ $store.getters.getUserIncompleteTaskCount }}
      </h1>
      <div :class="props.notitle ? 'font-semibold text-black ' : 'font-semibold text-white'">
        <p>Tasks</p>
        <p>in Progress</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps(['notitle'])
</script>
