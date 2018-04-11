/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:46
 * Description：Description
 */

import {pageLoadingHide, utils} from './public/public'
import '../../node_modules/layui-layer/dist/layer.js'

$(function () {
    pageLoadingHide()
    utils.banner()
    // 中间swiper
    
    let conterSwiper = new Swiper('.swiper-c-top', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        preventClicks: false
    })
    conterSwiper.autoplay = true

    // 中间左侧
    $('#leftTop li').on('click', function () {
        $('.list-tab').removeClass('show')
        $(this).addClass('active').siblings('li').removeClass('active')
        $('#leftBottom li').removeClass('active')
    })
    $('#leftBottom li').on('click', function () {
        $('.list-tab').addClass('show')
        $(this).addClass('active').siblings('li').removeClass('active')
        $('#leftTop li').removeClass('active')
    })
    // 中间tab切换
    $('#listTab p').on('click', function () {
        $(this).addClass('active').children('span').addClass('active').parent()
            .siblings('p').removeClass('active').children('span').removeClass('active')
    })
})
