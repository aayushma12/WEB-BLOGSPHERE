import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container } from '../components';
import { useSelector } from 'react-redux';
import postgresService from '../services/postgres_service';

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData && post.userid === userData.id;

  useEffect(() => {
    async function fetchPost() {
      try {
        if (location.state?.post) {
          setPost(location.state.post);
          setLoading(false);
          return;
        }
        const data = await postgresService.getPost(slug);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug, location.state]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postgresService.deletePost(slug);
        navigate('/');
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!post) return <div className="text-center p-4">Post not found</div>;

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        {post.featuredimage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={postgresService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-600">By {post.author_email}</p>
          <p className="text-gray-600">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
        {isAuthor && (
          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Post;