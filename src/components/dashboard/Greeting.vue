<template>
  <div
    class="greeting border-black border-2 justify-between shadow-xl py-8 px-5 rounded-lg flex items-center text-center text-black"
  >
    <div class="flex flex-col">
      <h1 class="text-5xl font-bold">Hello {{ $store?.state?.user?.name }}!</h1>
      <h4 class="mt-4 text-xl">It's good to see you again.</h4>
    </div>
    <img src="@/assets/images/higreeting.png" alt="greetings" class="" />
  </div>
</template>
<script setup></script>
<style scoped>
.greeting {
  background-image: url('/public/img/bgbanner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(10px);
}
</style>
