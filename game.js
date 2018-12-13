/**
 * 根据东方财富网获取所有A股股票的代码
 * @type {[type]}
 */
var http = require("http"),
    url = require("url"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require('eventproxy');
var path = require('path');
var fs = require("fs");
var writerStream2 = fs.createWriteStream(path.resolve(__dirname,'./news.txt'),{ flags: 'w',encoding: null,mode: 0666 });

var text = [];
// 主start程序
function start(){
    superagent.get('http://www.sina.com.cn/')
        .set('userAgent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36')
        .end(function(err,pres){
        // pres.text 里面存储着请求返回的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是利用$ 使用 jquery 的语法了
        var $ = cheerio.load(pres.text);
        var curPageUrls = $('#xy-impcon ul.list-a li a');
        console.log(curPageUrls.length)
        curPageUrls.each(function(index, elem){
            text.push({
                title: $(elem).text(),
                url: $(elem).attr('href')
            })
        })
        writerStream2.write(JSON.stringify(text),'UTF8');
  });
}
start();
