import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../Pages/TaskForm.jsx";
import { useTask } from "../Hooks/UseTask.jsx";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    GetTaskById,
    UpdateTask,
    loading,
  } = useTask();

  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const data = await GetTaskById(id);

      setTask(data.task);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await UpdateTask(id, formData);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Edit Task
        </h1>

        <TaskForm
          initialData={task}
          loading={loading}
          buttonText="Update Task"
          onSubmit={handleUpdate}
        />

      </div>

    </div>
  );
};

export default EditTask;