import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  title?: string
  type: 'success' | 'error' | 'info' | 'warning'
  timeout?: number
}

// Create a single toast state that will be shared across the app
const toasts = ref<Toast[]>([])
let toastCount = 0

export const useToast = () => {
  // Add a new toast to the queue
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = toastCount++
    const timeout = toast.timeout || 5000
    
    // Add the toast to the list
    toasts.value.push({
      id,
      ...toast
    })
    
    // Automatically remove the toast after timeout
    if (timeout > 0) {
      setTimeout(() => {
        removeToast(id)
      }, timeout)
    }
    
    return id
  }

  // Remove a toast by ID
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  // Convenience methods for different toast types
  const success = (message: string, title?: string, timeout?: number) => {
    return addToast({ message, title, type: 'success', timeout })
  }

  const error = (message: string, title?: string, timeout?: number) => {
    return addToast({ message, title, type: 'error', timeout })
  }

  const info = (message: string, title?: string, timeout?: number) => {
    return addToast({ message, title, type: 'info', timeout })
  }

  const warning = (message: string, title?: string, timeout?: number) => {
    return addToast({ message, title, type: 'warning', timeout })
  }

  // Clear all toasts
  const clearToasts = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    info,
    warning
  }
}