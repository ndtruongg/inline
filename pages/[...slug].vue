<template>
  <TheContainer :max-width="1080">
    <div v-if="status === 'pending'">Loading...</div>
    <div v-else-if="data">
      <NuxtImg
        placeholder
        placeholder-class="blur-xl"
        :alt="data.title"
        :title="data.title"
        :loading="'lazy'"
        :style="{ 'view-transition-name': `post-${data.id}` }"
        :src="data.feature_image"
        class="h-full w-full object-cover"
      />

      <div
        class="content mx-auto w-full max-w-[800px]"
        v-html="data.body"
      ></div>
    </div>
  </TheContainer>
</template>

<script setup lang="ts">
import { usePostStore } from "~/stores/posts";
import type { IPost } from "~/types";

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);
const route = useRoute();
const postSlug = route.params.slug[0];
const postData = ref<IPost | null>(null);

if (posts.value.length === 0) {
  const { data, status } = await useAsyncData(`post-${postSlug}`, () =>
    $fetch(`/api/posts/${postSlug}`)
  );
  postData.value = data.value;
} else {
  postData.value = posts.value.find((post) => post.slug === postSlug) || null;

  if (!postData.value) {
    throw new Error("Post not found");
  }
}

const { data, status } = await useAsyncData(`post-${postSlug}`, () =>
  $fetch(`/api/posts/${postSlug}`)
);
</script>

<style lang="scss" scoped>
.content {
  h2,
  h3,
  p {
    width: 600px;
    max-width: 100%;
    margin: 20px auto;
    font-size: 16px;
    line-height: 28px;
  }
}
</style>
