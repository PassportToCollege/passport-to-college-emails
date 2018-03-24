import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import path from 'path';

import index from './routes/index';
import confirmEmail from './routes/confirm-email';
import resetPassword from './routes/reset-password';
import welcome from './routes/welcome-and-confirm';
import applicationSubmitted from './routes/application-submitted-applicant';
import applicationReceived from './routes/application-submitted-admins';
import signup from './routes/signup';

const app = express();
const debug = Debug('passport-to-college-emails:app');

app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', index);
app.use('/v/confirm-email', confirmEmail.get());
app.use('/s/confirm-email', confirmEmail.send());
app.use('/v/reset-password', resetPassword.get());
app.use('/s/reset-password', resetPassword.send());
app.use('/v/welcome', welcome.get());
app.use('/s/welcome', welcome.send());
app.use('/v/application-submitted', applicationSubmitted.get());
app.use('/s/application-submitted', applicationSubmitted.send());
app.use('/v/application-received', applicationReceived.get());
app.use('/s/application-received', applicationReceived.send());
app.use('/v/signup', signup.get());
app.use('/s/signup', signup.send());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
