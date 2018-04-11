/**
 * Author：zhoushuanglong
 * Time：2018-04-08 21:33
 * Description：proxy
 */
const express = require('express')
const router = express.Router()
const proxyJava = require('express-http-proxy')
const utils = require('../utils/public')

// bbs:php接口代理
const phpApi = proxyJava(utils.ajaxPhpUrl, {
    proxyReqPathResolver: function (req) {
        const url = req.originalUrl.split('/nodeproxy/bbs')[1]
        console.log(url)
        if (url.indexOf('/') === -1) {
            return '/' + url
        } else {
            return url
        }
    }
})
for (let value of utils.proxyPhpApi) {
    router.use(value, phpApi)
}

// pc:java接口代理
const javaApi = proxyJava(utils.ajaxJavaUrl, {
    proxyReqPathResolver: function (req) {
        const url = req.originalUrl.split('/nodeproxy/pc')[1]
        if (url.indexOf('/') === -1) {
            return '/' + url
        } else {
            return url
        }
    }
})
for (let value of utils.proxyJavaApi) {
    router.use(value, javaApi)
}

module.exports = router
