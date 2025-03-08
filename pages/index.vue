<template>
  <div class="px-5">
    <HighlightArticle v-if="posts.length > 0" :post="posts[0]" />

    <TheContainer class="mt-20">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <template v-else>
        <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-10">
          <SimpleArticle v-for="post in posts.slice(1, 4)" :key="post.id" :post="post" />
        </div>
        <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          <SimpleArticle v-for="post in posts.slice(4, 6)" :key="post.id" :post="post" :is-big="true" />
        </div>

        <div class="mt-20 flex items-center justify-center">
          <TheButton class="h-20 rounded-[40px] px-10 text-xl font-semibold">Tải thêm</TheButton>
        </div>
      </template>
    </TheContainer>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '~/stores/posts'

const store = usePostStore()
const { posts, loading: isLoading, error } = storeToRefs(store)
const { fetchPosts } = store

onMounted(async () => {
  await fetchPosts()
})
</script>

<style scoped></style>
