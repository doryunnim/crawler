const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const python = require('./python');
const schedule = require('node-schedule');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const brandRouter = require('./routes/brand');
const calendarRouter = require('./routes/calendar');
const {
  sequelize
} = require('./models');

const app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand', brandRouter);
app.use('/calendar', calendarRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// var brand_list = ["subway", "starbucks", "burgerking", "gs25", "vips", "papajohns", "twosome"];
// var i = 0
// var job = schedule.scheduleJob('30 * * * * *', ()=>{
//   for(i; i<brand_list.length; i++){
//     console.log(i)
//     python(brand_list[i]);
//     i++;
//     break;
//     }
//     if(i >= brand_list.length) i = 0;
//   }
// )


module.exports = app;