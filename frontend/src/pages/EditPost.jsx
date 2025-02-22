import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mySQLService from '../services/mysql_service';
import PostForm from '../components/Post_upload_form';

function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      const result = await mySQLService.getPost(slug);
      setPost(result);
    }
    fetchPost();
  }, [slug]);

  const handleSubmit = async (data) => {
    await mySQLService.updatePost(slug, data);
    navigate(`/post/${slug}`);
  };

  return post ? <PostForm post={post} onSubmit={handleSubmit} /> : <div>Loading...</div>;
}

export default EditPost;