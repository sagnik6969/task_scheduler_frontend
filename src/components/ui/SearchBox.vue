<template>
  <div class="w-fit duration-300 bg-slate-200 rounded">
    <input
      class="h-full rounded-tl-xl rounded-bl-xl border-0 outline-0 bg-transparent focus:[box-shadow:none]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      type="text"
    />
    <button class="px-2 h-full text-lg text-slate-700 bg-transparent rounded-tr-xl rounded-br-xl">
      <v-icon class="duration-300" icon="mdi-magnify"></v-icon>
    </button>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
</script>
