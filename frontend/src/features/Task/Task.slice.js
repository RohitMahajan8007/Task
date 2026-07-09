import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
    name: "task",

    initialState: {
        tasks: [],
        task: null,
        loading: true,
        error: null,
    },

    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },

        setTask: (state, action) => {
            state.task = action.payload;
        },

        addTask: (state, action) => {
            state.tasks.unshift(action.payload);
        },

        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task._id === action.payload._id ? action.payload : task
            );

            if (state.task?._id === action.payload._id) {
                state.task = action.payload;
            }
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task._id !== action.payload
            );

            if (state.task?._id === action.payload) {
                state.task = null;
            }
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setTasks,
    setTask,
    addTask,
    updateTask,
    deleteTask,
    setLoading,
    setError,
} = TaskSlice.actions;

export default TaskSlice.reducer;