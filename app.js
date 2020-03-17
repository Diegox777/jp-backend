
const express = require('express');
  
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

const cors = require('cors');

// const usersRouter = require('./routes/users');
const problemsRouter = require('./routes/problems');

// const { verifyJWT } = require('./middlewares');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(verifyJWT);

dotenv.config({
  path: path.join(__dirname, './env')
});

// app.use('/api/users', usersRouter);
app.use('/api/problems', problemsRouter);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
