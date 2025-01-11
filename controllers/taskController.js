// 7. Blog Controller (controllers/blogController.js)
const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const task = await Task.find().populate('user', 'username');
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
