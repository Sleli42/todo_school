import mongoose from 'mongoose';
import Todo from './todo';

const taskSchema = new mongoose.Schema({
  description: String,
  listId: String,
});

taskSchema.set('toJSON', {
  virtuals: true,
});

const Task = mongoose.model('Task', taskSchema);

const find = () => Task.find().exec();

const findId = id => Task.findById(id).exec();

const add = ({ description = '', listId = 0 }) => {
  const newTask = new Task({ description, listId });
  return newTask.save();
};

const del = id => {
  Task.findByIdAndRemove(id).exec()
    .then(task => ({ id: task._id }));
};

const delByTodoId = (id) => {
  find().then(tasks => tasks.map((task) => {
    if (task.listId === id) {
      del(task.id);
    }
  }));
};

export default { find, add, del, delByTodoId };
