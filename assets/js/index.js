/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:46
 * Description：Description
 */

import {pageLoadingHide, axiosAjax, proxyUrl} from './public/public'

$(function () {
    pageLoadingHide()
    axiosAjax({
        type: 'post',
        url: proxyUrl + '/info/news/columnadd',
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

    console.log('index.js')
})
