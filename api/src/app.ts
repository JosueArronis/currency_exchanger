/**
 * Required External Modules
//  */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */

 app.use(helmet());
 app.use(cors());
 app.use(express.json());

routes(app);
 export default app;