const express = require('express');
const books = require('../booksdb');

const router = express.Router();

// Get all books
router.get('/books', (req, res) => {
  return res.json(books);
});

// Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.json(books[isbn]);
});

// Get books by author
router.get('/author/:author', (req, res) => {
  const author = req.params.author;
  const result = Object.values(books).filter(book => book.author === author);
  return res.json(result);
});

// Get books by title
router.get('/title/:title', (req, res) => {
  const title = req.params.title;
  const result = Object.values(books).filter(book => book.title === title);
  return res.json(result);
});

// Get reviews
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  return res.json(books[isbn].reviews);
});

module.exports = router;
