const Quote = require('../models/quoteModel');

exports.getAllQuotes = async (req, res) => {
    console.log("test");
  try {
    const quotes = await Quote.getAllQuotes();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};

exports.getRandomQuotes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const quotes = await Quote.getRandomQuotes(limit);
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random quotes' });
  }
};

exports.likeQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Quote.likeQuote(id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to like quote' });
  }
};

exports.addQuote = async (req, res) => {
  try {
    const { text, author, book_title } = req.body;
    if (!text || !author || !book_title) {
      return res.status(400).json({ error: 'Text, author, and book title are required' });
    }
    const newQuote = await Quote.addQuote(text, author, book_title);
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add quote' });
  }
};

exports.searchQuotes = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Search query is required' });
    const results = await Quote.searchQuotes(q);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search quotes' });
  }
};
