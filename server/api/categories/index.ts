export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/categories.json?ref=${config.githubBranch}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `token ${config.githubToken}` },
  });
  
  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: "Error loading categories JSON" });
  }
  
  const data = await response.json();
  const content = atob(data.content); // Decode Base64
  return JSON.parse(content);
})