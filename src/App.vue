<template>

  <div class="flex h-screen">
    <Sidebar></Sidebar>
    <!-- <dash-board class="flex-grow"></dash-board> -->
    <router-view class="flex-grow h-full"></router-view>
    <!-- <task-form></task-form> -->
  </div>
</template>
<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
// import DashBoard from './components/dashboard/DashBoard.vue'
// import TaskForm from './components/tasks/TaskForm.vue'
</script>
