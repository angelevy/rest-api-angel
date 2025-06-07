// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

let books = require("./data");

app.use(cors());
app.use(bodyParser.json());

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// GET book by id
app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// POST new book
app.post("/books", (req, res) => {
    const { title, author, coverUrl, email } = req.body;
    const newBook = {
        id: Date.now().toString(),
        title,
        author,
        coverUrl,
        email
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (update) book
app.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const { title, author, coverUrl, email } = req.body;
    const index = books.findIndex(b => b.id === id);

    if (index !== -1) {
        books[index] = { id, title, author, coverUrl, email };
        res.json(books[index]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE book
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);
    if (index !== -1) {
        const deleted = books.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
