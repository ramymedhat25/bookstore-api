const express = require("express");
const mongoose = require('mongoose');
const app = express();

//Middleware for parsing JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/books")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

//sample Data

const books = [
  { id: 1, title: "1984", author: "Jane Doe" },
  { id: 2, name: "To KIll", author: "George Doe" },
];

//Get All Books
app.get("/books", (req, res) => {
  res.json(books);
});

// Get a single book by ID
app.get("books/:id", (req, res) => {
  const bookId = parseInt(req.params.is);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
// Add a new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});
// Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    const updatedBook = {
      id: bookId,
      title: req.body.title,
      author: req.body.author,
    };
    books[bookIndex] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});
// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

//Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
