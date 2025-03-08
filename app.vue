<template>
  <NuxtLoadingIndicator />
  <TheToast />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'vi'
  },
  // charset: 'utf-8',
  title: 'ToivaCuocsong',
  titleTemplate: (title) => (title !== 'ToivaCuocsong' ? `${title} · ToivaCuocsong` : title),
  meta: [
    { name: 'description', content: 'ToivaCuocsong - Your source for the best tips and tricks.' },
    { property: 'og:title', content: 'ToivaCuocsong' },
    { property: 'og:description', content: 'Your source for the best tips and tricks.' },
    { property: 'og:image', content: '/path/to/your/image.jpg' },
    { property: 'og:url', content: 'https://yourwebsite.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@your_twitter_handle' },
    { name: 'twitter:creator', content: '@your_twitter_handle' },
    { name: 'twitter:title', content: 'ToivaCuocsong' },
    { name: 'twitter:description', content: 'Your source for the best tips and tricks.' },
    { name: 'twitter:image', content: '/path/to/your/image.jpg' }
  ]
  // link: [{ rel: 'icon', type: 'image/webp', href: '/movies.webp' }]
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>