/**
 * Module dependencies.
 */
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';

// Configuration
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

/**
 * MongoDb Connection
 */

// if we are to seed database, load seed data. if not, dont load to avoid depedending on the file
const userSeed = serverConfig.seedDatabase ? require('./seed/User.seed') : null;

mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    /* eslint-disable no-console */
    console.log('Unable to connect to Mongo.');
    /* eslint-enable no-console */
  }

  // feed some dummy data in DB
  if (serverConfig.seedDatabase) {
    userSeed();
  }
});

/**
 * Create Express server.
 */
const port = 3000;
const app = express();
app.set('port', port);
app.use(compression());
app.use(bodyParser.json());
// default route for single page app
app.use('/', express.static(path.join(__dirname, '/public')));

/**
 * Route handlers
 */
const userRoutes = require('./routes/User.routes');

/**
 * API routes
 */
app.use('/api/account', userRoutes.default);


app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%s in %s mode', app.get('port'), app.get('env'));
  console.log('\tPress CTRL-C to stop\n');
});

export default app;
