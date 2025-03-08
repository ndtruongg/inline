export default function useCategory() {
  const getAllCategories = async () => {
    const response = await fetch('/api/categories')
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return await response.json()
  }

  const getCategoryById = async (id) => {
    const response = await fetch(`/api/categories/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch post')
    }
    return await response.json()
  }

  const createCategory = async (category) => {
    const response = await fetch('/api/categories/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    })
    if (!response.ok) {
      throw new Error('Failed to create post')
    }
    return await response.json()
  }

  const updateCategory = async (id, updatedCategory) => {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCategory)
    })
    if (!response.ok) {
      throw new Error('Failed to update post')
    }
    return await response.json()
  }

  const deleteCategory = async (id) => {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return await response.json();
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
