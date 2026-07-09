import taskModel from "../models/task.model.js";



export const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;


        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required.",
            });
        }

        const task = await taskModel.create({
            title,
            description,
            status,
            user: req.user._id,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create task.",
        });
    }
};

export const getAllTasks = async (req, res) => {
    try {

        const { status } = req.query;

        const filter = {
            user: req.user._id,
        };

        if (status) {
            filter.status = status;
        }

        const tasks = await taskModel.find(filter);

        return res.status(200).json({
            success: true,
            tasks,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await taskModel.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        return res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch task.",
        });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await taskModel.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id,
            },
            {
                title,
                description,
                status,
            },
            { returnDocument: "after" }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update task.",
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await taskModel.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully.",
            task
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to delete task.",
        });
    }
};