<template>
  <div
    class="gradient border-black border-2 justify-between shadow-xl py-8 px-5 rounded-lg flex items-center text-center text-black"
  >
    <div class="">
      <h1 class="text-5xl font-bold">Hello {{ $store?.state?.user?.name }}!</h1>
      <p class="mt-4 text-xl">It's good to see you again.</p>
    </div>
    <img src="@/assets/images/higreeting.png" alt="greetings" class="" />
  </div>
</template>
<script setup></script>
<style scoped></style>
