const express = require('express');
const app = express();

// Routes
const general = require('./routes/general');
const auth_users = require('./routes/auth_users');

// Middleware
app.use(express.json());

// Routes use
app.use("/", general);
app.use("/customer", auth_users);

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
