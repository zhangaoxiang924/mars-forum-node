/**
 * Author: yangbo
 * Time: 2018-04-11 18:11:48
 * Description: Description
 */
import {pageLoadingHide} from './public/public'

const {axiosAjax, proxyUrlBbs} = require('./public/public')

$(function () {
    pageLoadingHide()

    $('.tab-list').on('click', 'a', function () {
        let $this = $(this)
        let time = $this.data('time')

        $this.addClass('active').siblings().removeClass('active')

        function refItem (data) {
            let tagBody = $('.tag-body')
            let result = data.topics_list.slice().map((item) => {
                return (
                    `<div class="tag-item clearfix">
                    <div class="tag-img">
                        <img src='${item.topic_pic}' alt="">
                    </div>
                    <div class="tag-context">
                        <p><a href="${'/taginfo?id=' + item.topic_id}">${item.topic_title}</a></p>
                        <p>${item.topic_description}</p>
                        <p>
                            <span>${item.focus_count}人关注</span>
                            <span>${item.discuss_count}个话题</span>
                        </p>
                    </div>
                    <div class="tag-att">
                         ${item.has_focus ? `<a href="javascript:;" data-topicID="${item.topic_id}" class="cancle-attention">已关注</a>` : `<a href="javascript:;" data-topicID="${item.topic_id}" class="attention">关注</a>`}
                    </div>
                </div>`
                )
            })
            let str = result.join('')
            tagBody.html(str)
        }

        axiosAjax({
            type: 'GET',
            url: proxyUrlBbs + '/?/topic/',
            params: {
                channel: 'hot',
                day: time
            },
            fn: function (data) {
                refItem(data)
            }
        })
    })
})
