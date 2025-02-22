import React, { useState, useEffect } from 'react';
import { Container } from '../components';
import mySQLService from '../services/mysql_service';
import PostCard from '../components/PostCard';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-8">All Blog Posts</h1>
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default AllPosts;