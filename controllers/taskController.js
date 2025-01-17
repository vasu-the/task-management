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

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.deleteOne({ _id: id, userId: req.userId });
  res.json({ success: true });
};

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { status },
    { new: true }
  );
  res.json(task);
};

exports.exportTasksToPDF = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  const doc = new pdfkit();
  const filePath = `tasks_${req.userId}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.text('Task List', { align: 'center' });
  tasks.forEach((task) => {
    doc.text(`Title: ${task.title}\nDescription: ${task.description}\nStatus: ${task.status}\n`);
  });
  doc.end();

  doc.on('finish', () => res.json({ success: true, path: filePath }));
};

exports.sendTasksPDF = async (req, res) => {
  const { email } = req.body;
  const filePath = `tasks_${req.userId}.pdf`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your Task List',
    text: 'Please find attached your task list.',
    attachments: [
      {
        path: filePath,
      },
    ],
  });

  res.json({ success: true });
};

