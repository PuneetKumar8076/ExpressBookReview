const express = require('express');
const books = require('../booksdb');

const router = express.Router();

router.get('/books', (req,res)=>{
  return res.json(books);
});

router.get('/isbn/:isbn',(req,res)=>{
  const isbn=req.params.isbn;
  return res.json(books[isbn]);
});

module.exports = router;
