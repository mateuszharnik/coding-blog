import 'babel-polyfill';
import db from '@server/db';
import app from '@server/app';
import config from '@server/config';

const { SERVER_PORT, SERVER_URL } = config;

db.on('open', () => {
  // eslint-disable-next-line no-console
  app.listen(SERVER_PORT, () => console.log(`App listening on ${SERVER_URL}`));
});
