import { useDispatch, useSelector } from "react-redux";

import { setTasks, setTask, addTask, updateTask, deleteTask, setLoading, setError, } from "../Task.slice.js";

import { getTasks, getTaskById, createTask, updateTask as updateTaskAPI, deleteTask as deleteTaskAPI, } from "../Services/Task.api.js";

export function useTask() {
    const dispatch = useDispatch();

    const { tasks, task, loading, error } = useSelector(
        (state) => state.task
    );


    const CreateTask = async ({ title, description, status }) => {
        try {
            dispatch(setLoading(true));

            const data = await createTask({
                title,
                description,
                status,
            });

            dispatch(addTask(data.task));
            dispatch(setLoading(false));

            return data;
        } catch (err) {
            dispatch(setError(err.response?.data?.message));
            dispatch(setLoading(false));

            throw err;
        }
    };

    const GetTasks = async (status = "") => {
        try {
            dispatch(setLoading(true));

            const data = await getTasks(status);

            dispatch(setTasks(data.tasks));
            dispatch(setLoading(false));

            return data;
        } catch (err) {
            dispatch(setError(err.response?.data?.message));
            dispatch(setLoading(false));

            throw err;
        }
    };

    const GetTaskById = async (id) => {
        try {
            dispatch(setLoading(true));

            const data = await getTaskById(id);

            dispatch(setTask(data.task));
            dispatch(setLoading(false));

            return data;
        } catch (err) {
            dispatch(setError(err.response?.data?.message));
            dispatch(setLoading(false));
            throw err;
        }
    };

    const UpdateTask = async (id, { title, description, status }) => {
        try {
            dispatch(setLoading(true));

            const data = await updateTaskAPI(id, {
                title,
                description,
                status,
            });

            dispatch(updateTask(data.task));
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err.response?.data?.message));
            dispatch(setLoading(false));
        }
    };

    const DeleteTask = async (id) => {
        try {
            dispatch(setLoading(true));

            await deleteTaskAPI(id);

            dispatch(deleteTask(id));
            dispatch(setLoading(false));
        } catch (err) {
            dispatch(setError(err.response?.data?.message));
            dispatch(setLoading(false));
        }
    };

    return {
        tasks,
        task,
        loading,
        error,

        GetTasks,
        GetTaskById,
        CreateTask,
        UpdateTask,
        DeleteTask,
    };
}