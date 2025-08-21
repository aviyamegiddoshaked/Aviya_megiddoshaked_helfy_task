// backend/routes/tasks.js
const express = require("express");
const router = express.Router();

// In-memory store
let tasks = [];
let nextId = 1;

// Validation helpers 
const PRIORITIES = ["low", "medium", "high"];

function validateCreate(body) {
  const errors = [];
  if (typeof body.title !== "string" || body.title.trim().length === 0) {
    errors.push("title is required and must be a non-empty string");
  } else if (body.title.length > 100) {
    errors.push("title must be ≤ 100 characters");
  }
  if (body.description != null) {
    if (typeof body.description !== "string") errors.push("description must be a string");
    else if (body.description.length > 500) errors.push("description must be ≤ 500 characters");
  }
  if (body.completed != null && typeof body.completed !== "boolean") {
    errors.push("completed must be a boolean");
  }
  if (body.priority != null && !PRIORITIES.includes(body.priority)) {
    errors.push("priority must be 'low', 'medium', or 'high'");
  }
  return errors;
}

function validateUpdate(body) {
  const errors = [];
  if (body.title != null) {
    if (typeof body.title !== "string" || body.title.trim().length === 0) {
      errors.push("title must be a non-empty string");
    } else if (body.title.length > 100) {
      errors.push("title must be ≤ 100 characters");
    }
  }
  if (body.description != null) {
    if (typeof body.description !== "string") errors.push("description must be a string");
    else if (body.description.length > 500) errors.push("description must be ≤ 500 characters");
  }
  if (body.completed != null && typeof body.completed !== "boolean") {
    errors.push("completed must be a boolean");
  }
  if (body.priority != null && !PRIORITIES.includes(body.priority)) {
    errors.push("priority must be 'low', 'medium', or 'high'");
  }
  return errors;
}

// Endpoints 

// GET /api/tasks - all tasks
router.get("/", (_req, res) => res.json(tasks));

// POST /api/tasks - create task
router.post("/", (req, res) => {
  const errors = validateCreate(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const now = new Date().toISOString();
  const task = {
    id: nextId++, // number per spec
    title: req.body.title.trim(),
    description: req.body.description?.trim() || "",
    completed: Boolean(req.body.completed) || false,
    createdAt: now,
    priority: req.body.priority || "medium"
  };
  tasks.push(task);
  return res.status(201).json(task);
});

// PUT /api/tasks/:id - update task
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  const errors = validateUpdate(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const prev = tasks[idx];
  const updated = {
    ...prev,
    title: req.body.title != null ? req.body.title.trim() : prev.title,
    description: req.body.description != null ? req.body.description.trim() : prev.description,
    completed: req.body.completed != null ? Boolean(req.body.completed) : prev.completed,
    priority: req.body.priority != null ? req.body.priority : prev.priority,
  };
  tasks[idx] = updated;
  res.json(updated);
});

// DELETE /api/tasks/:id - delete task
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(idx, 1);
  res.status(204).send();
});

// PATCH /api/tasks/:id/toggle - toggle completion
router.patch("/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.completed = !task.completed;
  res.json(task);
});

module.exports = router;
