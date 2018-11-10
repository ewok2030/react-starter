/**
 * Module dependencies.
 */
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
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
const app = express();
app.set('port', serverConfig.port);
app.use(compression());
app.use(bodyParser.json());
// default route for single page app
app.use('/', express.static(path.join(__dirname, '/public')));

/**
 * Start Express server.
 */
// Enable webpack middleware if in debug mode
/* eslint-disable no-console*/
const webpackConfig = process.env.NODE_ENV === 'development' ? require('../webpack.config.dev') : null;

if (webpackConfig) {
  console.log('server is running in development mode');
  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
  devServer.listen(webpackConfig.devServer.port, () => {
    console.log(`webpack-dev-server is listening on port ${webpackConfig.devServer.port}`);
  });
}

/**
 * Route handlers
 */
const userRoutes = require('./routes/User.routes');

/**
 * API routes
 */
app.use('/api/user', userRoutes.default);

/* eslint-disable*/
app.listen(8080, () => {
  console.log('App is running at http://localhost:8080 in %s mode', app.get('env'));
  console.log('\tPress CTRL-C to stop\n');
});
/* eslint-enable*/
export default app;
