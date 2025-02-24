const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const conf = require('../conf/conf.js');

const router = express.Router();

const pool = new Pool({
  host: conf.pgHost,
  user: conf.pgUser,
  password: conf.pgPassword,
  database: conf.pgDatabase,
  port: conf.pgPort
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

/**
 * Create Post
 */
router.post('/create', async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, slug, content, status, featuredImage, userId } = req.body;
    if (!title || !slug || !content || !status || !featuredImage || !userId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const result = await client.query(
      'INSERT INTO posts (title, slug, content, status, featuredimage, userid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, slug, content, status, featuredImage, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

/**
 * Get All Posts
 */
router.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT posts.*, users.email as author_email 
      FROM posts 
      LEFT JOIN users ON posts.userid = users.id 
      ORDER BY posts.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

/**
 * Get Single Post by Slug
 */
router.get('/:slug', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT posts.*, users.email as author_email 
      FROM posts 
      LEFT JOIN users ON posts.userid = users.id 
      WHERE posts.slug = $1
    `, [req.params.slug]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error in get post:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

/**
 * Edit Post by Slug
 */
router.put('/edit/:slug', async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, slug, content, status, featuredImage } = req.body;

    if (!title || !content || !status || !featuredImage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await client.query(`
      UPDATE posts 
      SET title = $1, slug = $2, content = $3, status = $4, featuredimage = $5, updated_at = CURRENT_TIMESTAMP 
      WHERE slug = $6 
      RETURNING *
    `, [title, slug, content, status, featuredImage, req.params.slug]);

    if (result.rows.length > 0) {
      res.json({ message: 'Post updated successfully', post: result.rows[0] });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Edit post error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

/**
 * Delete Post by Slug
 */
router.delete('/delete/:slug', async (req, res) => {
  const client = await pool.connect();
  try {
    const post = await client.query('SELECT * FROM posts WHERE slug = $1', [req.params.slug]);
    if (post.rows.length === 0) return res.status(404).json({ error: 'Post not found' });

    await client.query('DELETE FROM posts WHERE slug = $1', [req.params.slug]);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

/**
 * Upload Image
 */
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const fileID = req.file.filename;
    const filePath = `/uploads/${fileID}`;
    res.json({ fileID, filePath });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
