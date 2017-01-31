import mongoose from 'mongoose';

var Task = new mongoose.Schema({
  name    : {type: String, required: true},
  todoId  : {type: Number, required: true},
});

export default Task;
