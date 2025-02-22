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
    <Container>
      <div className="py-8 bg-lightBlue">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-darkBlue">Latest Blog Posts</h1>
          {userData && (
            <button
              onClick={() => navigate('/add-post')}
              className="bg-blue text-lightBlue px-4 py-2 rounded-lg hover:bg-deepBlue"
            >
              Add New Post
            </button>
          )}
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
}

export default Home;
