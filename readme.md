# Task Manager

A simple full-stack Task Manager built with **Express.js** (backend) and **React (CRA)** (frontend).

---

## Repository Structure


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


---

## Setup and Installation

### Prerequisites
- Node.js **18+** (works with newer versions too)
- npm

### 1. Backend (port **4000**)
```bash
cd backend
npm install
npm run dev   # or: npm start
```

Runs at: http://localhost:4000

### 2. FrontEnd (port **3000**)
``bash
cd frontend
npm install
npm start

```

## API Documentation (Backend)

**Base URL:** `http://localhost:4000`

### Task Model
```json
{
  "id": 1,
  "title": "Buy milk",
  "description": "2%",
  "completed": false,
  "createdAt": "2025-08-21T10:00:00.000Z",
  "priority": "low" | "medium" | "high"
}

### Quick cURL Examples

#### Create
```bash
curl -X POST http://localhost:4000/api/tasks \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk","description":"2%","priority":"high"}'
```

Toggle
curl -X PATCH http://localhost:4000/api/tasks/1/toggle
Update
curl -X PUT http://localhost:4000/api/tasks/1 \
 -H "Content-Type: application/json" \
 -d '{"title":"Buy milk and eggs","priority":"low"}'
Delete
curl -i -X DELETE http://localhost:4000/api/tasks/


## Frontend Notes

- Built with **Create React App** (port `3000`).
- Hooks used: `useState`, `useEffect`, `useMemo`.

### Endless Carousel (TaskList.js)
- Implemented in vanilla JS/React (**no external carousel libraries**).
- List is rendered twice (`A + A`).
- Uses `requestAnimationFrame` to increment horizontal scroll.
- Seamless looping by resetting at half width.
- Pauses auto-scroll on hover for usability.
- Respects `prefers-reduced-motion`.

### Components
- **App** — container, data fetching, state & handlers.  
- **TaskList** — endless carousel of tasks.  
- **TaskItem** — single task card (toggle, edit, delete).  
- **TaskForm** — create/edit form (title, description, priority).  
- **TaskFilter** — dropdown filter: *All / Completed / Pending*.  

### Styling
- Plain **CSS only** (`frontend/src/styles/styles.css`).  
- Responsive layout, priority badges, hover/focus states.  
- **Empty state:** if no tasks → carousel shows a friendly empty message.  


