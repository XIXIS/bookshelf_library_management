import dotenv from 'dotenv';
import path from 'path';

const rootPath = path.normalize(__dirname + '/..');
dotenv.config();

// const mainDB = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
const mainDB = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;
const testDB = 'mongodb://localhost:27017/' + process.env.DB_NAME + '_test';
console.log(process.env.NODE_ENV == null ? mainDB : testDB);

export default {

  jwtSecret: process.env.JWT_SECRET,
  jwtSession: {session: false},
  db: (process.env.NODE_ENV == null) ? mainDB : testDB,
  root: rootPath,
  port: process.env.SERVER_PORT,
}