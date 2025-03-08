export const useSeo = () => {
  const setSeo = (options: {
    title: string
    description: string
    image?: string
    url?: string
  }) => {
    const config = useRuntimeConfig()
    const route = useRoute()

    const baseUrl = 'https://ToivaCuocsong.net'
    const currentUrl = options.url || `${baseUrl}${route.path}`
    const imageUrl = options.image || `${baseUrl}/default-og-image.jpg`

    useHead({
      title: options.title,
      meta: [
        {
          name: 'description',
          content: options.description
        },
        // Open Graph
        {
          property: 'og:title',
          content: options.title
        },
        {
          property: 'og:description',
          content: options.description
        },
        {
          property: 'og:image',
          content: imageUrl
        },
        {
          property: 'og:url',
          content: currentUrl
        },
        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: options.title
        },
        {
          name: 'twitter:description',
          content: options.description
        },
        {
          name: 'twitter:image',
          content: imageUrl
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: currentUrl
        }
      ]
    })
  }

  return {
    setSeo
  }
}
