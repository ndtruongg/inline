<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
    <div class="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">YouTube Video URL</label>
        <input type="text" v-model="videoUrl" class="mt-1 w-full rounded border p-2" placeholder="Enter YouTube video URL" />
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="rounded bg-gray-300 px-4 py-2">Cancel</button>
        <button @click="insertVideo" class="rounded bg-blue-500 px-4 py-2 text-white">Insert Video</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close', 'insert-video'])

const videoUrl = ref<string>('')

const insertVideo = () => {
  if (videoUrl.value) {
    emit('insert-video', videoUrl.value)
    emit('close')
  }
}
</script>

<style scoped>
/* TailwindCSS classes are used, no additional styles needed */
</style>
