import api from './api';

export class MySQLService {
  async createPost(data) {
    if (!data.title || !data.content || !data.slug || !data.featuredImage || !data.userId) {
      throw new Error('Missing required parameters');
    }

    try {
      const currentUser = await api.get('/auth/current');
      const response = await api.post('/posts/create', {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status || 'active',
        featuredImage: data.featuredImage,
        userId: data.userId,
        author_email: currentUser.data.email // Ensure author email is included
      });
      
      return response.data;
    } catch (error) {
      console.error('Create post error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Failed to create post');
    }
  }

  async updatePost(slug, data) {
    const response = await api.put(`/posts/update/${slug}`, data);
    return response.data;
  }

  async deletePost(slug) {
    const response = await api.delete(`/posts/delete/${slug}`);
    return response.data;
  }

  async getPost(slug) {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  }

  async getAllPosts() {
    const response = await api.get('/posts');
    return response.data;
  }

  getFilePreview(fileID) {
    if (!fileID) return '';
    const url = `http://localhost:5000/uploads/${fileID}`;
    console.log('getFilePreview URL:', url); // Debugging
    return url;
  }

  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        fileID: response.data.fileID,
        fileName: response.data.fileName
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}

const mySQLService = new MySQLService();
export default mySQLService;
