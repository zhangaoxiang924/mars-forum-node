/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:46
 * Description：Description
 */

import {pageLoadingHide, axiosAjax, utils} from './public/public'
// import {ajaxUrl} from '../../utils/public'
import '../../node_modules/layui-layer/dist/layer.js'
$(function () {
    pageLoadingHide()
    utils.banner()
    let imgUrl = 'http://wecenter.huoxing24.vip//uploads/avatar/'
    // 中间swiper

    let conterSwiper = new Swiper('.swiper-c-top', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        preventClicks: false
    })
    conterSwiper.autoplay = true

    // 中间左侧/ top
    let topColumn = [
        {is_recommend: 1, page: 1},
        {sort_type: 'hot', page: 1},
        {sort_type: 'new', page: 1}
    ]
    async function indexLeftTopData (index, page) {
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: '/api',
                params: topColumn[index],
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
                url: `/api/?/home/ajax/index_actions?page=${page}&filter=focus`,
                params: {},
                fn: function (data) {
                    resolve(data)
                }
            })
        })
        return data
    }
    $('#leftTop li').on('click', function () {
        $('.list-tab').removeClass('show')
        $(this).addClass('active').siblings('li').removeClass('active')
        $('#leftBottom li').removeClass('active')
        let index = $(this).index()
        if (index < 3) {
            let page = topColumn[index].page
            indexLeftTopData(index, page).then((data) => {
                let dataArr = data.posts_list
                let list = ''
                console.log(data)
                dataArr.map(function (item, index) {
                    let topicsList = ''
                    item.topics.map(function (item, index) {
                        topicsList += `<span>${item.topic_title}</span>`
                    })
                    list += `<div class="list">
                        <div class="introduce">
                            <p><a href="">${item.question_content}</a>${topicsList}</p>
                            <div class="user-box">
                                <div class="portrait">
                                    <span class="portrait-img"><img src=${imgUrl + item.user_info.avatar_file} alt=""></span>
                                    <span class="portrait-name">${item.user_info.user_name}</span>
                                    <span class="time">${item.add_time}</span>
                                    <span class="comment"><font>${item.answer_count}</font>评论</span>
                                </div>
                            </div>
                        </div>
                    </div>`
                })
                $('.content-center-box .list-box').html(list)
            })
        } else {
            let dataState = parseInt($(this).data('type'))
            console.log(dataState)
            if (dataState === -1) {
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
                url: '/api/?/publish/ajax/fetch_question_category/1',
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
            list += `<li data-id=${item.id}><span><img src="./img/jd.png" alt=""></span>${item.title}</li>`
        })
        $('#leftBottom').html(list)
    })

    async function indexLeftCommunityData (id, type, index) {
        let classifyData = ['sort_type', 'sort_type', 'is_recommend']
        const data = await new Promise((resolve, reject) => {
            axiosAjax({
                type: 'GET',
                url: `/api/?category=${id}&${classifyData[index]}=${type}`,
                fn: function (data) {
                    resolve(data)
                }
            })
        })
        return data
    }
    let cDataId = null
    $('ul#leftBottom').on('click', 'li', function () {
        $('.list-tab').addClass('show')
        $(this).addClass('active').siblings('li').removeClass('active')
        $('#listTab p').eq(0).addClass('active').children('span').addClass('active').parent()
            .siblings('p').removeClass('active').children('span').removeClass('active')
        $('#leftTop li').removeClass('active')
        let dataId = $(this).data('id')
        let index = $(this).index()
        cDataId = dataId
        indexLeftCommunityData(dataId, 'new', index).then((data) => {
            let dataArr = data.posts_list
            let list = ''
            dataArr.map(function (item, index) {
                let topicsList = ''
                item.topics.map(function (item, index) {
                    topicsList += `<span>${item.topic_title}</span>`
                })
                list += `<div class="list">
                        <div class="introduce">
                            <p><a href="">${item.question_content}</a>${topicsList}</p>
                            <div class="user-box">
                                <div class="portrait">
                                    <span class="portrait-img"><img src=${imgUrl + item.user_info.avatar_file} alt=""></span>
                                    <span class="portrait-name">${item.user_info.user_name}</span>
                                    <span class="time">${item.add_time}</span>
                                    <span class="comment"><font>${item.answer_count}</font>评论</span>
                                </div>
                            </div>
                        </div>
                    </div>`
            })
            $('.content-center-box .list-box').html(list)
        })
    })

    // 中间切换
    $('#listTab p').on('click', function () {
        $(this).addClass('active').children('span').addClass('active').parent()
            .siblings('p').removeClass('active').children('span').removeClass('active')
        let dataType = $(this).data('type')
        let index = $(this).index()
        console.log(index)
        indexLeftCommunityData(cDataId, dataType, index).then((data) => {
            let dataArr = data.posts_list
            let list = ''
            dataArr.map(function (item, index) {
                let topicsList = ''
                item.topics.map(function (item, index) {
                    topicsList += `<span>${item.topic_title}</span>`
                })
                list += `<div class="list">
                    <div class="introduce">
                        <p><a href="">${item.question_content}</a>${topicsList}</p>
                        <div class="user-box">
                            <div class="portrait">
                                <span class="portrait-img"><img src=${imgUrl + item.user_info.avatar_file} alt=""></span>
                                <span class="portrait-name">${item.user_info.user_name}</span>
                                <span class="time">${item.add_time}</span>
                                <span class="comment"><font>${item.answer_count}</font>评论</span>
                            </div>
                        </div>
                    </div>
                </div>`
            })
            $('.content-center-box .list-box').html(list)
        })
    })
})
