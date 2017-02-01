import R from 'ramda';
import eventEmitter from 'events';
import { taskAdded, taskDeleted } from '../../client/actions/tasks';

class Task extends eventEmitter {
  id = 0;
  tasks = [];

  load() {
    return this.tasks;
  }
  add(task) {
    // '{"task": {"description":"todo42", "isCompleted": false, "listId": 1}}
    const { description, isCompleted, listId } = task;
    const newTask = { id: this.id += 1, description, isCompleted, listId };
    this.tasks.push(newTask);
    this.emit('action', taskAdded(newTask));
    return newTask;
  }
  del(id) {
    const index = R.findIndex(R.propEq('id', id), this.tasks);
    if (index === -1) {
      throw new Error(`Unknown id: ${id}`);
    }
    this.tasks = R.remove(index, 1, this.tasks);
    this.emit('action', taskDeleted(id));
    return {id};
  }
}

export default Task;
