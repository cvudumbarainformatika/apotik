<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
  console.log('layout mounted');

})

</script>

<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Main Content -->
    <main class="flex-1 px-2 pt-[60px] pb-2 overflow-hidden flex justify-center bg-secondary dark:bg-gray-900" >
      <div class="flex-1 overflow-hidden flex mx-auto bg-background text-gray-800 dark:text-gray-100 rounded-3xl">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Custom Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 4px;
  transition: background-color 0.2s;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(75, 85, 99, 0.5);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(75, 85, 99, 0.7);
}
</style>
