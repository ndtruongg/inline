<template>
  <div class="admin-posts-page">
    <TheContainer :maxWidth="1200">
      <h1 class="text-3xl font-bold mb-6">Post Management</h1>
      
      <div class="mb-4 flex justify-between items-center">
        <div class="flex gap-2">
          <button 
            @click="fetchPosts" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors"
          >
            <Icon name="mdi:refresh" class="h-5 w-5" />
            <span>Refresh</span>
          </button>
          <NuxtLink to="/admin/create">
            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors">
              <Icon name="mdi:plus" class="h-5 w-5" />
              <span>Create New Post</span>
            </button>
          </NuxtLink>
        </div>
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Search posts..." 
          class="border rounded-md px-4 py-2 w-64"
        />
      </div>

      <div v-if="loading" class="flex justify-center my-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>

      <div v-else-if="error" class="text-red-500 p-4 border border-red-300 rounded bg-red-50">
        {{ error }}
      </div>

      <div v-else-if="posts.length === 0" class="text-center my-8 p-4 border rounded bg-gray-50">
        No posts found.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-3 border">ID</th>
              <th class="p-3 border">Title</th>
              <th class="p-3 border">Category</th>
              <th class="p-3 border">Status</th>
              <th class="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in paginatedPosts" :key="post.id" class="border-b hover:bg-gray-50">
              <td class="p-3 border">{{ post.id }}</td>
              <td class="p-3 border">
                <div class="font-medium">{{ post.title }}</div>
                <div class="text-sm text-gray-500">{{ post.slug }}</div>
              </td>
              <td class="p-3 border">{{ getCategoryName(post.category_id) }}</td>
              <td class="p-3 border">
                <span 
                  :class="{
                    'bg-green-100 text-green-800': post.is_published,
                    'bg-yellow-100 text-yellow-800': !post.is_published
                  }" 
                  class="px-2 py-1 rounded text-sm"
                >
                  {{ post.is_published ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td class="p-3 border">
                <div class="flex gap-2">
                  <NuxtLink :to="`/${post.slug}`" target="_blank" class="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50" title="View post">
                    <Icon name="mdi:eye" class="h-5 w-5" />
                  </NuxtLink>
                  <button 
                    @click="editPost(post)" 
                    class="text-green-500 hover:text-green-600 p-1 rounded-full hover:bg-green-50"
                    title="Edit post"
                  >
                    <Icon name="mdi:pencil" class="h-5 w-5" />
                  </button>
                  <button 
                    @click="confirmDelete(post)" 
                    class="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50"
                    title="Delete post"
                  >
                    <Icon name="mdi:delete" class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 gap-2">
          <button 
            @click="goToPage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border flex items-center"
            :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'"
          >
            <Icon name="mdi:chevron-left" class="h-5 w-5" />
          </button>
          
          <template v-for="page in paginationRange" :key="page">
            <button
              v-if="page !== '...'"
              @click="goToPage(page)"
              class="px-3 py-1 rounded border min-w-[32px] text-center"
              :class="currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'"
            >
              {{ page }}
            </button>
            <span v-else class="px-2">...</span>
          </template>
          
          <button 
            @click="goToPage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded border flex items-center"
            :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'"
          >
            <Icon name="mdi:chevron-right" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Delete confirmation modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 class="text-xl font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete the post "<span class="font-medium">{{ postToDelete?.title }}</span>"?</p>
          <p class="text-red-500 mt-2 text-sm">This action cannot be undone.</p>
          <div class="mt-6 flex justify-end gap-3">
            <button 
              @click="showDeleteModal = false" 
              class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-md flex items-center gap-1 transition-colors"
            >
              <Icon name="mdi:close" class="h-5 w-5" />
              <span>Cancel</span>
            </button>
            <button 
              @click="deletePost" 
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-1 transition-colors"
            >
              <Icon name="mdi:delete" class="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </TheContainer>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';
import usePost from '~/services/post';
import useCategory from '~/services/category';

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const toast = useToast()
const postService = usePost()
const categoryService = useCategory()

const posts = ref<any[]>([])
const categories = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchTerm = ref('')
const showDeleteModal = ref(false)
const postToDelete = ref<any>(null)

// Pagination variables
const currentPage = ref(1)
const postsPerPage = 20

onMounted(async () => {
  await Promise.all([
    fetchPosts(),
    fetchCategories()
  ])
})

// Fetch all posts
const fetchPosts = async () => {
  loading.value = true
  error.value = null
  
  try {
    posts.value = await postService.getAllPosts()
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch posts'
    toast.error('Failed to load posts', 'Error')
  } finally {
    loading.value = false
  }
}

// Fetch all categories
const fetchCategories = async () => {
  try {
    categories.value = await categoryService.getAllCategories()
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

// Get category name by ID
const getCategoryName = (categoryId: string | number) => {
  const category = categories.value.find(c => c.id === Number(categoryId))
  return category ? category.name : 'Unknown Category'
}

// Filter posts based on search term
const filteredPosts = computed(() => {
  if (!searchTerm.value) return posts.value
  
  const term = searchTerm.value.toLowerCase()
  return posts.value.filter(post => {
    const title = post.title ? post.title.toLowerCase() : ''
    const slug = post.slug ? post.slug.toLowerCase() : ''
    
    return title.includes(term) || slug.includes(term)
  })
})

// Pagination logic
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage)
})

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  return filteredPosts.value.slice(startIndex, endIndex)
})

// Generate pagination range with ellipsis for many pages
const paginationRange = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const range: (number | string)[] = []
  
  if (total <= 7) {
    // Show all pages if there are 7 or fewer
    for (let i = 1; i <= total; i++) {
      range.push(i)
    }
  } else {
    // Always include first page
    range.push(1)
    
    // Calculate middle range
    if (current <= 3) {
      range.push(2, 3, 4, '...', total - 1)
    } else if (current >= total - 2) {
      range.push('...', total - 3, total - 2, total - 1)
    } else {
      range.push('...', current - 1, current, current + 1, '...')
    }
    
    // Always include last page
    range.push(total)
  }
  
  return range
})

// Go to specific page
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// Reset to page 1 when search changes
watch(searchTerm, () => {
  currentPage.value = 1
})

// Handle edit post
const editPost = (post: any) => {
  // Use router to navigate to edit page with post data
  // This is a placeholder and can be adjusted based on your app structure
  router.push(`/admin/create?id=${post.id}`)
}

// Handle delete confirmation
const confirmDelete = (post: any) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

// Handle post deletion
const deletePost = async () => {
  if (!postToDelete.value) return
  
  try {
    await postService.deletePost(postToDelete.value.id)
    posts.value = posts.value.filter(post => post.id !== postToDelete.value.id)
    toast.success('Post deleted successfully', 'Success')
  } catch (err) {
    toast.error('Failed to delete post', 'Error')
  } finally {
    showDeleteModal.value = false
    postToDelete.value = null
  }
}
</script>

<style scoped>
.admin-posts-page {
  padding: 2rem 0;
}
</style>
