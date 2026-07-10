import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../Hooks/UseTask.jsx";
import { useAuth } from "../../Auth/Hooks/UseAuth.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  const { GetTasks, DeleteTask } = useTask();
  const { handleLogout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      const data = await GetTasks(filter);
      console.log("Api Response", data)
      setTasks(data.tasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const previousTasks = [...tasks];
    
    // Optimistic update: Remove task from UI immediately
    setTasks((prev) =>
      prev.filter((task) => task._id !== id)
    );

    try {
      await DeleteTask(id);
    } catch (err) {
      console.log(err);
      // Rollback on error
      setTasks(previousTasks);
    }
  };

  const Logout = async () => {
    try {
      await handleLogout();
      console.log("Logout completed");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Task Dashboard
          </h1>

          <div className="flex gap-3">

            <button
              onClick={() => navigate("/task/create")}
              className="bg-black text-white px-5 py-2 rounded-lg"
            >
              Create Task
            </button>

            <button
              onClick={Logout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              All Tasks
            </h2>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg p-2"
            >
              <option value="">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">
                In Progress
              </option>
              <option value="Completed">
                Completed
              </option>
            </select>

          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-10">

              <h2 className="text-xl text-gray-500">
                No Tasks Found
              </h2>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border rounded-xl bg-gray-50 p-5 shadow-sm"
                >

                  <h2 className="text-xl font-bold">
                    {task.title}
                  </h2>

                  <p className="text-gray-600 mt-3">
                    {task.description}
                  </p>

                  <div className="mt-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm
                      ${task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                    >
                      {task.status}
                    </span>

                  </div>

                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() =>
                        navigate(`/task/edit/${task._id}`)
                      }
                      className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(task._id)
                      }
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Dashboard;