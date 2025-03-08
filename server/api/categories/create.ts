export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    
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
    
    // Generate metadata for the category
    const now = new Date();
    const category = {
      ...body,
      id: Date.now().toString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString()
    };

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
    const sha = fileData.sha; // SHA of file needed for update
    
    // Parse current categories from Base64 encoded content
    let currentCategories = [];
    try {
      currentCategories = JSON.parse(atob(fileData.content));
    } catch (e) {
      console.warn('Could not parse existing content, creating new array', e);
    }

    // Add new category to the array
    const updatedCategories = [...currentCategories, category];

    // Encode updated content to Base64
    const updatedContent = btoa(JSON.stringify(updatedCategories, null, 2));

    // Update file on GitHub
    const updateResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${config.githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add category: ${category.name}`,
        content: updatedContent,
        sha: sha
      })
    });

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      throw createError({ 
        statusCode: updateResponse.status, 
        statusMessage: `Failed to save category to repository: ${errorText}` 
      });
    }

    // Return successful response
    return {
      statusCode: 201,
      body: {
        message: 'Category created successfully',
        category
      }
    };
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
})