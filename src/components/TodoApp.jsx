import { useState, useEffect } from "react";

function TodoApp() {
  const [taskText, setTaskText] = useState("");

  const [tasks, setTasks] = useState(() => {
      // This function runs only once, when the component first loads
    const saved = localStorage.getItem("aws-todo-tasks");

    if (!saved) return [];             // nothing saved yet; start with empty list

    try {
      return JSON.parse(saved);        // turn saved JSON text back into an array
    } catch (err) {
      console.error("Bad data in localStorage:", err);
      return [];
    }

  });


  useEffect(() => {
    // whenever "tasks" changes, save it to localStorage
    localStorage.setItem("aws-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);



  // ADDING A TASK

  function handleAddTask(e) {
    e.preventDefault(); // stop the form from refreshing the page

    const trimmed = taskText.trim();
    if (!trimmed) return; // if input is empty, do nothing

    const newTask = {
      id: Date.now(),   // unique id based on current time
      text: trimmed,    // what the user typed
      done: false       // task starts as "not done"
    };

    // put the new task at the start of the list
    setTasks([newTask, ...tasks]);

    // clear the input box
    setTaskText("");
  }


  // TOGGLE A TASK (done / not done)

  function toggleTask(id) {
    // go through each task and if the id matches, change to "done"
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done }
        : task
    ));
  }


  // DELETE A TASK
 
  function deleteTask(id) {
    // keep every task EXCEPT the one with this id
    setTasks(tasks.filter(task => task.id !== id));
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

        {tasks.length === 0 ? (
          <p className="text-xs text-slate-500">
            No tasks yet. Add your first one above.
          </p>
        ) : (
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
