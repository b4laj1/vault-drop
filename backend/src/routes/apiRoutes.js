const express = require('express');
const router = express.Router();
const pool = require('../models/db')
const {upload, getSignedUrlForFile} = require('../middleware/middleware')


  router.get('/download/:id', async (req, res) => {
    try {
      const fileId = req.params.id;
      const result = await pool.query(
        'SELECT filename, s3_key, mimetype as file_type FROM files WHERE id = $1',
        [fileId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'File not found' });
      }
      const fileMeta = result.rows[0];
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileMeta.s3_key,
        Expires: 60
      };

      const url = await getSignedUrlForFile(params);
      res.json({ url, fileType: fileMeta.file_type });
    } catch (error) {
      console.error('Download error', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/getFiles', async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT id, filename, mimetype as file_type, created_at FROM files ORDER BY created_at DESC'
      );
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving files', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('/uploadFiles', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      const { originalname, key, location, mimetype, size } = req.file;
  
      const query = `
        INSERT INTO files (filename, s3_key, s3_location, mimetype, size)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
      const values = [originalname, key, location, mimetype, size];
      const result = await pool.query(query, values);
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Upload error:', err);
      res.status(500).json({ error: err.message });
    }
  });

  

module.exports =  router;
