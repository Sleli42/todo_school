import R from 'ramda';
import eventEmitter from 'events';
import { todoAdded, todoDeleted } from '../../client/actions/todos';

class Todo extends eventEmitter {
  id = 0;
  todos = [];

  load() {
    return this.todos;
  }
  add(todo) {
    const { label } = todo;
    const newTodo = { label, id: this.id += 1 }
    this.todos.push(newTodo);
    this.emit('action', todoAdded(newTodo));
    return newTodo;
  }
  del(id) {
    const index = R.findIndex(R.propEq('id', id), this.todos);
    if (index === -1) {
      throw new Error(`Unknown id: ${id}`);
    }
    this.todos = R.remove(index, 1, this.todos);
    this.emit('action', todoDeleted(id));
    return {id};
  }
}

export default Todo;
