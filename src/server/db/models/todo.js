import mongoose from 'mongoose';
import Task from './task';

const todoSchema = new mongoose.Schema({
  label: String,
});

todoSchema.set('toJSON', {
  virtuals: true,
});

const Todo = mongoose.model('Todo', todoSchema);

const find = () => Todo.find().exec();

const add = ({ label }) => {
  const newTodo = new Todo({ label });
  return newTodo.save();
};

const del = id =>
  Todo.findByIdAndRemove(id).exec()
    .then(todo => ({ id: todo._id }));

export default { find, add, del };
