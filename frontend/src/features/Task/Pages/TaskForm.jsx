import { useState } from "react";

const TaskForm = ({
  initialData,
  onSubmit,
  loading = false,
  buttonText,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      status: "To Do",
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.title && (
          <p className="text-red-500 mt-1">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <textarea
          rows={5}
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {errors.description && (
          <p className="text-red-500 mt-1">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      <button
        disabled={loading}
        className="w-full bg-black text-white rounded-lg py-3"
      >
        {loading ? "Please Wait..." : buttonText}
      </button>
    </form>
  );
};

export default TaskForm;