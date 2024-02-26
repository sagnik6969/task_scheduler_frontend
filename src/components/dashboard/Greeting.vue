<template>
  <div
    class="bg-slate-200 py-10 px-5 rounded-lg flex flex-col items-center text-center text-slate-900"
  >
    <h1 class="text-5xl font-bold">Hello {{ $store?.state?.user?.name }}!</h1>
    <p class="mt-4 text-xl">It's good to see you again.</p>
  </div>
</template>
<script setup></script>
