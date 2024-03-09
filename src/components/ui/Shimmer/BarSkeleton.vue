<template>
  <div class="skeleton-chart flex flex-col sm:flex-row items-center justify-center">
    <div class="skeleton-bar bg-gray-300 h-4 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
    <div class="skeleton-bar bg-gray-300 h-8 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
    <div class="skeleton-bar bg-gray-300 h-12 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
    <div class="skeleton-bar bg-gray-300 h-16 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
    <div class="skeleton-bar bg-gray-300 h-20 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
  </div>
</template>
<style scoped>
.skeleton-chart {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}

.skeleton-bar {
  animation: loadingAnimation 1s infinite alternate;
}
@media (max-width: 768px) {
  .skeleton-chart {
    flex-direction: row;
    justify-content: space-around;
  }
}

@keyframes loadingAnimation {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
</style>
