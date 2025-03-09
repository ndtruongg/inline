<template>
  <div>
    <div class="relative mx-auto flex h-screen w-full max-w-[800px] flex-col overflow-hidden">
      <ClientOnly>
        <div class="flex h-full flex-1">
          <div class="h-full flex-1 overflow-auto p-4 pt-0">
            <div class="mb-4 pt-4">
              <input
                type="text"
                id="title"
                v-model="title"
                placeholder="Nhập tiêu đề bài viết"
                class="block w-full rounded-md px-3 py-2 text-3xl font-medium outline-none"
              />
            </div>
            <AppEditor v-model="bodyContent"/>
          </div>
          <Transition name="slide">
            <div
              class="right-column fixed top-0 right-0 z-10 h-full overflow-auto w-[320px] border-l-[1px] border-gray-100 p-4 transition-all duration-300"
              v-show="showSetting"
            >
              <!-- Added icons to buttons -->
              <div class="mb-4 flex justify-end gap-2">
                <button
                  @click="saveDraft"
                  :disabled="isSaving"
                  class="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon v-if="!isSaving" name="ph:file-arrow-down" size="16px" />
                  <Icon v-else name="ph:spinner-gap" class="animate-spin" size="16px" />
                  {{ isSaving ? 'Đang lưu...' : 'Lưu nháp' }}
                </button>
                <button
                  @click="publish"
                  :disabled="isPublishing"
                  class="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Icon v-if="!isPublishing" name="ph:paper-plane-right-fill" size="16px" />
                  <Icon v-else name="ph:spinner-gap" class="animate-spin" size="16px" />
                  {{ isPublishing ? 'Đang đăng...' : 'Đăng bài' }}
                </button>
              </div>
  
              <!-- Category Selection -->
              <div class="mb-4">
                <label for="category" class="mb-1 block text-sm font-medium text-gray-700">
                  Danh mục
                </label>
                <div class="relative">
                  <select
                    id="category"
                    v-model="selectedCategoryId"
                    class="mt-1 block w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 pr-8 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn danh mục</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <Icon name="heroicons:chevron-down" size="16px" />
                  </div>
                </div>
                <p class="mt-1 text-xs text-gray-500" v-if="isCategoriesLoading">Đang tải danh mục...</p>
                <p class="mt-1 text-xs text-red-500" v-if="categoriesError">
                  Lỗi: Không thể tải danh mục
                </p>
              </div>
  
              <div class="mb-4">
                <label for="featureImage" class="mb-1 block text-sm font-medium text-gray-700">
                  Ảnh đại diện URL
                </label>
  
                <!-- Image preview box -->
                <div
                  class="mb-2 flex aspect-video items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-50"
                >
                  <img
                    v-if="featureImageUrl"
                    :src="featureImageUrl"
                    alt="Xem trước ảnh đại diện"
                    class="h-full w-full object-cover"
                  />
                  <div v-else class="flex flex-col items-center justify-center p-4 text-gray-400">
                    <Icon name="ph:image" size="48px" class="mb-2" />
                    <span class="text-center text-xs">Chưa chọn ảnh</span>
                  </div>
                </div>
  
                <input
                  type="text"
                  id="featureImage"
                  v-model="featureImageUrl"
                  placeholder="Nhập URL ảnh"
                  class="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="mb-4">
                <label for="excerpt" class="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  id="excerpt"
                  v-model="excerpt"
                  rows="3"
                  placeholder="Tóm tắt ngắn về bài viết (khuyến nghị 150-160 ký tự)"
                  class="mt-1 block w-full resize-none rounded-md border border-gray-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <p class="mt-1 text-xs text-gray-500">{{ excerpt.length }}/160 ký tự</p>
              </div>
              <div class="mb-4">
                <label for="keywords" class="block text-sm font-medium text-gray-700">Từ khóa</label>
                <input
                  type="text"
                  id="keywords"
                  v-model="keywords"
                  placeholder="Các từ khóa cách nhau bằng dấu phẩy (ví dụ: tin tức, thể thao, việt nam)"
                  class="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="mb-4">
                <label for="slug" class="block text-sm font-medium text-gray-700">Slug</label>
                <div class="mt-1 flex rounded-md">
                  <span
                    class="inline-flex items-center rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm text-gray-500"
                  >
                    /
                  </span>
                  <input
                    type="text"
                    id="slug"
                    v-model="slug"
                    placeholder="duong-dan-bai-viet"
                    class="block w-full rounded-r-md border border-gray-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  Slug được tự động tạo từ tiêu đề và được sử dụng trong URL.
                </p>
              </div>
              <div class="mb-4">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    v-model="isFeatured"
                    class="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label for="isFeatured" class="ml-2 block text-sm font-medium text-gray-700">
                    Bài viết nổi bật
                  </label>
                </div>
                <p class="mt-1 text-xs text-gray-500">Bài viết sẽ được hiển thị ở vị trí đặc biệt trên trang chủ.</p>
              </div>
              <div class="mb-4">
                <label for="canonicalUrl" class="block text-sm font-medium text-gray-700"
                  >URL gốc</label
                >
                <input
                  type="text"
                  id="canonicalUrl"
                  v-model="canonicalUrl"
                  class="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p class="mt-1 text-xs text-gray-500">URL gốc được tự động tạo từ slug.</p>
              </div>
            </div>
          </Transition>
        </div>
      </ClientOnly>
    </div>
    <button
      @click="toggleSetting"
      class="hover: absolute bottom-5 right-5 flex z-20 h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all ease-in-out hover:scale-110 focus:scale-95"
    >
      <Icon name="heroicons:adjustments-horizontal" size="24px" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import usePostService from '@/services/post'
import useCategoryService from '@/services/category'
import { useToast } from '~/composables/useToast'

interface Editor {
  content: string
}

interface Category {
  id: string | number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

definePageMeta({
  layout: 'admin'
})

const postService = usePostService()
const categoryService = useCategoryService()
const toast = useToast()
const showSetting = ref(false)
const featureImageUrl = ref<string | null>(null)
const title = ref('')
const slug = ref('')
const excerpt = ref('')
const keywords = ref('')
const canonicalUrl = ref('')
const bodyContent = ref('')
const isSaving = ref(false)
const isPublishing = ref(false)
const isFeatured = ref(false)

// Categories
const categories = ref<Category[]>([])
const selectedCategoryId = ref('')
const isCategoriesLoading = ref(false)
const categoriesError = ref(false)

// Fetch categories on component mount
onMounted(async () => {
  isCategoriesLoading.value = true
  categoriesError.value = false
  
  try {
    categories.value = await categoryService.getAllCategories()
  } catch (error) {
    console.error('Error fetching categories:', error)
    categoriesError.value = true
  } finally {
    isCategoriesLoading.value = false
  }
})

// Base URL for canonical links - would normally come from config or env
const baseUrl = 'https://ToivaCuocsong.vn'

// Auto-generate slug when title changes
watch(
  () => title.value,
  (newTitle) => {
    if (newTitle) {
      const normalizedTitle = removeVietnameseAccents(newTitle)

      slug.value = normalizedTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/-+/g, '-') // Replace consecutive dashes with a single dash
        .replace(/^-+|-+$/g, '') // Trim dashes from start and end
    } else {
      slug.value = ''
    }
  }
)

// Auto-generate canonical URL when slug changes
watch(
  () => slug.value,
  (newSlug) => {
    if (newSlug) {
      canonicalUrl.value = `${baseUrl}/${newSlug}`
    } else {
      canonicalUrl.value = ''
    }
  }
)

function toggleSetting() {
  showSetting.value = !showSetting.value
}

// Add functions for saving draft and publishing
const saveDraft = async () => {
  try {
    if (!title.value) {
      toast.warning('Tiêu đề không được để trống', 'Lỗi lưu nháp')
      return
    }

    isSaving.value = true
    const now = new Date().toISOString()
    const data = {
      title: title.value,
      excerpt: excerpt.value,
      body: bodyContent.value,
      slug: slug.value,
      keywords: keywords.value,
      feature_image: featureImageUrl.value,
      category_id: selectedCategoryId.value,
      is_published: false,
      created_at: now,
      updated_at: now,
      deleted_at: null,
      is_featured: isFeatured.value
    }

    await postService.createPost(data)
    toast.success('Lưu bản nháp thành công', 'Thành công')
  } catch (error) {
    console.error('Error saving draft:', error)
    toast.error('Không thể lưu bản nháp. Vui lòng thử lại sau.', 'Lỗi')
  } finally {
    isSaving.value = false
  }
}

const publish = async () => {
  try {
    // Validate required fields
    if (!title.value) {
      toast.warning('Tiêu đề không được để trống', 'Thiếu thông tin')
      return
    }
    
    if (!selectedCategoryId.value) {
      toast.warning('Vui lòng chọn danh mục cho bài viết', 'Thiếu thông tin')
      return
    }

    isPublishing.value = true
    const now = new Date().toISOString()
    const data = {
      title: title.value,
      slug: slug.value,
      body: bodyContent.value,
      excerpt: excerpt.value,
      keywords: keywords.value,
      feature_image: featureImageUrl.value,
      category_id: selectedCategoryId.value,
      is_published: true,
      created_at: now,
      updated_at: now,
      deleted_at: null,
      is_featured: isFeatured.value
    }

    await postService.createPost(data)
    
    // Reset form after successful submission
    title.value = ''
    slug.value = ''
    excerpt.value = ''
    keywords.value = ''
    canonicalUrl.value = ''
    featureImageUrl.value = null
    selectedCategoryId.value = ''
    bodyContent.value = ''
    isFeatured.value = false
    
    toast.success('Bài viết đã được đăng thành công', 'Thành công')
  } catch (error) {
    console.error('Error publishing post:', error)
    toast.error('Không thể đăng bài viết. Vui lòng thử lại sau.', 'Lỗi')
  } finally {
    isPublishing.value = false
  }
}
</script>

<style scoped>
/* Slide transition effects */
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
