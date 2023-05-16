var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var appRoot = require('app-root-path');
// var cookieParser = require('cookie-parser');
// var routes = require('./routes.js')

function readLangJson(lang){
  var lang_text = fs.readFileSync(path.join(appRoot.path, 'public','json', 'lang', lang+'.json'), function (err, data) {
    if (err) throw err;
    return data.toString();
  }); // 如果不是同步讀取會取不到，因為會先收到網頁的req，而readLangJson處理得太慢
  return lang_text;
}

var data = JSON.parse(fs.readFileSync(path.join(appRoot.path, 'public', 'json', 'data.json'), function (err, data) {
  if (err) throw err;
  return data;
}));

for (const val of data.navigation) {
  router.get(val.page, function(req, res, next) {
    // 收到Client端位址為"/"的請求時，以變數 title 等於 'Express'，帶入index.pug 以進行 render
    var lang_json = JSON.parse(readLangJson(req.cookies.lang));
    // if (lang_json){
    //   res.status(err.status || 500)
    //   res.render('error.pug',{error:{stack:'語言載入錯誤'}})
    // }
    res.render(val.file, {lang: lang_json, data: data});
  });
}

// for (const [route, file] of Object.entries(routes)) {
//   console.log(route, file)
//   router.get(route, function(req, res, next) {
//     // 收到Client端位址為"/"的請求時，以變數 title 等於 'Express'，帶入index.pug 以進行 render
//     var lang_json = JSON.parse(readLangJson(req.cookies.lang));
//     // if (lang_json){
//     //   res.status(err.status || 500)
//     //   res.render('error.pug',{error:{stack:'語言載入錯誤'}})
//     // }
//     res.render(file, {lang: lang_json, data: data, constants:constants});
//   });
// }

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   // 收到Client端位址為"/"的請求時，以變數 title 等於 'Express'，帶入index.pug 以進行 render
//   var lang_json = JSON.parse(readLangJson(req.cookies.lang));
//   var data = JSON.parse(getData());
//   // if (lang_json){
//   //   res.status(err.status || 500)
//   //   res.render('error.pug',{error:{stack:'語言載入錯誤'}})
//   // }
//   res.render('index.pug', {lang: lang_json, data: data});
// });

// router.get('/about', function(req, res, next) {
//   var lang_json = JSON.parse(readLangJson(req.cookies.lang));
//   var data = JSON.parse(getData());
//   res.render('about.pug', {lang: lang_json, data: getData()});
// });

// 多語言更改 cookie 跳轉

router.get('/tw/', function(req, res, next) {
  res.cookie('lang','zh-tw')
  res.redirect(req.header('Referer') || '/');
});

router.get('/en/', function(req, res, next) {
  res.cookie('lang','en-us')
  
  res.redirect(req.header('Referer') || '/');
});

router.get('/ja/', function(req, res, next) {
  res.cookie('lang','ja-jp')
  res.redirect(req.header('Referer') || '/');
});

module.exports = router;
