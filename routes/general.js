const express = require('express');
const axios = require('axios');
const public_users = express.Router();

let books = require("./booksdb.js");

// ✅ Get all books (using axios)
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000/books");
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving all books" });
  }
});

// ✅ Get book by ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;

    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(books[isbn]);

  } catch (error) {
    return res.status(500).json({ message: "Error retrieving book by ISBN" });
  }
});

// ✅ Get books by Author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author.toLowerCase();

    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    const filteredBooks = Object.values(books).filter(book =>
      book.author.toLowerCase().includes(author)
    );

    if (filteredBooks.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }

    return res.status(200).json(filteredBooks);

  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by author" });
  }
});

// ✅ Get books by Title
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title.toLowerCase();

    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    const filteredBooks = Object.values(books).filter(book =>
      book.title.toLowerCase().includes(title)
    );

    if (filteredBooks.length === 0) {
      return res.status(404).json({ message: "No books found for this title" });
    }

    return res.status(200).json(filteredBooks);

  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books by title" });
  }
});

module.exports.general = public_users;
