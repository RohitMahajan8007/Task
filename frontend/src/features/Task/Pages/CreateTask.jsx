import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../Pages/TaskForm.jsx";
import { useTask } from "../Hooks/UseTask.jsx";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    CreateTask,
    GetTaskById,
    UpdateTask,
    loading,
  } = useTask();

  const [task, setTask] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const data = await GetTaskById(id);
      setTask(data.task);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await UpdateTask(id, formData);
      } else {
        await CreateTask(formData);
      }

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  if (isEdit && !task) {
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
          {isEdit ? "Edit Task" : "Create Task"}
        </h1>

        <TaskForm
          initialData={isEdit ? task : null}
          buttonText={isEdit ? "Update Task" : "Create Task"}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default TaskPage;