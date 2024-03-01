<template>
  <div
    class="admin-section-selector flex mx-auto md:space-x-30 sm:space-x-20 lg:space-x-20 xl:space-x-40 justify-center mb-6"
  >
    <div
      v-for="option in options"
      :key="option.value"
      @click="handleChange(option.value)"
      :class="{ selected: selectedOption === option.value }"
      class="cursor-pointer md:w-auto w-200 py-2 px-4 text-lg border-b-2 border-transparent hover:font-bold mb-2 md:mb-0 md:mr-4"
    >
      {{ option.label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      selectedOption: 'users', // Initially selected option
      options: [
        { value: 'users', label: 'Users' },
        { value: 'analytics', label: 'Analytics' },
        { value: 'assigned_tasks', label: 'Assigned Tasks' }
      ]
    }
  },
  methods: {
    handleChange(option) {
      this.selectedOption = option
      this.$emit('change', option) // Emit event to notify parent component about the change
    }
  }
}
</script>

<style scoped>
.admin-section-selector {
  display: flex;
}

.admin-section-selector > div {
  transition: border-bottom-color 0.3s;
}

.admin-section-selector > div.selected {
  border-bottom-color: black;
  border-bottom-width: 3px;
  font-size: large;
  font-weight: bold;
}
</style>
