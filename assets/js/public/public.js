/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:48
 * Description：public
 */

import axios from 'axios'
import Cookies from 'js-cookie'

const proxyUrlBbs = '/nodeproxy/bbs'
const proxyUrlPc = '/nodeproxy/pc'

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

// 验证手机号
const isPoneAvailable = (pone) => {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!myreg.test(pone)) {
        return false
    } else {
        return true
    }
}
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

// 登陆/注册时设置 cookies
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
    header: function () {
        // 根据是否登陆展示不同按钮
        if (Cookies.get('hx_forum_token') === undefined) {
            $('.login-registration').html(`<p class="login noColorBtn">登录</p><p class="registration colorBtn">注册</p>`)
        } else {
            $('#forumBanner').hide()
            $('header').addClass('active')
            $('.login-registration').html(`<p class="publish-forum-btn colorBtn">
                                                <a href="http://bbs.huoxing24.com/?/publish/">发布话题</a>
                                            </p>
                                            <a href="http://bbs.huoxing24.com/?/people/${Cookies.get('hx_forum_nickName')}">
                                                <img class="head-img" src=${Cookies.get('hx_forum_iconUrl')} alt="">
                                            </a>
                                            <p class="logOut noColorBtn">[注销]</p>`)
        }
        let urlSkip = getQueryString('url')
        let froum = getQueryString('froum')
        let froumSkip = window.location.href.indexOf('froum') !== -1
        // 弹出登陆框
        $('.login').click(function (e) {
            e.stopPropagation()
            $('.shade').show()
            $('.login-con, .login-con .login').show()
        })

        // 弹出注册框
        $('.registration').click(function (e) {
            e.stopPropagation()
            $('.shade').show()
            $('.login-con, .login-con .register').show()
        })

        // 隐藏注册/登陆框
        $('.shade').click(function () {
            if ($('.login-con').is(':visible')) {
                $('.shade').hide()
                $('.login-con, .login-con .login, .login-con .register').hide()
            }
        })

        const loginFunc = () => {
            let $phoneInput = $('.phone-input').val()
            let $password = $('.password-input').val()
            if ($phoneInput.trim() === '' || !isPoneAvailable($phoneInput)) {
                layer.msg('手机号码有误，请核对后重新输入！')
                return false
            }
            if ($password.trim() === '') {
                layer.msg('密码不能为空！')
                return false
            }
            axiosAjax({
                type: 'post',
                url: proxyUrlPc + '/passport/account/login',
                params: {
                    phonenum: $phoneInput,
                    password: $password
                },
                fn: (data) => {
                    if (data.code !== 1) {
                        layer.msg(data.msg)
                    } else {
                        $('#forumBanner').toggleClass('active')
                        setCookies(data.obj)
                        $('.shade').hide()
                        $('.login-con, .login-con .login').hide()
                        Cookies.set('hx_forum_loginState', 0)
                        layer.msg('登陆成功！')
                        $('#iframe').attr('src', data.obj.bbsLogin)
                        if (froumSkip && froum === 'login') {
                            window.location.href = urlSkip
                        } else {
                            setTimeout(function () {
                                window.location.reload()
                            }, 500)
                        }
                    }
                }
            })
        }

        // 登陆请求
        $('.login-btn').click(function () {
            loginFunc()
        })
        $(document).on('keydown', '.login-con-main.login input', function (event) {
            if (parseInt(event.keyCode) === 13) {
                loginFunc()
            }
        })

        const signoutFunc = () => {
            axiosAjax({
                type: 'post',
                url: proxyUrlPc + '/passport/account/logout',
                params: {},
                fn: (data) => {
                    if (data.code !== 1) {
                        layer.msg(data.msg)
                    } else {
                        deleteCookies()
                        layer.msg('已注销！')
                        $('#iframe').attr('src', data.obj)

                        if (urlSkip) {
                            window.location.href = urlSkip
                        } else {
                            setTimeout(function () {
                                window.location.reload()
                            }, 500)
                        }
                    }
                }
            })
        }

        // 注销
        $('.login-registration').on('click', '.logOut', function () {
            signoutFunc()
        })
        if (forum && forum === 'signout') {
            signoutFunc()
        }

        // 注册获取验证码
        $('.getCode').click(function () {
            axiosAjax({
                type: 'post',
                url: proxyUrlPc + '/passport/account/getverifcode',
                params: {
                    countrycode: 86,
                    verifcategory: 1, // 验证码类别 1 注册 2 找回密码
                    phonenum: $('.register-phone-num input').val()
                },
                fn: (data) => {
                    if (data.code !== 1) {
                        layer.msg(data.msg)
                    } else {
                        layer.msg('验证码已发送，请注意查收！')
                    }
                }
            })
        })

        const signinFunc = () => {
            let $authCode = $('.auth-code-item input').val()
            let $password = $('.register-pw input').val()
            let $passwordConfirm = $('.register-pw-confirm input').val()
            let $phoneInput = $('.register-phone-num input').val()
            let reg = /^\d{6}$/ // 6位数字正则

            if ($phoneInput.trim() === '' || !isPoneAvailable($phoneInput)) {
                layer.msg('手机号码有误，请核对后重新输入！')
                return false
            }

            if ($authCode.trim() === '') {
                layer.msg('验证码不能为空！')
                return false
            }
            if (!reg.test($authCode)) {
                layer.msg('验证码格式有误，请重新输入！')
                return false
            }

            if ($password.trim() === '') {
                layer.msg('密码不能为空！')
                return false
            }

            if ($password !== $passwordConfirm) {
                layer.msg('密码输入不一致，请重新输入！')
                return false
            }

            axiosAjax({
                type: 'post',
                url: proxyUrlPc + '/passport/account/register',
                params: {
                    verifcode: $authCode,
                    password: $password,
                    verifcategory: 1, // 验证码类别 1 注册 2 找回密码
                    phonenum: $phoneInput
                },
                fn: (data) => {
                    if (data.code !== 1) {
                        layer.msg(data.msg)
                    } else {
                        $('.login-con, .login-con .register').hide()
                        layer.msg('注册成功！')
                        if (froumSkip && froum === 'signin') {
                            window.location.href = urlSkip
                        } else {
                            $('.login-con, .login-con .login').show()
                        }
                    }
                }
            })
        }

        // 注册请求
        $('.register-btn').click(function () {
            signinFunc()
        })
        $(document).on('keydown', '.login-con-main.register input', function (event) {
            if (parseInt(event.keyCode) === 13) {
                signinFunc()
            }
        })
        $('.to-login').click(function (e) {
            e.stopPropagation()
            $('.login-con .register').hide()
            $('.login-con .login').show()
        })

        $('.to-register').click(function (e) {
            e.stopPropagation()
            $('.login-con .register').show()
            $('.login-con .login').hide()
        })
    },
    banner: function () {
        // banner关闭与展开
        $('#bannerClose').click(function () {
            $('header').addClass('active')
            $('#forumBanner').addClass('active')
        })
    },
    footer: function () {
        const $wxFx = $('#wxFx')
        $('#wxShare').hover(function () {
            $wxFx.show()
        }, function () {
            $wxFx.hide()
        })
    },
    froumShow: function () {
        let froum = getQueryString('froum')
        // let urlSkip = getQueryString('url')
        let froumSkip = window.location.href.indexOf('froum') !== -1
        if (froumSkip && froum === 'login') {
            $('.shade').show()
            $('.login-con, .login-con .login').show()
        } else if (froumSkip && froum === 'signin') {
            $('.shade').show()
            $('.login-con, .login-con .register').show()
        } else if (froumSkip && froum === 'signout') {
            deleteCookies()
            layer.msg('已注销！')
        }
    }
}

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
    isPoneAvailable,
    utils,
    proxyUrlBbs,
    proxyUrlPc,
    getTime,
    formatTime
}
