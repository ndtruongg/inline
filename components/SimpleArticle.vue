<template>
  <article class="overflow-hidden rounded-[30px] bg-white shadow-lg">
    <NuxtLink :to="`/${post.slug}`">
      <div v-if="!isNoImage" :class="[isBig ? 'aspect-3/2' : 'aspect-square']">
        <NuxtImg
          placeholder
          placeholder-class="blur-xl"
          alt=""
          :loading="'lazy'"
          :style="{ 'view-transition-name': `post-${post.id}` }"
          :src="post?.feature_image"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="px-7 pb-8 pt-6">
        <h3 class="line-clamp-2 text-xl font-semibold">
          {{ post.title }}
        </h3>

        <p class="mt-4 text-sm text-date">{{ timePublished }}</p>

        <p v-if="isNoImage" class="mt-10 text-description">
          {{ post.excerpt }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { IPost } from '~/types';

interface ArticleProps {
  isBig?: boolean;
  post: IPost;
}

const props = withDefaults(defineProps<ArticleProps>(), {
  isBig: false,
});

const isNoImage = computed(() => {
  return props.post.feature_image === null;
});

const timePublished = computed(() => {
  return formatTime(Number(props.post.created_at))
});
</script>
