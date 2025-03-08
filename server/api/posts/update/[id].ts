export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const posts = await $fetch('/api/posts')

  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy bài viết' })
  }

  // Add updated_at timestamp
  const now = new Date().toISOString()
  posts[index] = { 
    ...posts[index], 
    ...body,
    updated_at: now 
  }
  
  await updateJSON(posts)

  return { message: 'Cập nhật thành công', post: posts[index] }
})
