export default defineEventHandler(async (event) => {
  const body = await readBody(event) // Lấy dữ liệu từ request body
  const posts = await $fetch('/api/posts')

  const newPost = { ...body, id: posts.length + 1 }
  posts.push(newPost)

  await updateJSON(posts)
  return { message: 'Tạo bài viết thành công', post: newPost }
})
