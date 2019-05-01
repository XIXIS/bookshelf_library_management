import logger from 'morgan';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import expressValidator from 'express-validator';

export default (app, config) => {

  app.set('showStackError', true);
  // app.use(favicon(path.join(config.root , 'public', 'favicon.ico')));


  // don't use logger for test env
  // if (process.env.APP_ENV !== 'testing') {
  app.use(logger('dev'));
  // }

  // set views path
  app.use(express.static('public'));
  app.use(compression());

  // bodyParser should be above methodOverride
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(expressValidator());

  app.use(helmet());


  // routes should be at the last

  // assume "not found" in the error msgs
  // is a 404. this is somewhat silly, but
  // valid, you can do whatever you like, set
  // properties, use instanceof etc.
  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message.indexOf('not found')) return next();

    // log it
    console.error(err.stack);

    // error page
    res.status(500).render('500', {error: err.stack})
  });

};