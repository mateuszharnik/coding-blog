import 'babel-polyfill';
import app from '@server/app';
import config from '@server/config';

const { SERVER_PORT, SERVER_URL } = config;

// eslint-disable-next-line
app.listen(SERVER_PORT, () => console.log(`App listening on ${SERVER_URL}`));
