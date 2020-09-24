import config from '@server/config';
import mongoose from 'mongoose';

const { DB_URL } = config;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
  process.exit(1);
});

export default db;
