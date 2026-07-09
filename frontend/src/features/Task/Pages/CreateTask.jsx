import { useNavigate } from "react-router-dom";
import TaskForm from "../Pages/TaskForm.jsx";
import { useTask } from "../Hooks/UseTask.jsx";

const CreateTask = () => {
  const navigate = useNavigate();

  const { CreateTask, loading } = useTask();

  const handleCreate = async (formData) => {
    try {
      await CreateTask(formData);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Create Task
        </h1>

        <TaskForm
          buttonText="Create Task"
          loading={loading}
          onSubmit={handleCreate}
        />

      </div>

    </div>
  );
};

export default CreateTask;