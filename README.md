# My-Pet-Record

## Set Up
```
npm install
```
## Run Dev
```
npm run sev
```
open http://localhost:3001/ and start to develop
## Structure

* /My-Pet-Record
    * app.js
    * /bin
        * www
    * package.json
    * /public
        * /css
        * /img
        * /js
        * /json
        	* /lang ... 存放語言包相關，目前是每個語言一個json，如果資料太多打算照頁面分json裝進資料夾
        	* data.json ... 如果之後資料太多可能會把各個頁面需要的抽出來留每頁都會需要的
    * /routes
        * index.js
        * route.js ... 原本想包成 modules 讓 index.js 去 import 設定路徑，但後來因為每增加一個頁面需要同時改 json 檔和 route.js 太麻煩，故統一成使用 json 檔，未來可能有機會使用在其他功能所以先保留
    * /views
        * error.pug ... 未來會去設計能給使用者看到的錯誤頁面
        * layout.pug ... 存放固定 header&footer
        * 其餘一般頁面