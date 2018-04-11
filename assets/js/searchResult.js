import {pageLoadingHide} from './public/public'

$(function () {
    pageLoadingHide()

    $('#pagination').pagination({
        items: 20,
        itemOnPage: 7,
        currentPage: 1,
        prevText: '<span aria-hidden="true">上一页</span>',
        nextText: '<span aria-hidden="true">下一页</span>',
        onInit: function () {
            // fire first page loading
        },
        onPageClick: function (page, evt) {
            // some code
        }
    })
})
