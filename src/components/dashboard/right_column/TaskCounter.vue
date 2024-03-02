<template>
  <div class="flex space-x-4">
    <div
      class="flex-1 shadow-lg bg-black border-2 border-white rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3"
    >
      <h1 class="text-6xl font-extrabold text-white">
        {{ $store.getters.getUserCompletedTaskCount }}
      </h1>
      <div class="font-semibold text-white">
        <p>Tasks</p>
        <p>completed</p>
      </div>
    </div>

    <div
      class="flex-1 bg-black shadow-lg border-2 border-white rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3"
    >
      <h1 class="text-6xl font-extrabold text-white">
        {{ $store.getters.getUserIncompleteTaskCount }}
      </h1>
      <div class="font-semibold text-white">
        <p>Tasks</p>
        <p>in Progress</p>
      </div>
    </div>
  </div>
</template>
<script setup></script>
