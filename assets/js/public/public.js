/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:48
 * Description：public
 */

import axios from 'axios'

const isPc = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    const Agents = ['android', 'iphone', 'ipad', 'ipod', 'windows phone']
    let flag = true
    for (let i = 0; i < Agents.length; i++) {
        if (userAgent.indexOf(Agents[i]) > -1) {
            flag = false
            break
        }
    }
    return flag
}

const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1) {
        flag = true
    }
    return flag
}

const isAndroid = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('android') > -1) {
        flag = true
    }
    return flag
}

const isPad = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('ipad') > -1) {
        flag = true
    }
    return flag
}

const isWeixin = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    let flag = false
    if (userAgent.indexOf('micromessenger') > -1) {
        flag = true
    }
    return flag
}

const ieVersion = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()

    return userAgent.match(/msie\s\d+/)[0].match(/\d+/)[0] || userAgent.match(/trident\s?\d+/)[0]
}

/**
 * JS：getQueryString(name)
 */
const getQueryString = (key) => {
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    let result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
}

/**
 * JS：pageLoadingHide()
 */
const pageLoadingHide = () => {
    const $pageLoading = $('#pageLoading')
    $pageLoading.removeClass('active')
    setTimeout(() => {
        $pageLoading.remove()
    }, 300)
}

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
    const {type, url, params, contentType, formData, fn} = arg

    const ajaxLoadingStr = `<div class="lk-loading ajax active" id="ajaxLoading">
    <div class="lk-loading-center">
        <div class="lk-loading-center-absolute">
            <div class="round round-one"></div>
            <div class="round round-two"></div>
            <div class="round round-three"></div>
        </div>
    </div>
</div>`

    if ($('#ajaxLoading').length === 0) {
        $('body').append(ajaxLoadingStr)
    }

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
        $.each(params, function (key, value) {
            formDataParm.append(key, value)
        })

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

        $('#ajaxLoading').remove()
        if (fn) {
            fn.call(this, data)
        }
    }).catch(function (error) {
        console.log(error)
    })
}

const proxyUrl = '/api'

export {
    isPc,
    isIos,
    isAndroid,
    isWeixin,
    isPad,
    ieVersion,
    getQueryString,
    pageLoadingHide,
    axiosAjax,
    proxyUrl
}
