/**
 * Author：zhoushuanglong
 * Time：2018-04-10 15:02
 * Description：nodejs public js
 */

const axios = require('axios')

/**
 * JS：axiosAjax({
        type: 'post',
        url: '/info/news/columnadd',
        contentType: 'application/x-www-form-urlencoded',
        formData: true,
        params: {
            dataone: 'one',
            datatwo: 'two'
        },
        fn: function (data) {
            console.log(data)
        }
    })
 */
const axiosAjax = (arg) => {
    const {type, url, params, contentType, formData, fn, res} = arg

    let opt = null
    const ajaxType = type.toLowerCase()
    if (ajaxType === 'post') {
        opt = {
            method: type,
            url: url,
            data: params
        }
    } else if (ajaxType === 'get') {
        opt = {
            method: type,
            url: url,
            params: params
        }
    }

    if (formData) {
        let formDataParm = new URLSearchParams()
        for (let key in params) {
            formDataParm.append(key, params[key])
        }

        opt = {
            method: type,
            url: url,
            data: formDataParm
        }
    }

    if (contentType) {
        opt.headers = {
            'Content-Type': contentType
        }
    }

    axios(opt).then(function (response) {
        const data = response.data

        if (fn) {
            fn.call(this, data)
        }
    }).catch(function (err) {
        if (res) {
            res.render('error', {
                message: 'Request error',
                error: {
                    status: err.response.status,
                    stack: err.response.data
                }
            })
        }
    })
}

/**
 * java: pc接口代理
 */
const ajaxJavaUrl = 'http://www.huoxing24.com'
const javaPrefix = '/pc'
const proxyJavaApi = [
    javaPrefix + '/info/news/getbyid',
    javaPrefix + '/passport/account/login',
    javaPrefix + '/passport/account/getverifcode',
    javaPrefix + '/passport/account/register'
]

/**
 * php: bbs接口代理
 */
const ajaxPhpUrl = 'http://wecenter.huoxing24.vip'
const phpPrefix = '/bbs'
const proxyPhpApi = [
    phpPrefix,
    phpPrefix + '/account/ajax/profiles_setting'
]

module.exports = {
    ajaxPhpUrl,
    ajaxJavaUrl,
    proxyPhpApi,
    proxyJavaApi,
    axiosAjax
}
