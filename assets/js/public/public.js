/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:48
 * Description：public
 */

import axios from 'axios'
import Cookies from 'js-cookie'

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
    const {type, url, params, fn, contentType, formData} = arg

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
            params: params
        }
    } else if (ajaxType === 'get') {
        opt = {
            method: type,
            url: url,
            params: params
        }
    } else if (ajaxType === 'complexpost') {
        opt = {
            method: 'post',
            url: url,
            data: params
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
        $('#ajaxLoading').remove()

        if (fn) {
            fn.call(this, data)
        }
    }).catch(function (error) {
        console.log(error)
    })
}

// 登陆时设置 cookies
const setCookies = (obj) => {
    for (let key in obj) {
        Cookies.set('hx_forum_' + key, obj[key], {expires: 7})
    }
}

// 注销时删除相关cookies
const deleteCookies = () => {
    let strcookie = document.cookie
    let arrcookie = strcookie.split('; ')
    for (let i = 0; i < arrcookie.length; i++) {
        let arr = arrcookie[i].split('=')
        if (arr[0].indexOf('hx_forum') !== -1) {
            Cookies.remove(arr[0])
        }
    }
}

const utils = {
    banner: function () {
        if (Cookies.get('hx_forum_token') === undefined) {
            $('.login-registration').html(`<p class="login noColorBtn">登录</p><p class="registration colorBtn">注册</p>`)
        } else {
            $('.login-registration').html(`<p class="userName noColorBtn">${Cookies.get('hx_forum_nickName')}</p><p class="logOut colorBtn">注销</p>`)
        }
        $('.login').click(function (e) {
            e.stopPropagation()
            $('.shade').show()
            $('.login-con, .login-con .login').show()
        })

        $('.registration').click(function (e) {
            e.stopPropagation()
            $('.shade').show()
            $('.login-con, .login-con .register').show()
        })

        $('.shade').click(function () {
            if ($('.login-con').is(':visible')) {
                $('.shade').hide()
                $('.login-con, .login-con .login, .login-con .register').hide()
            }
        })

        $('.login-btn').click(function () {
            axiosAjax({
                type: 'post',
                url: '/api/passport/account/login',
                params: {
                    phonenum: $('.phone-input').val(),
                    password: $('.password-input').val()
                },
                fn: (data) => {
                    if (data.code !== 1) {
                        layer.msg(data.msg)
                    } else {
                        setCookies(data.obj)
                        $('.shade').hide()
                        $('.login-con, .login-con .login').hide()
                        window.location.reload()
                    }
                }
            })
        })
        $('.login-registration').on('click', '.logOut', function () {
            deleteCookies()
            window.location.reload()
        })
    }
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
    deleteCookies,
    utils,
    proxyUrl
}
