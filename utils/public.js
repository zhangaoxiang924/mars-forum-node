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
 * Intro: time format
 */
const formatTime = (date, str) => {
    let _str = !str ? '-' : str
    const zero = (m) => {
        return m < 10 ? '0' + m : m
    }
    let time = new Date(parseInt(date) * 1000)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    if (date) {
        return y + _str + zero(m) + _str + zero(d)
    } else {
        return ''
    }
}
const getTime = (publishTime, requestTime, justNow, minuteAgo, hourAgo) => {
    let limit = parseInt((requestTime - publishTime)) / 1000
    let content = ''
    if (limit < 60) {
        content = justNow
    } else if (limit >= 60 && limit < 3600) {
        content = Math.floor(limit / 60) + minuteAgo
    } else if (limit >= 3600 && limit < 86400) {
        content = Math.floor(limit / 3600) + hourAgo
    } else {
        content = formatTime(publishTime)
    }
    return content
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
const ajaxPhpUrl = 'http://bbs.huoxing24.com/'
const phpPrefix = '/bbs'
const proxyPhpApi = [
    phpPrefix,
    phpPrefix + '/?/',
    phpPrefix + '/account/ajax/profiles_setting',
    phpPrefix + '/?/home/ajax/index_actions',
    phpPrefix + '/home/#all__focus',
    phpPrefix + '/?/publish/ajax/fetch_question_category/1'
]

module.exports = {
    ajaxPhpUrl,
    ajaxJavaUrl,
    proxyPhpApi,
    proxyJavaApi,
    axiosAjax,
    getTime,
    formatTime
}
