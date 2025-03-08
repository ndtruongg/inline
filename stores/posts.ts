import { defineStore } from 'pinia'
import usePost from '~/services/post'
import type { IPost } from '~/types'

export const usePostStore = defineStore('posts', () => {
  const postService = usePost()
  const posts = ref<IPost[]>([])
  const postDetail = ref<IPost | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      posts.value = await postService.getAllPosts()
      return posts.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      return []
    } finally {
      loading.value = false
    }
  }

  const setPosts = (newPosts: IPost[]) => {
    posts.value = newPosts
  }

  const fetchPostById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
       postDetail.value = await postService.getPostById(id)
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
    postDetail,
    // Actions
    fetchPosts,
    fetchPostById,
    setPosts,
    // Getters
    getPosts,
    isLoading,
    getError,
  }
})