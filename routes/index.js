var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var appRoot = require('app-root-path');
// var cookieParser = require('cookie-parser');
var routes = require('./routes.js')

function readJson(lang){
  var data = fs.readFileSync(path.join(appRoot.path, 'public','json', lang, 'data.json'), function (err, data) {
    if (err) throw err;
    return data.toString();
  }); // 如果不是同步讀取會取不到，因為會先收到網頁的req，而readJson處理得太慢
  return data;
}

for (const [route, file] of Object.entries(routes)) {
  if (!fs.existsSync(path.join(appRoot.path, 'views', file))){
    // 若檔案不存在則建立一個空的
    fs.writeFile(path.join(appRoot.path, 'views', file), 'extend layout\n\nblock content\n\tmain', (err) => {
      if(!err){
        console.log('Add File : '+file)
      }
      else throw new Error(err);
    });
  };
  router.get(route, function(req, res, next) {
    // 收到Client端位址為"/"的請求時，以變數 title 等於 'Express'，帶入index.pug 以進行 render
    var data = JSON.parse(readJson(req.cookies.lang)); // 再讀一次避免語言出錯
    // if (data){
    //   res.status(err.status || 500)
    //   res.render('error.pug',{error:{stack:'語言載入錯誤'}})
    // }
    res.render(file, { data: data});
  });
}

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
