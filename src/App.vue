<template>
  <router-view></router-view>
  <LoginForm />
  <!-- <Login /> -->
  <RegisterForm />
  <!-- <TaskForm /> -->
</template>

<script>
import LoginForm from './components/auth/LoginForm.vue'
import RegisterForm from './components/auth/RegisterForm.vue'
// import TaskForm from './components/tasks/TaskForm.vue';

export default {
  components: {
    LoginForm,
    RegisterForm
    // TaskForm,
  }
}
</script>
