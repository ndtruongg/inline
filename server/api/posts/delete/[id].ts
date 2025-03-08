export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const posts = await $fetch('/api/posts')

  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Không tìm thấy bài viết' })
  }

  // Instead of removing the post, update its properties (soft delete)
  posts[index] = {
    ...posts[index],
    is_published: false,
    is_deleted: true,
    updated_at: new Date().toISOString()
  }

  await updateJSON(posts)

  return { message: 'Xóa bài viết thành công' }
})
