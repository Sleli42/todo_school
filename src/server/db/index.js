import mongoose from 'mongoose';

const initDb = ({ mongodbURI }) => {
  mongoose.connect(mongodbURI);
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  return Promise.resolve(db);
};

export default initDb;
