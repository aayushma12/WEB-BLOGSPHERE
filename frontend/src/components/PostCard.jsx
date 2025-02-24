import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import postgresService from '../services/postgres_service';

function PostCard({ post, onDelete }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData?.id === post.userid;

  if (!post) return null;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postgresService.deletePost(post.slug);
        if (onDelete) onDelete(post.id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const handleClick = () => {
    navigate(`/post/${post.slug}`, { state: { post } });
  };

  const handleEdit = () => {
    navigate(`/edit-post/${post.slug}`, { state: { post } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.featuredimage && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={postgresService.getFilePreview(post.featuredimage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-darkBlue">{post.title}</h2>
        <p className="text-gray-700 line-clamp-3 mb-4">{post.content}</p>

        {/* Author Section */}
        <span className="text-sm text-gray-500 block mb-4">
          By {post.author_email || 'Unknown'}
        </span>

        {/* Buttons Section */}
        <div className="flex justify-start gap-2">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue text-white rounded hover:bg-deepBlue"
          >
            Read More
          </button>
          {isAuthor && (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
