/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:46
 * Description：Description
 */

import Cookies from 'js-cookie'
import '../../node_modules/layui-layer/dist/layer.js'

import {pageLoadingHide, axiosAjax, utils, proxyUrlBbs, formatTime} from './public/public'

$(function () {
    pageLoadingHide()
    utils.header()
    utils.banner()
    utils.footer()
    utils.froumShow()

    let imgUrl = 'http://bbs.huoxing24.com/uploads/avatar/'
    let phpUrl = 'http://bbs.huoxing24.com'

    $('.banner-close').on('click', function () {
        $('.forum-banner').slideUp()
    })

    const invitationItem = (data, loadMore) => {
        let dataArr = data.posts_list
        let list = ''
        console.log(data)
        $('#conterMore').attr('data-total', data.total_rows)
        if (parseInt(data.total_rows) > 10) {
            $('#conterMore').css('display', 'block')
        } else {
            $('#conterMore').css('display', 'none')
        }

        dataArr.map(function (item, index) {
            let topicsList = ''
            item.topics.map(function (item) {
                topicsList += `<a target="_blank" href="${phpUrl}/?/topic/${item.topic_title}">
<span>${item.topic_title}</span></a>`
            })

            list += `<div class="list">
                        <div class="introduce">
                            <p><a target="_blank" href="${phpUrl}/?/question/${item.question_id}">${item.question_content}</a>${topicsList}</p>
                            <div class="user-box">
                                <div class="portrait">
                                    <a target="_blank" href="${phpUrl}/?/people/${item.user_info.user_name}">
                                        <span class="portrait-img"><img src=${imgUrl + item.user_info.avatar_file} alt=""></span>
                                        <span class="portrait-name">${item.user_info.user_name}</span>
                                    </a>
                                    <span class="time">${formatTime(item.add_time)}</span>
                                    <span class="comment"><font>${item.answer_count}</font>评论</span>
                                </div>
                            </div>
                        </div>
                    </div>`
        })

        const $content = $('.content-center-box .list-box')
        if (loadMore) {
            $content.append(list)
        } else {
            $content.html(list)
        }
    }

    // 中间swiper
    let conterSwiper = new Swiper('.swiper-c-top', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        preventClicks: false
    })
    conterSwiper.detachEvents()

    // 中间左侧/ top
    async function indexLeftTopData (key, type, page) {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: `${proxyUrlBbs}/api/main?${key}=${type}&page=${page}`,
                // params: {sort_type: 'hot', page: page},
                fn: function (data) {
                    resolve(data)
                }
            })
        })
        return data
    }

    // 关注
    async function indexLeftAttentionData (page) {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: `${proxyUrlBbs}/home/#all__focus`,
                params: {},
                fn: function (data) {
                    resolve(data)
                }
            })
        })
        return data
    }

    let pageNum = 1
    let columnKey = ''
    let columnDataType = ''
    $('#leftTop li').on('click', function () {
        $('#conterMore').attr('data-pages', false)
        $('.list-tab').removeClass('show')
        $(this).addClass('active').siblings('li').removeClass('active')
        $('#leftBottom li').removeClass('active')
        let index = $(this).index()
        let dataType = $(this).data('type')
        let key = ''
        if (index === 0) {
            key = 'is_recommend'
        } else {
            key = 'sort_type'
        }
        columnKey = key
        pageNum = 1
        columnDataType = dataType
        if (index < 3) {
            indexLeftTopData(key, dataType, pageNum).then((data) => {
                invitationItem(data)
            })
        } else {
            let dataState = parseInt($(this).data('type'))
            console.log(dataState)
            if (Cookies.get('hx_forum_loginState') === undefined) {
                $('.shade').show()
                $('.login-con, .login-con .login').show()
                return false
            } else {
                indexLeftAttentionData(1).then((data) => {
                    console.log(data)
                })
            }
        }
    })

    // 中间左侧/ 板块
    async function indexClassifyData () { // 分类栏目
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'get',
                url: `${proxyUrlBbs}/?/publish/ajax/fetch_question_category/1`,
                params: {},
                fn: function (data) {
                    resolve(data)
                }
            })
        })
        return data
    }

    indexClassifyData().then((data) => {
        let list = ''
        data.map(function (item, index) {
            list += `<li data-id=${item.id}><span><img src=${item.icon} alt=""></span>${item.title}</li>`
        })
        $('#leftBottom').html(list)
    })

    async function indexLeftCommunityData (id, type, index, key, page) {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: `${proxyUrlBbs}/api/main/?category=${id}&${key}=${type}&page=${page}`,
                // params: classifyData[index],
                fn: function (data) {
                    resolve(data)
                }
            })
        })
        return data
    }

    let cDataId = null
    let bColumnId = null
    let bDataType = 'new'
    let bIndex = null
    let bKey = ''
    $('ul#leftBottom').on('click', 'li', function () {
        $('#conterMore').attr('data-pages', true)
        $('.list-tab').addClass('show')
        $(this).addClass('active').siblings('li').removeClass('active')
        $('#listTab p').eq(0).addClass('active').children('span').addClass('active').parent()
            .siblings('p').removeClass('active').children('span').removeClass('active')
        $('#leftTop li').removeClass('active')
        let dataId = $(this).data('id')
        let index = $(this).index()
        cDataId = dataId
        bColumnId = dataId
        indexLeftCommunityData(dataId, 'new', index, 'sort_type', 1).then((data) => {
            invitationItem(data)
        })
    })

    // 中间切换
    $('#listTab p').on('click', function () {
        pageNum = 1
        $(this).addClass('active').children('span').addClass('active').parent()
            .siblings('p').removeClass('active').children('span').removeClass('active')
        let dataType = $(this).data('type')
        bDataType = dataType
        let index = $(this).index()
        bIndex = index
        let key = ''
        if (index === 2) {
            key = 'is_recommend'
        } else {
            key = 'sort_type'
        }
        indexLeftCommunityData(cDataId, dataType, index, key, 1).then((data) => {
            invitationItem(data)
        })
    })

    // 加载更多
    $('#conterMore').on('click', function () {
        pageNum++
        let total = $(this).data('total')
        let pagination = Math.ceil(total / 10)
        if (pageNum > pagination) {
            layer.msg('没有更多')
            return false
        } else {
            let pageState = $(this).data('pages')
            if (pageState) {
                if (bIndex === 2) {
                    bKey = 'is_recommend'
                } else {
                    bKey = 'sort_type'
                }
                indexLeftCommunityData(bColumnId, bDataType, '', bKey, pageNum).then((data) => {
                    invitationItem(data, 'loadMore')
                })
            } else {
                indexLeftTopData(columnKey, columnDataType, pageNum).then((data) => {
                    invitationItem(data, 'loadMore')
                })
            }
        }
    })
})
