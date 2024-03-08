<template>
  <div>
    <!-- Search bar skeleton -->
    <div class="flex items-center justify-between mb-4">
      <div class="h-8 w-2/4 ml-4 bg-gray-100 rounded"></div>
      <div class="flex">
        <div class="h-8 w-10 bg-gray-100 rounded"></div>
        <div class="ml-3 h-8 w-10 bg-gray-100 rounded"></div>
      </div>
    </div>
    <!-- User list skeleton -->
    <div
      v-for="index in 3"
      :key="index"
      class="border border-black rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between font-bold text-gray-800 animate-pulse"
    >
      <div class="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-3/5">
        <div class="h-6 w-1/2 bg-gray-300 rounded"></div>
        <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
      </div>
      <div class="flex items-center justify-between w-full md:w-1/4">
        <div class="h-6 w-6 bg-gray-300 rounded"></div>
        <div class="h-6 w-6 bg-gray-300 rounded"></div>
        <div class="h-6 w-6 bg-gray-300 rounded"></div>
        <div class="h-6 w-6 bg-gray-300 rounded"></div>
        <div class="h-6 w-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
