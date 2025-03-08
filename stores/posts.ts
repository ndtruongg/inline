import { defineStore } from 'pinia'
import usePost from '~/services/post'

interface Post {
  id: string;
  [key: string]: any;
}

export const usePostStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPosts() {
    const postService = usePost()
    loading.value = true
    error.value = null
    try {
      posts.value = await postService.getAllPosts()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const getPosts = computed(() => posts.value)
  const isLoading = computed(() => loading.value)
  const getError = computed(() => error.value)

  return {
    // State
    posts,
    loading,
    error,
    // Actions
    fetchPosts,
    // Getters
    getPosts,
    isLoading,
    getError
  }
})