export default function usePost() {
  const getAllPosts = async () => {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  }

  const getPostById = async (id) => {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  }

  const createPost = async (post) => {
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return await response.json();
  }

  const updatePost = async (id, post) => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return await response.json();
  }

  const deletePost = async (id) => {
    const response = await fetch(`/api/posts/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return await response.json();
  }

  return {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  }
}