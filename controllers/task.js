import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tasks." });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching task." });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const newTask = await Task.create({
      title,
      description,
      status,
      user: req.userId,
    });
    await newTask.save();

    res.status(201).json({ success: true, newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating task." });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, status },
      { new: true },
    );
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating task." });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task." });
  }
};
