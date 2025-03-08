<template>
  <div class="px-5">
    <HighlightArticle v-if="featurePost" :post="featurePost" />

    <TheContainer class="mt-20">
      <div v-if="status === 'pending'">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <template v-else-if="postsData">
        <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-10">
          <SimpleArticle
            v-for="post in postsData.slice(1, 4)"
            :key="post.id"
            :post="post"
          />
        </div>
        <div class="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          <SimpleArticle
            v-for="post in postsData.slice(4, 6)"
            :key="post.id"
            :post="post"
            :is-big="true"
          />
        </div>

        <div class="mt-20 flex items-center justify-center">
          <TheButton class="h-20 rounded-[40px] px-10 text-xl font-semibold"
            >Tải thêm</TheButton
          >
        </div>
      </template>
    </TheContainer>
  </div>
</template>

<script setup lang="ts">
import { usePostStore } from "~/stores/posts";
import { useCategoryStore } from "~/stores/categories";
import type { IPost } from "~/types";

const postStore = usePostStore();
const categoryStore = useCategoryStore();

const {
  data: postsData,
  status,
  error,
} = await useAsyncData<IPost[]>("posts", () =>
  $fetch("/api/posts").then((res) => {
    postStore.setPosts(res);
    return res;
  })
);

await useAsyncData("categories", () =>
  $fetch("/api/categories").then((res) => {
    categoryStore.setCategories(res);
    return res;
  })
);

const featurePost = computed(() => {
  return (
    (postsData.value || []).find((post) => post.is_featured) ||
    postsData.value?.[0]
  );
});
</script>

<style scoped></style>
