var express = require('express');
var router = express.Router();

/* Get English Home Page (root.url+en/) */
router.get('/', function(req, res, next) {
  // 設置 COOKIE
  res.cookie('lang','en-us')
  // 收到Client端位址為"/"的請求時，以變數 title 等於 'Express'，帶入index.pug 以進行 render
  res.render('index.pug', {lang: req.cookies.lang});
});

module.exports = router;
