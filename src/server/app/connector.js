import R from 'ramda';
import cookie from 'cookie';

class Connector {
  constructor(emitters, socket) {
    this.users = {};
    this.emitters = emitters;
    this.io = socket;
    this.initSocketIO();
    this.initEmitters();
  }
  addUser(socket, id) {
    const user = { socket, id };
    console.log(`user added : ${id}`);
    this.users[user.id] = user;
    return user;
  }
  removeUser({ id }) {
    console.log(`user remove: ${id}`);
    delete this.users[id];
    return this;
  }
  broadcast(action) {
    R.map(user => user.socket.emit('action', action))(this.users);
  }
  // emitters === models
  initEmitters() {
    const registerModel = model => model.on('action', this.broadcast.bind(this));
    // const registerModel = model => model.on('action', action => this.broadcast.bind(this));
    R.compose(R.map(registerModel), R.values)(this.emitters);
  }
  initSocketIO() {
    this.io.use((socket, next) => {
      if (socket.request.headers.cookie) {
        const { todoAppId } = cookie.parse(socket.request.headers.cookie);
        const user = this.addUser(socket, todoAppId);
        socket.request.user = user;
      }
      next();
    });
    this.io.on('connection', (socket) => {
      socket.emit('action', { type: 'joined' });
      socket.on('disconnect', () => this.removeUser(socket.request.user));
    });
  }
}

export default Connector;
