import { IPost } from "~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const posts = await $fetch("/api/posts"); // Gọi API lấy tất cả bài viết

  const post = posts.find((p: IPost) => p.slug === id);
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "Không tìm thấy bài viết",
    });
  }
  return post;
});
