<template>
  <TheContainer :max-width="1200" class="mt-20">
    <article class="flex flex-col lg:grid lg:grid-cols-9 lg:gap-10">
      <div class="aspect-square overflow-hidden rounded-2xl lg:col-span-4">
        <NuxtLink :to="`/${post.slug}`">
          <NuxtImg
            placeholder
            placeholder-class="blur-xl"
            alt=""
            :loading="'lazy'"
            :style="{ 'view-transition-name': `post-${post.id}` }"
            :src="post.feature_image"
            class="h-full w-full object-cover"
          />
        </NuxtLink>
      </div>

      <div class="flex flex-col justify-center p-6 lg:col-span-5 lg:p-0">
        <TheTag class="mb-3">{{ categoryName }}</TheTag>

        <h3 class="mt-5">
          <NuxtLink
            :to="`/${post.slug}`"
            class="text-xl font-semibold lg:text-3xl"
          >
            {{ post.title }}
          </NuxtLink>
        </h3>

        <p
          class="mt-6 line-clamp-2 text-base text-description lg:mt-8 lg:text-lg"
        >
          {{ post.excerpt }}
        </p>

        <span class="mt-3 block text-sm text-date lg:mt-6"
          >10 tháng 2, 2025</span
        >
      </div>
    </article>
  </TheContainer>
</template>

<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories';
import type { IPost } from '~/types';

const props = withDefaults(
  defineProps<{
    post: IPost;
  }>(),
  {}
);

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);

const categoryName = computed(() => {
  const category = categories.value.find(
    (category) => category.id === props.post.category_id
  );
  return category ? category.name : '';
});
</script>
