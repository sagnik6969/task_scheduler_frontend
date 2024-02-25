<template>
  <select v-model="selectedOption" @change="handleChange">
    <option value="users">Users</option>
    <option value="analytics">Analytics</option>
    <option value="assigned_tasks">Assigned Tasks</option>
  </select>
</template>

<script>
export default {
  props: {
    value: String
  },
  computed: {
    selectedOption: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('change', newValue)
      }
    }
  },
  methods: {
    handleChange(event) {
      this.selectedOption = event.target.value
    }
  }
}
</script>
