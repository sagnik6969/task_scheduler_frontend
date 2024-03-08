<template>
  <div
    class="admin-section-selector flex mx-auto md:space-x-30 sm:space-x-20 lg:space-x-20 xl:space-x-40 justify-center mb-6"
  >
    <router-link
      v-for="option in options"
      :key="option.routeName"
      class="cursor-pointer md:w-auto w-200 py-2 px-4 text-lg border-b-2 border-transparent hover:font-bold mb-2 md:mb-0 md:mr-4"
      :to="{
        name: option.routeName
      }"
    >
      {{ option.label }}
    </router-link>
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
        { routeName: 'AdminUserList', label: 'Users' },
        { routeName: 'AdminAnalytics', label: 'Analytics' },
        { routeName: 'AdminAssignedTasks', label: 'Assigned Tasks' }
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

.admin-section-selector > div.selected,
.router-link-active {
  border-bottom-color: black;
  border-bottom-width: 3px;
  font-size: large;
  font-weight: bold;
}
</style>
