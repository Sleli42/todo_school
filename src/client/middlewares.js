export const socketIoMiddleWare = socket => ({ dispatch }) => {
  socket.on('action', action => dispatch(action));
  return next => action => next(action);
};
