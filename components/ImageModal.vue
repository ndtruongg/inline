<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
    <div class="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Image URL</label>
        <input type="text" v-model="imageUrl" @input="updatePreview" class="mt-1 w-full rounded border p-2" placeholder="Enter image URL" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Label</label>
        <input type="text" v-model="imageLabel" class="mt-1 w-full rounded border p-2" placeholder="Enter image label" />
      </div>
      <div class="mb-4 flex items-center justify-center">
        <img v-if="imageUrl" :src="imageUrl" :alt="imageLabel" class="max-h-48" />
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="rounded bg-gray-300 px-4 py-2">Cancel</button>
        <button @click="insertImage" class="rounded bg-blue-500 px-4 py-2 text-white">Insert Image</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close', 'insert-image'])

const imageUrl = ref<string>('')
const imageLabel = ref<string>('')

const updatePreview = () => {
  // You can add additional logic to validate the URL if needed
}

const insertImage = () => {
  if (imageUrl.value) {
    emit('insert-image', imageUrl.value, imageLabel.value)
    emit('close')
  }
}
</script>

<style scoped>
/* TailwindCSS classes are used, no additional styles needed */
</style>
