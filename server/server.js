const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json());

// Statik dosyaları sun (Render için düzeltildi)
app.use(express.static(__dirname));

// Ana sayfa için route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Diğer statik dosyalar için
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.js'));
});

pool.on('connect', () => {
  console.log('PostgreSQL veritabanına bağlandı');
});

pool.on('error', (err) => {
  console.error('PostgreSQL bağlantı hatası:', err);
});

app.get('/api/articles', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, 
             COUNT(c.id) as comment_count
      FROM articles a
      LEFT JOIN comments c ON a.id = c.article_id AND c.parent_id IS NULL
      GROUP BY a.id
      ORDER BY a.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Artykuły yükleme hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    
    const articleResult = await pool.query(
      'SELECT * FROM articles WHERE id = $1',
      [articleId]
    );
    
    if (articleResult.rows.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono artykułu' });
    }
    
    const commentsResult = await pool.query(
      `WITH RECURSIVE comment_tree AS (
        SELECT id, article_id, author, content, parent_id, created_at, updated_at, 0 as depth
        FROM comments 
        WHERE article_id = $1 AND parent_id IS NULL
        
        UNION ALL
        
        SELECT c.id, c.article_id, c.author, c.content, c.parent_id, c.created_at, c.updated_at, ct.depth + 1
        FROM comments c
        INNER JOIN comment_tree ct ON c.parent_id = ct.id
        WHERE c.article_id = $1
      )
      SELECT * FROM comment_tree ORDER BY created_at`,
      [articleId]
    );
    
    const article = articleResult.rows[0];
    
    const commentsMap = new Map();
    const rootComments = [];
    
    commentsResult.rows.forEach(comment => {
      comment.replies = [];
      commentsMap.set(comment.id, comment);
      
      if (comment.parent_id) {
        const parent = commentsMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });
    
    article.comments = rootComments;
    
    res.json(article);
  } catch (error) {
    console.error('Artykuł detay yükleme hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const { title, author, content } = req.body;
    
    if (!title || !author || !content) {
      return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }
    
    const result = await pool.query(
      `INSERT INTO articles (title, author, content, created_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING *`,
      [title, author, content]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Artykuł oluşturma hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    
    const result = await pool.query(
      'DELETE FROM articles WHERE id = $1 RETURNING id',
      [articleId]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Nie znaleziono artykułu' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Artykuł silme hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.post('/api/articles/:id/comments', async (req, res) => {
  try {
    const articleId = parseInt(req.params.id);
    const { author, content } = req.body;
    
    const articleCheck = await pool.query(
      'SELECT id FROM articles WHERE id = $1',
      [articleId]
    );
    
    if (articleCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Nie znaleziono artykułu' });
    }
    
    if (!author || !content) {
      return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }
    
    const result = await pool.query(
      `INSERT INTO comments (article_id, author, content, created_at) 
       VALUES ($1, $2, $3, NOW()) 
       RETURNING *`,
      [articleId, author, content]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Komentarz oluşturma hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.post('/api/articles/:articleId/comments/:commentId/replies', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const commentId = parseInt(req.params.commentId);
    const { author, content } = req.body;
    
    const commentCheck = await pool.query(
      'SELECT id FROM comments WHERE id = $1 AND article_id = $2',
      [commentId, articleId]
    );
    
    if (commentCheck.rowCount === 0) {
      return res.status(404).json({ error: 'Nie znaleziono komentarza' });
    }
    
    if (!author || !content) {
      return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
    }
    
    const result = await pool.query(
      `INSERT INTO comments (article_id, author, content, parent_id, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING *`,
      [articleId, author, content, commentId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Odpowiedź oluşturma hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.delete('/api/articles/:articleId/comments/:commentId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const commentId = parseInt(req.params.commentId);
    
    const result = await pool.query(
      'DELETE FROM comments WHERE id = $1 AND article_id = $2 RETURNING id',
      [commentId, articleId]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Nie znaleziono komentarza' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Komentarz silme hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

app.put('/api/articles/:articleId/comments/:commentId', async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);
    const commentId = parseInt(req.params.commentId);
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Treść jest wymagana' });
    }
    
    const result = await pool.query(
      `UPDATE comments 
       SET content = $1, updated_at = NOW() 
       WHERE id = $2 AND article_id = $3 
       RETURNING *`,
      [content, commentId, articleId]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Nie znaleziono komentarza' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Komentarz güncelleme hatası:', error);
    res.status(500).json({ error: 'Wystąpił błąd serwera' });
  }
});

// API olmayan tüm istekleri index.html'e yönlendir (SPA için)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa pod adresem http://localhost:${PORT}`);
  console.log('Baza danych: PostgreSQL');
});