import axios from "axios";

const taskApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || ""}/api/tasks`,
    withCredentials: true,
});


export async function createTask({ title, description, status }) {
    const response = await taskApi.post("/", {
        title,
        description,
        status,
    });

    return response.data;
}
export async function getTasks(status = "") {
    const response = await taskApi.get("/", {
        params: status ? { status } : {},
    });

    return response.data;
}

export async function getTaskById(id) {
  const response = await taskApi.get(`/${id}`);
  return response.data;
}

export async function updateTask(id, { title, description, status }) {
    const response = await taskApi.put(`/${id}`, {
        title,
        description,
        status,
    });

    return response.data;
}

export async function deleteTask(id) {
    const response = await taskApi.delete(`/${id}`);

    return response.data;
}