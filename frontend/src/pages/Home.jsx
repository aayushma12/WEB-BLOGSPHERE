import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components';
import mySQLService from '../services/mysql_service';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const userData = useSelector(state => state.auth.userData);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const result = await mySQLService.getAllPosts();
        setPosts(result);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostDelete = (deletedPostId) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="w-full min-h-screen p-0 m-0">
      <Container className="w-full p-0 m-0">
        <div className="w-full py-20 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-pink-400 via-white to-red-500">
          <div className="w-full max-w-4xl text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Latest Blog Posts</h1>
            {userData && (
  <button
    onClick={() => navigate('/add-post')}
    className="bg-emerald text-pureWhite font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-forestGreen focus:ring-2 focus:ring-mintGreen focus:outline-none transition duration-300"
  >
    Add New Post
  </button>
)}

          </div>

          <div className="w-full max-w-md mb-10 px-4">
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-800 shadow-inner focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>

          {filteredPosts.length === 0 ? (
            <p className="text-center text-gray-700">No posts found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
              {filteredPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onDelete={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;