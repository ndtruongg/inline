import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Use a function to initialize Firebase to ensure proper execution order
export const initializeFirebase = () => {
  const config = useRuntimeConfig()
  const firebaseConfig = config.public?.firebase
  
  // Only initialize if not already initialized and config exists
  if (!firebaseConfig?.apiKey) {
    console.error('Firebase configuration is missing. Check your environment variables.')
    return { auth: null }
  }
  
  try {
    // Check if Firebase is already initialized
    const apps = getApps()
    const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0]
    const auth = getAuth(app)
    
    return { auth }
  } catch (error) {
    console.error('Firebase initialization error:', error)
    return { auth: null }
  }
}

// Export the initialized auth instance
const { auth } = initializeFirebase()
export { auth }
