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
        // '/api/account/login': '/account/login'
    }
}

var apiProxy = proxy(options)
router.use('/', apiProxy)

module.exports = router
