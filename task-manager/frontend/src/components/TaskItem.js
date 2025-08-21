export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const { title, description, completed, priority, createdAt } = task;

  return (
    <article className={`card ${completed ? "done" : ""}`} tabIndex={0}>
      <div className={`badge ${priority}`}>{priority}</div>
      <h3>{title}</h3>
      {description && <p className="desc">{description}</p>}
      <p className="meta">Created: {new Date(createdAt).toLocaleString()}</p>
      <div className="actions">
        <button onClick={onToggle}>
          {completed ? "Mark Pending" : "Mark Done"}
        </button>
        <button onClick={onEdit}>Edit</button>
        <button
          className="danger"
          onClick={() => { if (confirm("Delete this task?")) onDelete(); }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
