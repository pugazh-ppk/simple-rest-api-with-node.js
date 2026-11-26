// Import Express framework
const express = require("express");

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON data
app.use(express.json());

// In-memory storage for notes
let notes = [
  {
    id: 1,
    title: "Welcome",
    content: "Welcome to my Notes REST API!"
  }
];

let nextId = 2;

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CodeOrbit Notes API!",
    availableRoutes: [
      "GET /api/notes",
      "GET /api/notes/:id",
      "POST /api/notes",
      "PUT /api/notes/:id",
      "DELETE /api/notes/:id"
    ]
  });
});

// GET - View all notes
app.get("/api/notes", (req, res) => {
  res.status(200).json({
    success: true,
    total: notes.length,
    data: notes
  });
});

// GET - View a single note
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find(item => item.id === id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }

  res.status(200).json({
    success: true,
    data: note
  });
});

// POST - Add a new note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof content !== "string" ||
    !content.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide title and content"
    });
  }

  const newNote = {
    id: nextId++,
    title: title.trim(),
    content: content.trim()
  };

  notes.push(newNote);

  res.status(201).json({
    success: true,
    message: "Note added successfully",
    data: newNote
  });
});

// PUT - Update an existing note
app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find(item => item.id === id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }

  const { title, content } = req.body;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof content !== "string" ||
    !content.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide title and content"
    });
  }

  note.title = title.trim();
  note.content = content.trim();

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note
  });
});

// DELETE - Delete a note
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const noteExists = notes.some(item => item.id === id);

  if (!noteExists) {
    return res.status(404).json({
      success: false,
      message: "Note not found"
    });
  }

  notes = notes.filter(item => item.id !== id);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully"
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
