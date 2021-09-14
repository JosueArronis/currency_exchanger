import config from 'config';
import app from './app';

let port = config.get('port');

if (config.util.getEnv('NODE_ENV') === 'production') {
  port = process.env.PORT;
}

if (!port) {
  process.exit(1);
}
const PORT: number = parseInt(port as string, 10);

// const db_connectio = new DB_Connection();
// db_connectio.connect_db();
/**
 * Server Activation
 */
const server = app.listen(PORT, async () => {
  try {
    console.log(`Listening on port ${PORT}`);
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
});
