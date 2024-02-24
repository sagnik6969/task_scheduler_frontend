<template>
  <label
    class="flex items-center space-x-2 p-2 bg-slate-100 hover:bg-slate-200 duration-300 rounded-md"
  >
    <v-icon :icon="icon"></v-icon>
    <select
      class="p-0 font-medium border-non appearance-none border-none focus:[box-shadow:none] bg-transparent"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :required="required"
    >
      <slot></slot>
    </select>
  </label>
</template>

<script setup>
defineProps({
  icon: {
    type: String
  },
  modelValue: {
    type: String,
    default: 'Choose on Option'
  },
  required: {
    default: false,
    type: Boolean
  }
})
defineEmits(['update:modelValue'])
</script>
<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}
</style>
