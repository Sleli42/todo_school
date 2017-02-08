import R from 'ramda';
import cookie from 'cookie';

class Connector {
  constructor(socket, emitters) {
    this.users = {};
    this.emitters = emitters;
    this.io = socket;
    this.initEmitters();
    this.initUsers();
  }

  getSessions() {
    return R.compose(R.pluck('id'), R.values)(this.users);
  }

  addUser(socket, id) {
    const user = { id, socket };
    console.log(`add user ${id}`);
    return (this.users[id] = user);
  }

  removeUser(id) {
    console.log(`remove user ${id}`);
    delete this.users[id];
    return this;
  }

  broadcast(action) {
    console.log('broadcast', action);
    R.map(user => user.socket.broadcast.emit('action', action))(this.users);
  }

  initEmitters() {
    // const registerModel = model => model.on('action', this.broadcast.bind(this));
    const registerModel = model => model.on('action', action => this.broadcast(action));
    R.compose(R.map(registerModel), R.values)(this.emitters);
  }

  initUsers() {
    this.io.use((socket, next) => {
      if (socket.request.headers.cookie) {
        const userCookies = cookie.parse(socket.request.headers.cookie);
        const { todoAppId } = userCookies;
        const user = this.addUser(socket, todoAppId);
        socket.request.user = user;
      }
      next();
    });
    this.io.on('connect', (socket) => {
      socket.emit('action', { type: 'joined' });
      socket.on('disconnect', () => this.removeUser(socket.request.user.id));
    });
  }
}

export default Connector;
