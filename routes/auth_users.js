const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('../booksdb');

const regd_users = express.Router();
regd_users.use(express.json());

let users = [];

// check username exists
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// check login
const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// Q6: Register
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username, password });
      return res.json({ message: "User successfully registered" });
    } else {
      return res.status(404).json({ message: "User already exists" });
    }
  }

  return res.status(404).json({ message: "Unable to register user" });
});

// Q7: Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (authenticatedUser(username, password)) {
    let token = jwt.sign({ username }, "access", { expiresIn: 60 * 60 });
    return res.json({ message: "User successfully logged in", token });
  } else {
    return res.status(401).json({ message: "Invalid login" });
  }
});

// middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  console.log("AUTH HEADER:", authHeader);  //  check 1

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  console.log("TOKEN:", token);             //  check 2

  jwt.verify(token, "access", (err, user) => {
    if (err) {
      console.log("JWT ERROR:", err);       //  check 3
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

// Q9: Add review
regd_users.put("/auth/review/:isbn", verifyToken, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.username;

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;

  return res.json({ message: "Review added/updated successfully" });
});

// Q10: Delete review
regd_users.delete("/auth/review/:isbn", verifyToken, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;

  delete books[isbn].reviews[username];

  return res.json({ message: "Review deleted successfully" });
});

module.exports = regd_users;
