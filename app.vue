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
  title: 'Toivacuongsong',
  titleTemplate: (title) => (title !== 'Toivacuongsong' ? `${title} · Toivacuongsong` : title),
  meta: [
    { name: 'description', content: 'Toivacuongsong - Your source for the best tips and tricks.' },
    { property: 'og:title', content: 'Toivacuongsong' },
    { property: 'og:description', content: 'Your source for the best tips and tricks.' },
    { property: 'og:image', content: '/path/to/your/image.jpg' },
    { property: 'og:url', content: 'https://yourwebsite.com' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@your_twitter_handle' },
    { name: 'twitter:creator', content: '@your_twitter_handle' },
    { name: 'twitter:title', content: 'Toivacuongsong' },
    { name: 'twitter:description', content: 'Your source for the best tips and tricks.' },
    { name: 'twitter:image', content: '/path/to/your/image.jpg' }
  ]
  // link: [{ rel: 'icon', type: 'image/webp', href: '/movies.webp' }]
})
</script>
