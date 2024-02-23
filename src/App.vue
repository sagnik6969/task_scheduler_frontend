<template>
  <LoginForm />
  <TaskForm />
</template>



<script>
import LoginForm from './components/auth/LoginForm.vue'
import TaskForm from './components/tasks/TaskForm.vue';

export default {
  components: {
    LoginForm,
    TaskForm
  }
}
</script>
