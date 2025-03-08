<template>
  <div class="container mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold mb-6">Toast Examples</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Using Composition API</h2>
        <div class="flex flex-wrap gap-2">
          <TheButton @click="showSuccessToast">Success Toast</TheButton>
          <TheButton @click="showErrorToast">Error Toast</TheButton>
          <TheButton @click="showInfoToast">Info Toast</TheButton>
          <TheButton @click="showWarningToast">Warning Toast</TheButton>
        </div>
        <div class="mt-4">
          <TheButton @click="showCustomToast">Custom Timeout (10s)</TheButton>
        </div>
      </div>
      
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Using Plugin ($toast)</h2>
        <div class="flex flex-wrap gap-2">
          <TheButton @click="showPluginSuccess">Plugin: Success</TheButton>
          <TheButton @click="showPluginError">Plugin: Error</TheButton>
          <TheButton @click="showPluginInfo">Plugin: Info</TheButton>
          <TheButton @click="showPluginWarning">Plugin: Warning</TheButton>
        </div>
        <div class="mt-4">
          <TheButton @click="showToastWithTitle">With Title</TheButton>
          <TheButton @click="clearAllToasts" class="mt-2">Clear All Toasts</TheButton>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <h3 class="font-medium mb-2">How to Use Toasts:</h3>
      <div class="bg-gray-200 dark:bg-gray-700 p-3 rounded overflow-x-auto">
        <pre class="text-sm">
// Option 1: Using the useToast composable
import { useToast } from '~/composables/useToast'

const toast = useToast()
toast.success('Operation completed successfully!')
toast.error('Something went wrong')
toast.info('Here is some information')
toast.warning('Be careful with this action')

// Option 2: Using the global $toast plugin
const { $toast } = useNuxtApp()
$toast.success('Success message')
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

// Method 1: Using the composable directly
const toast = useToast()

function showSuccessToast() {
  toast.success('Operation completed successfully!')
}

function showErrorToast() {
  toast.error('Something went wrong. Please try again.')
}

function showInfoToast() {
  toast.info('Here is some information for you.')
}

function showWarningToast() {
  toast.warning('Be careful with this action.')
}

function showCustomToast() {
  toast.info('This toast will stay for 10 seconds.', undefined, 10000)
}

// Method 2: Using the global plugin
const { $toast } = useNuxtApp()

function showPluginSuccess() {
  $toast.success('Success from plugin!')
}

function showPluginError() {
  $toast.error('Error from plugin!')
}

function showPluginInfo() {
  $toast.info('Info from plugin!')
}

function showPluginWarning() {
  $toast.warning('Warning from plugin!')
}

function showToastWithTitle() {
  $toast.info('This is the message', 'This is the title')
}

function clearAllToasts() {
  $toast.clearToasts()
}

// Set page title
useHead({
  title: 'Toast Examples'
})
</script>
