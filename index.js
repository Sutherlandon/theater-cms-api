/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

const config = require('./config/config.js');
const app = require('./config/express.js');

// fires up the server to listen on port 3001
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.api_port, function () {
    console.log(`Theater-CMS running (port: ${config.api_port})`);
  });
}
