import mongoose from 'mongoose';

var Todo = new mongoose.Schema({
  name    : {type: String, required: true},
  todoId  : {type: Number, required: true},
});

export default Todo;
