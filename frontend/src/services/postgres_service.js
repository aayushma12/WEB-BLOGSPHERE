import api from './api';

class PostgresService {
  async createPost(data) {
    if (!data.title || !data.content || !data.slug || !data.featuredImage || !data.userId) {
      throw new Error('Missing required parameters');
    }

    try {
      const response = await api.post('/posts/create', {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status || 'active',
        featuredImage: data.featuredImage,
        userId: data.userId
      });
      
      return response.data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  }

  async getAllPosts() {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      const response = await api.get(`/posts/${slug}`);
      console.log('Raw post data:', response.data); // Debug log
      
      const post = response.data;
      // Ensure the image URL is set correctly
      if (post.featuredimage) {
        post.imageUrl = this.getFilePreview(post.featuredimage);
        console.log('Set image URL:', post.imageUrl); // Debug log
      }
      return post;
    } catch (error) {
      console.error('Get post error:', error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      const response = await api.delete(`/posts/delete/${slug}`);
      return response.data;
    } catch (error) {
      console.error('Delete post error:', error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    console.log('Getting file preview for:', fileId); // Debug log
    if (!fileId) return '';
    return `http://localhost:5000/uploads/${fileId}`; // Make sure this matches your server setup
  }

  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}

const postgresService = new PostgresService();
export default postgresService;
