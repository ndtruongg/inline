export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const id = event.context.params?.id;
    
    if (!id) {
      return {
        statusCode: 400,
        body: {
          error: 'Missing required parameter',
          message: 'Category ID is required'
        }
      };
    }
    
    // Parse the request body
    const body = await readBody(event);
    
    // Validate required fields
    if (!body.name) {
      return {
        statusCode: 400,
        body: {
          error: 'Missing required fields',
          message: 'Category name is required'
        }
      };
    }
    
    // GitHub API URL for the categories.json file
    const url = `https://api.github.com/repos/${config.githubOwner}/${config.githubRepo}/contents/categories.json?ref=${config.githubBranch}`;

    // Get current file content
    const response = await fetch(url, {
      headers: { Authorization: `token ${config.githubToken}` }
    });

    if (!response.ok) {
      throw createError({ 
        statusCode: response.status, 
        statusMessage: `Failed to access repository: ${response.status}` 
      });
    }

    const fileData = await response.json();
    const sha = fileData.sha;
    
    // Parse current categories from Base64 encoded content
    let categories = [];
    try {
      categories = JSON.parse(atob(fileData.content));
    } catch (e) {
      throw createError({ 
        statusCode: 500, 
        statusMessage: 'Could not parse existing categories data' 
      });
    }

    // Find the category to update
    const index = categories.findIndex((category: any) => category.id === id || category.id === parseInt(id));
    
    if (index === -1) {
      throw createError({ 
        statusCode: 404, 
        statusMessage: 'Category not found' 
      });
    }
    
    // Update the category
    const now = new Date();
    categories[index] = {
      ...categories[index],
      ...body,
      updated_at: now.toISOString()
    };

    // Encode updated content to Base64
    const updatedContent = btoa(JSON.stringify(categories, null, 2));

    // Update file on GitHub
    const updateResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${config.githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Update category: ${categories[index].name}`,
        content: updatedContent,
        sha: sha
      })
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw createError({ 
        statusCode: updateResponse.status, 
        statusMessage: `Failed to update category: ${errorText}` 
      });
    }

    // Return successful response
    return {
      statusCode: 200,
      body: {
        message: 'Category updated successfully',
        category: categories[index]
      }
    };
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
})