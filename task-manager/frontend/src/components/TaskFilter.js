export default function TaskFilter({ value, onChange }) {
  return (
    <div className="filters">
      <label htmlFor="task-filter">Filter:</label>
      <select
        id="task-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
