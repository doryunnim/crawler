var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/brand');
var authRouter = require('./routes/auth');
const {sequelize}=require('./models');

// 파이썬모듈 추가
var {PythonShell}=require('python-shell');

// 옵션객체 설정
var options = {
  mode: 'text',
  pythonPath: '',
  pythonOptions: ['-u'],
  scriptPath: '',
  args: ['value1', 'value2', 'value3']
};
  
var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand',brandRouter);
app.use('/auth', authRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// PythonShell.run('./crawler/lotteriaFinish.py',options,function(err,results){
//   if(err) throw err;

//   console.log('results: %j',results);
// });

//test.py파일을 호출하여 옵션에 설정 된 것들에따라 실행을 하게함
//노드가 커맨드 라인을 이용해서 소스파일을 실생시킨다고 생각하는게 좋음

module.exports = app;
