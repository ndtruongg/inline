<template>
  <Teleport to="body">
    <div class="fixed z-50 top-4 right-4 flex flex-col gap-2">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'rounded-md shadow-lg p-4 min-w-72 transform transition-all duration-300 flex items-start gap-3',
            getBackgroundColor(toast.type)
          ]"
        >
          <div :class="getIconClass(toast.type)" class="mt-1">
            <Icon 
              v-if="toast.type === 'success'" 
              name="heroicons:check-circle" 
              class="w-5 h-5 text-white"
            />
            <Icon 
              v-else-if="toast.type === 'error'" 
              name="heroicons:x-circle" 
              class="w-5 h-5 text-white"
            />
            <Icon 
              v-else-if="toast.type === 'warning'" 
              name="heroicons:exclamation-triangle" 
              class="w-5 h-5 text-white"
            />
            <Icon 
              v-else
              name="heroicons:information-circle" 
              class="w-5 h-5 text-white"
            />
          </div>
          <div class="flex-1">
            <h4 v-if="toast.title" class="font-semibold text-white">{{ toast.title }}</h4>
            <p class="text-white text-sm">{{ toast.message }}</p>
          </div>
          <button 
            @click="removeToast(toast.id)" 
            class="text-white hover:text-gray-200"
          >
            <Icon 
              name="heroicons:x-mark" 
              class="w-4 h-4"
            />
          </button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

function getBackgroundColor(type: string): string {
  switch (type) {
    case 'success':
      return 'bg-green-600'
    case 'error':
      return 'bg-red-600'
    case 'warning':
      return 'bg-yellow-600'
    case 'info':
    default:
      return 'bg-blue-600'
  }
}

function getIconClass(type: string): string {
  switch (type) {
    case 'success':
      return 'text-green-300'
    case 'error':
      return 'text-red-300'
    case 'warning':
      return 'text-yellow-300'
    case 'info':
    default:
      return 'text-blue-300'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>