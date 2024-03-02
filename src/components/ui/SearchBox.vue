<template>
  <div
    class="flex justify-between items-center duration-300 bg-slate-200 rounded origin-left hover:scale-x-105"
    :class="{ 'scale-105': isInputOnFocus }"
  >
    <input
      class="rounded-tl-xl sm:flex-1 h-full rounded-bl-xl border-0 outline-none bg-transparent focus:ring-0 focus:border-none focus:bg-transparent"
      :class="{ 'sm:rounded-bl-xl': !isInputOnFocus }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isInputOnFocus = true"
      @blur="isInputOnFocus = false"
      :placeholder="placeholder"
      type="text"
    />
    <button
      class="px-2 h-full sm:flex-0 text-lg text-slate-700 bg-transparent rounded-tr-xl rounded-br-xl"
    >
      <v-icon class="duration-300 items-end" icon="mdi-magnify"></v-icon>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
const isInputOnFocus = ref(false)
</script>
