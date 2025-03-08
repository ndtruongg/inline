export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = event.context.params?.id;
  
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Category ID is required" });
  }
  
  const url = `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/categories.json?ref=${config.githubBranch}`;
  
  const response = await fetch(url, {
    headers: { Authorization: `token ${config.githubToken}` },
  });
  
  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: "Error loading categories JSON" });
  }
  
  const data = await response.json();
  const content = atob(data.content);
  const categories = JSON.parse(content);
  
  const category = categories.find((category: any) => category.id === id || category.id === parseInt(id));
  
  if (!category) {
    throw createError({ statusCode: 404, statusMessage: "Category not found" });
  }
  
  return category;
})