<template>
  <div style="position: relative">
    <user-notification-bar
      class="extrass top-0 right-0 left-0 py-3 w-full bg-white xl:static xl:mr-0 xl:mt-0 xl:pr-0"
    ></user-notification-bar>
    <div class="px-10 pb-3 flex xl:flex-row flex-col extracss">
      <div
        class="left flex-initial h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden px-4 xl:flex-[0.6_0.6_0%]"
      >
        <greeting-vue></greeting-vue>
      </div>
    </div>
    <AdminSectionSelector />
    <router-view></router-view>
  </div>
</template>

<script setup>
import AdminSectionSelector from './AdminSectionSelector.vue'
import GreetingVue from '../dashboard/Greeting.vue'
import UserNotificationBar from '../dashboard/right_column/notifications/UserNotificationBar.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
// onBeforeMount(() => {
if (!store.getters.User.is_admin) {
  router.push({
    name: 'NotFound'
  })
}
// })
</script>

<style scoped>
.extracss {
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 1280px) {
  .extracss {
    margin: auto;
    width: 80%;
  }
}
@media screen and (max-width: 764px) {
  .extracss {
    margin: auto;
    width: 100%;
  }
}
.extrass {
  position: sticky;
  z-index: 1;
  padding-right: 3rem;
}
</style>
