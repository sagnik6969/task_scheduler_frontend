<template>
  <div
    class="w-2/4 flex justify-between items-center duration-300 bg-slate-200 rounded origin-left hover:scale-x-105"
    :class="{ 'scale-105': isInputOnFocus }"
  >
    <input
      class="rounded-tl-xl flex-1 h-full rounded-bl-xl border-0 outline-0 bg-transparent focus:[box-shadow:none]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isInputOnFocus = true"
      @blur="isInputOnFocus = false"
      :placeholder="placeholder"
      type="text"
    />
    <button
      class="px-2 h-full flex-0 text-lg text-slate-700 bg-transparent rounded-tr-xl rounded-br-xl"
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
