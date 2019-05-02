/**
 * Module dependencies.
 */
import cors from 'cors';
import http from 'http';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import routes from './config/routes';
import config from './config/config';
import auth from './config/middlewares/auth';
import expressValidator from 'express-validator';
import logger from "morgan";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";



//DB Connection
mongoose.Promise = Promise;
mongoose.connect(config.db, {useNewUrlParser: true}).then(
  () => {
    console.log('connection successful');
  },
  (err) => {
    console.log(err);
  }
);


//Initialize express
let app = express();

app.set('showStackError', true);
// app.use(favicon(path.join(config.root , 'public', 'favicon.ico')));


// don't use logger for test env
// if (process.env.APP_ENV !== 'testing') {
app.disable('view cache');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// }

// set views path
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

// bodyParser should be above methodOverride
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(helmet());
app.use(cors());
app.use(auth.validate);

app.use('/', routes());


// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');


const debug = require('debug')('bookshelf_library_management:server');

//Get port from environment and store in Express.
const port = normalizePort(config.port);
app.set('port', port);


// Create HTTP server.
let server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Normalize a port into a number, string, or false.

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('server running on port: ' + addr.port);
}

