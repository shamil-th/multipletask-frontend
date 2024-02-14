const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  list: [
    {
      title: { type: String },
      type: { type: String },
      task: { type: mongoose.Schema.Types.Mixed },
      completed: { type: Boolean },
    },
  ],
  taskTitle:{
    type:String
  },
  pin: { type: Number },
}, { timestamps: true });

const taskList = new mongoose.model('task', taskListSchema);
module.exports = taskList