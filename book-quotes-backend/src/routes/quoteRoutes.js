const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

router.get('/', quoteController.getAllQuotes);
router.get('/random', quoteController.getRandomQuotes);
router.post('/:id/like', quoteController.likeQuote);
router.post('/', quoteController.addQuote);
router.get('/search', quoteController.searchQuotes);

module.exports = router;
