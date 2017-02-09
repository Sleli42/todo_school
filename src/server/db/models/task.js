import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  description: String,
  listId: mongoose.Schema.Types.ObjectId,
  // listId -> to ObjectId
});

taskSchema.set('toJSON', {
  virtuals: true,
});

export const Task = mongoose.model('Task', taskSchema);

const find = () => Task.find().exec();

const add = ({ description = '', listId = 0 }) => {
  const newTask = new Task({ description, listId });
  return newTask.save();
};

const del = (id) => {
  return Task.findByIdAndRemove(id).exec()
    .then(task => ({ id: task._id }));
};

export default { find, add, del };
