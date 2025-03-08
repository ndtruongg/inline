export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const url = `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/posts.json?ref=${config.githubBranch}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `token ${config.githubToken}` },
  });

  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: "Lỗi tải JSON" });
  }

  const data = await response.json();
  const content = atob(data.content); // Giải mã Base64
  return JSON.parse(content);
})