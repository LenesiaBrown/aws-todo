import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { listTasks } from "../graphql/queries";
import {
  createTask as createTaskMutation,
  updateTask as updateTaskMutation,
  deleteTask as deleteTaskMutation,
} from "../graphql/mutations";

const client = generateClient();


function TodoApp() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // new: to show while we load from AWS



  useEffect(() => {
  async function fetchTasks() {
    try {
      const response = await client.graphql({
        query: listTasks,
      });

      // This is where Amplify puts the list of tasks
      const items = response.data.listTasks.items;

      // Optional: sort newest first
      items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      setTasks(items);
    } catch (err) {
      console.error("Error fetching tasks from AWS:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchTasks();
}, []);




  // ADDING A TASK

  async function handleAddTask(e) {
  e.preventDefault(); // stop form from refreshing page

  const trimmed = taskText.trim();
  if (!trimmed) return;

  try {
    // Call AWS to create a new Task in the database
    const response = await client.graphql({
      query: createTaskMutation,
      variables: {
        input: {
          text: trimmed,
          done: false,
        },
      },
    });

    // Amplify returns the created task here
    const newTask = response.data.createTask;

    // Put the new task at the top of the list
    setTasks((prev) => [newTask, ...prev]);

    // Clear input
    setTaskText("");
  } catch (err) {
    console.error("Error creating task in AWS:", err);
  }
}



  // TOGGLE A TASK (done / not done)

  async function toggleTask(id) {
  // Find the task we want to toggle
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  try {
    const response = await client.graphql({
      query: updateTaskMutation,
      variables: {
        input: {
          id: task.id,
          done: !task.done,
        },
      },
    });

    const updatedTask = response.data.updateTask;

    // Update it in local state
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  } catch (err) {
    console.error("Error updating task in AWS:", err);
  }
}



  // DELETE A TASK
 
  async function deleteTask(id) {
  try {
    // Delete from AWS first
    await client.graphql({
      query: deleteTaskMutation,
      variables: {
        input: { id },
      },
    });

    // Then remove it from local state
    setTasks((prev) => prev.filter((task) => task.id !== id));
  } catch (err) {
    console.error("Error deleting task in AWS:", err);
  }
}



  // UI (what the user sees)  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-50 px-4">
      <div className="w-full max-w-md bg-slate-950 rounded-2xl p-6 shadow-2xl border border-slate-800">
        <h1 className="text-2xl font-semibold mb-2">
          To Do List
        </h1>
        <p className="text-sm text-slate-400 mb-4">
          A simple to-do app.
        </p>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Add a task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-500 text-sm font-semibold text-white hover:bg-indigo-600 active:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </form>

        {loading && (
          <p className="text-xs text-slate-400">
            Loading your tasks from the cloud…
          </p>
        )}

        {!loading && tasks.length === 0 && (
          <p className="text-xs text-slate-500">
            No tasks yet. Add your first one above.
          </p>
        )}

        {!loading && tasks.length > 0 && (
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between px-3 py-2 rounded-lg border border-slate-800 bg-slate-900"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-2 flex-1 text-left text-sm ${
                    task.done ? "line-through opacity-60" : ""
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 border-indigo-500 ${
                      task.done ? "bg-indigo-500" : ""
                    }`}
                  />
                  <span>{task.text}</span>
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 text-xs text-rose-400 hover:text-rose-300"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

      </div>
  </div>
);
}


export default TodoApp;
