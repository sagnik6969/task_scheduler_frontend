<template>
  <div
    class="w-fit duration-300 bg-slate-200 rounded hover:scale-x"
    :class="{
      'scale-x-110': isInputOnFocus
    }"
  >
    <input
      class="h-full rounded-tl-xl rounded-bl-xl border-0 outline-0 bg-transparent focus:[box-shadow:none]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      type="text"
      @focus="isInputOnFocus = true"
      @blur="isInputOnFocus = false"
    />
    <button class="px-2 h-full text-lg text-slate-700 bg-transparent rounded-tr-xl rounded-br-xl">
      <v-icon class="duration-300" icon="mdi-magnify"></v-icon>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isInputOnFocus = ref(false)

defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
</script>
