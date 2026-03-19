const axios = require('axios');

// Get all books
async function getAllBooks() {
    try {
        const response = await axios.get('http://localhost:5000/books');
        return response.data;
    } catch (error) {
        return { error: "Error fetching books" };
    }
}

// Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        return { error: "Book not found" };
    }
}

// Get books by Author
async function getBookByAuthor(author) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        return response.data;
    } catch (error) {
        return { error: "Author not found" };
    }
}

// Get books by Title
async function getBookByTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        return response.data;
    } catch (error) {
        return { error: "Title not found" };
    }
}

module.exports = {
    getAllBooks,
    getBookByISBN,
    getBookByAuthor,
    getBookByTitle
};
