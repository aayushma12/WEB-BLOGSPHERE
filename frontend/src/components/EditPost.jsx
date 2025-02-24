import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import postgresService from '../services/postgres_service';

function EditPost() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const post = state?.post;

  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedPost = await postgresService.updatePost(post.slug, { title, content });
      alert('Post updated successfully!');
      navigate(`/post/${updatedPost.slug}`, { state: { post: updatedPost } });
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full px-3 py-2 border rounded h-40"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
