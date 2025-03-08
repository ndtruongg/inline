import { defineNuxtPlugin } from '#app'
import { useToast } from '~/composables/useToast'

export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast()
  
  // Make toast available through the Nuxt app instance
  nuxtApp.provide('toast', toast)
})

// TypeScript - augment the NuxtApp interface
declare module '#app' {
  interface NuxtApp {
    $toast: ReturnType<typeof useToast>
  }
}

// For Composition API
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ReturnType<typeof useToast>
  }
}