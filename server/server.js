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
import deviceSeed from './seed/Device.seed';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    /* eslint-disable no-console */
    console.log('Unable to connect to Mongo.');
    /* eslint-enable no-console */
  }

  // feed some dummy data in DB
  if (serverConfig.seedDatabase) {
    deviceSeed();
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
const deviceRoutes = require('./routes/Device.routes');

/**
 * API routes
 */
app.use('/api/devices', deviceRoutes.default);

/* eslint-disable*/
app.listen(serverConfig.port, () => {
  console.log('App is running at http://localhost:%d in %s mode', serverConfig.port, app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
/* eslint-enable*/
export default app;
