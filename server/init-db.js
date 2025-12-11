const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initDatabase() {
  try {
    console.log('Veritabanı başlatılıyor...');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
        author VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);
      CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
    `);

    const checkArticles = await pool.query('SELECT COUNT(*) FROM articles');
    if (parseInt(checkArticles.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO articles (title, author, content, created_at) VALUES
        ('Witamy! To jest pierwszy artykuł', 'Administrator', 'System działa poprawnie. Możesz edytować i usuwać komentarze oraz artykuły!', NOW())
      `);
      console.log('Başlangıç verisi eklendi.');
    }

    console.log('Veritabanı başarıyla hazırlandı.');
    pool.end();
  } catch (error) {
    console.error('Veritabanı başlatma hatası:', error);
    pool.end();
  }
}

initDatabase();