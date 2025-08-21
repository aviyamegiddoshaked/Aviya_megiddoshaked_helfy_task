// backend/server.js  (unchanged except PORT=4000, middleware, router mounts)
const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorhandling");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
