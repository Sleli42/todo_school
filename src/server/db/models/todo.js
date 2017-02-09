import mongoose from 'mongoose';
import R from 'ramda';
import { Task } from './task';

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

const del = (id) => {
  const removeTodo = Todo.findByIdAndRemove(id).exec();
  const removeTasks = Task.remove({ listId: id }).exec();

  return Promise.all([removeTodo, removeTasks]).then(() => { id } );
};

const filter = (label) => {
  const labels = R.split(' ', label);
  // regExp label
  const promiseTodo = Todo.find().where('label').equals(labels).then((todos) => {
    const ids = todos.map(elem => elem._id);
    return ids;
    // console.log('[todos] ids: ', ids);
  });
  const promiseTask = Task.find().where('description').equals(labels).then((tasks) => {
    const ids = tasks.map(elem => elem.listIds);
    return ids;
    // console.log('[tasks] ids: ', ids);
  });
  return Promise.all([promiseTodo, promiseTask])
    .then(res => R.union(res[0], res[1]));
    // .then(res => console.log(res));
    // .then(todosIds => {
    //
    // });
    // .then(res => Todo.find({ $or: res }));
};
/*
  // filter -> match()
  //        -> where()


  1: filter onTodo -> return todoIdS
  2: filter onTask(todoIdS) ->
  3: recup les 2 lists
  4: faire union() des 2.
*/
export default { find, add, del, filter };
