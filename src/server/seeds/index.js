import 'babel-polyfill';
import db from '@server/db';
import seedAuthors from './authors';

const seed = async () => {
  try {
    await seedAuthors();

    db.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(0);
  }
};

seed();
