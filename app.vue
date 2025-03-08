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
  title: 'TipsHub',
  titleTemplate: (title) => (title !== 'TipsHub' ? `${title} · TipsHub` : title),
  meta: [
    { name: 'description', content: 'TipsHub - Your source for the best tips and tricks.' },
    { property: 'og:title', content: 'TipsHub' },
    { property: 'og:description', content: 'Your source for the best tips and tricks.' },
    { property: 'og:image', content: '/path/to/your/image.jpg' },
    { property: 'og:url', content: 'https://yourwebsite.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@your_twitter_handle' },
    { name: 'twitter:creator', content: '@your_twitter_handle' },
    { name: 'twitter:title', content: 'TipsHub' },
    { name: 'twitter:description', content: 'Your source for the best tips and tricks.' },
    { name: 'twitter:image', content: '/path/to/your/image.jpg' }
  ]
  // link: [{ rel: 'icon', type: 'image/webp', href: '/movies.webp' }]
})
</script>
