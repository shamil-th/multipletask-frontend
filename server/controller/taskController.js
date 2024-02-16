const mongoose = require("mongoose");
const TaskList = require("../model/model");

// create a task
exports.create = async (req, res) => {
  try {
    const { list, pin, taskTitle } = req.body;

    const newTaskList = new TaskList({
      list,
      pin,
      taskTitle,
    });

    await newTaskList.save();

    res.status(201).json(newTaskList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// update task completed status
exports.updateStatus = async (req, res) => {
  const list = req.body;
  const id = req.params.id;
  console.log(id,list)

  try {
    const task = await TaskList.findById(id);

    if (!task) {
      return res.status(400).send({ message: `Task with ID ${id} not found` });
    }

    // Update the list array of the task document
    const updatedTask = await TaskList.findByIdAndUpdate(
      id,
      { $set: { list: list } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// retrive all task
exports.find = async (req, res) => {
  TaskList.find()
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured while retriving data",
      });
    });
};

// retrive single task
exports.findTask = async (req, res) => {
  const id = req.params.id;
  TaskList.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `cannot find task with id` + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" + err });
    });
};
