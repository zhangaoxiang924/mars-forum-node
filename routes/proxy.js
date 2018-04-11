/**
 * Author：zhoushuanglong
 * Time：2018-04-08 21:33
 * Description：proxy
 */

var express = require('express')
var router = express.Router()
var proxy = require('http-proxy-middleware')

var options = {
    target: 'http://wecenter.huoxing24.vip/',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '/api': '/',
        '/api/?/home/ajax/index_actions': '/?/home/ajax/index_actions', // 关注
        '/api/?/publish/ajax/fetch_question_category/1': '?/publish/ajax/fetch_question_category/1', // 分类栏目
        '/api/?/': '/?/' // 社区板块内容
    }
}

var apiProxy = proxy(options)
router.use('/', apiProxy)

module.exports = router
