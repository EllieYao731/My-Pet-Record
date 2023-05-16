var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var sassMiddleware = require('node-sass-middleware');

var app = express();
var compileSass = require('express-compile-sass');

// 將 routes 中設定的路徑引進來
var indexRouter = require('./routes/index');
// var enRouter = require('./routes/en');

var app = express();

// app.set() 設定 views 的檔案位置＆使用的 view engine
// view engine setup
app.set('views', path.join(__dirname, 'views')); // __dirname：當前檔案所在資料夾名稱
app.set('view engine', 'pug');

// sass&scss 編譯區域
app.use(
  sassMiddleware({
    src: path.join(__dirname,'public'), 
    dest: path.join(__dirname,'public'),
    debug: true,
  })
); 

// app.use() 將 middleware 依順序安排在 request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // path.join(A, B)：AB路徑連接在一起形成新路徑
// express.static 讓 Express 可以作用在 /public 中所有的靜態頁面

// If there is no lang Cookie
app.use("*", function (req, res, next) {
  // res.clearCookie('lang','zh-tw')
  if (!req.cookies.lang) { // 問題：在第一次載入設定cookie之後還要再讓他重跑一次，不然第一次還是會沒有
    console.log('there is no cookie')
    req.cookies.lang = 'zh-tw'; // 一個很爛的做法，讓他跑的時候直接賦予 req 的 cookie
    res.cookie('lang','zh-tw') // 然後再讓網頁有真正的 cookie
    console.log(req.cookies.lang)
  }
  next()
})

// Router
app.use('/', indexRouter);
// app.use('/en', enRouter);\

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404.pug');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.pug');
});

// 將 app 輸出
module.exports = app;
