<template>
  <button @click="toggleDarkMode" class="p-2">
    {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
  </button>
</template>

<script lang="ts" setup>
const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : '')
}
</script>
