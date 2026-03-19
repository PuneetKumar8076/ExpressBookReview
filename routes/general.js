const express = require('express');
const books = require('../booksdb');

const general = express.Router();

// Q1: Get all books
general.get("/books", (req, res) => {
  return res.json(books);
});

// Q2: Get book by ISBN
general.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  return res.json(books[isbn]);
});

// Q3: Get books by author
general.get("/author/:author", (req, res) => {
  const author = req.params.author.toLowerCase();
  const filteredBooks = {};

  Object.keys(books).forEach(key => {
    if (books[key].author.toLowerCase().includes(author)) {
      filteredBooks[key] = books[key];
    }
  });

  return res.json(filteredBooks);
});

// Q4: Get books by title
general.get("/title/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const filteredBooks = {};

  Object.keys(books).forEach(key => {
    if (books[key].title.toLowerCase().includes(title)) {
      filteredBooks[key] = books[key];
    }
  });

  return res.json(filteredBooks);
});

// Q5: Get book review
general.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  return res.json(books[isbn].reviews);
});

module.exports = general;
