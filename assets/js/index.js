/**
 * Author：zhoushuanglong
 * Time：2018-04-08 15:46
 * Description：Description
 */

import {pageLoadingHide, axiosAjax, proxyUrl} from './public/public'
import '../../node_modules/layui-layer/dist/layer.js'

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
            layer.msg('请求成功')
            console.log(data)
        }
    })

    console.log('index.js')
})
