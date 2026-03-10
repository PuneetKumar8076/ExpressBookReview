const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('../booksdb');

const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return users.some((user) => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(404).json({ message: "Username and password required" });
  }

  if (!isValid(username)) {
    users.push({ username, password });
    return res.status(200).json({ message: "User successfully registered" });
  } else {
    return res.status(404).json({ message: "User already exists" });
  }
});

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      { data: username },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session = { authorization: { accessToken } };

    return res.status(200).json({ message: "User successfully logged in" });
  }

  return res.status(208).json({ message: "Invalid login" });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;

  books[isbn].reviews["user"] = review;

  return res.json({ message: "Review added successfully" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  delete books[isbn].reviews["user"];

  return res.json({ message: "Review deleted successfully" });
});

module.exports = regd_users;
