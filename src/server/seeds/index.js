import 'babel-polyfill';
import db from '@server/db';
import seedAuthors from './authors';
import seedAbout from './about';
import seedMessages from './messages';

const seed = async () => {
  try {
    await seedAuthors();
    await seedAbout();
    await seedMessages();

    db.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    process.exit(0);
  }
};

seed();
