const pool = require('../config/db');

async function initializeDatabase() {
  const connection = await pool.getConnection();

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      text TEXT NOT NULL,
      author VARCHAR(255) NOT NULL,
      book_title VARCHAR(255) NOT NULL,
      likes_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  connection.release();
}

async function getAllQuotes() {
  const [rows] = await pool.execute('SELECT * FROM quotes ORDER BY created_at DESC');
  return rows;
}

async function getRandomQuotes(limit = 10) {
  const [rows] = await pool.execute('SELECT * FROM quotes ORDER BY RAND() LIMIT ?', [limit]);
  return rows;
}

async function likeQuote(id) {
  await pool.execute('UPDATE quotes SET likes_count = likes_count + 1 WHERE id = ?', [id]);
  const [rows] = await pool.execute('SELECT likes_count FROM quotes WHERE id = ?', [id]);
  return rows[0];
}

async function addQuote(text, author, book_title) {
  const [result] = await pool.execute(
    'INSERT INTO quotes (text, author, book_title) VALUES (?, ?, ?)',
    [text, author, book_title]
  );
  const [newQuote] = await pool.execute('SELECT * FROM quotes WHERE id = ?', [result.insertId]);
  return newQuote[0];
}

async function searchQuotes(query) {
  const [rows] = await pool.execute(
    `SELECT * FROM quotes 
     WHERE text LIKE ? OR author LIKE ? OR book_title LIKE ?
     ORDER BY created_at DESC`,
    [`%${query}%`, `%${query}%`, `%${query}%`]
  );
  return rows;
}

module.exports = {
  initializeDatabase,
  getAllQuotes,
  getRandomQuotes,
  likeQuote,
  addQuote,
  searchQuotes
};
