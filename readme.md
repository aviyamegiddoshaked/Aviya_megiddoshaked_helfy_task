A simple full-stack Task Manager built with Express.js (backend) and React (CRA) (frontend).

Repository Structure
task-manager/
├── backend/
│ ├── package.json
│ ├── server.js
│ ├── routes/
│ │ └── tasks.js
│ └── middleware/
│ ├── errorHandler.js
│ └── notFound.js
├── frontend/
│ ├── package.json
│ ├── public/
│ │ └── index.html
│ └── src/
│ ├── components/
│ │ ├── TaskFilter.js
│ │ ├── TaskForm.js
│ │ ├── TaskItem.js
│ │ └── TaskList.js
│ ├── services/
│ │ └── api.js
│ ├── styles/
│ │ └── styles.css
│ ├── App.js
│ └── index.js
├── .gitignore
└── README.md

SetUp and Installation
Prerequisites
Node.js 18+ (works on newer too)
npm

1. Backend (port 4000)
   cd backend
   npm install
   npm run dev # or: npm start

# → http://localhost:4000

2. Frontend (port 3000)
   cd frontend
   npm install
   npm start

# → http://localhost:3000

API Documentation (Backend)
Base URL: http://localhost:4000
Task Model
{
"id": 1,
"title": "Buy milk",
"description": "2%",
"completed": false,
"createdAt": "2025-08-21T10:00:00.000Z",
"priority": "low" | "medium" | "high"
}

Quick cURL examples

# Create

curl -X POST http://localhost:4000/api/tasks \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk","description":"2%","priority":"high"}'

# List

curl http://localhost:4000/api/tasks

# Toggle

curl -X PATCH http://localhost:4000/api/tasks/1/toggle

# Update

curl -X PUT http://localhost:4000/api/tasks/1 \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk and eggs","priority":"low"}'

# Delete

curl -i -X DELETE http://localhost:4000/api/tasks/1

Frontend Notes
Built with Create React App (port 3000).
Hooks used: useState, useEffect, useMemo.
Endless carousel: implemented in TaskList.js using vanilla JS/React:
List rendered twice (A + A).
requestAnimationFrame increments horizontal scroll.
Seamless loop by jumping back at half width.
No external carousel libraries.
Pauses auto-scroll on hover for usability; respects prefers-reduced-motion.
Components
App — container, data fetching, state & handlers.
TaskList — endless carousel of tasks.
TaskItem — single task card with toggle/edit/delete.
TaskForm — create/edit form (title, description, priority).
TaskFilter — dropdown filter: All / Completed / Pending.
Styling: plain CSS only (frontend/src/styles/styles.css) — responsive layout, priority badges, hover/focus states.
Empty state: If no tasks, carousel shows a friendly empty message.
