/**
 * Author: yangbo
 * Time: 2018-04-11 18:12:31
 * Description: Description
 */
var express = require('express')
var router = express.Router()
const utils = require('../utils/public')

const axiosAjax = utils.axiosAjax
const ajaxPhpUrl = utils.ajaxPhpUrl

/* GET tagList listing. */
router.get('/', function (req, res, next) {
    // res.render('tagList', {title: 'tagList'})
    async function indexData() {
        const data = await new Promise((resolve) => {
            axiosAjax({
                type: 'GET',
                url: ajaxPhpUrl + '/?/topic/',
                params: {
                    channel: 'hot',
                    day: 'week'
                },
                res: res,
                fn: function (data) {
                    resolve(data)
                }
            })
        })

        return data
    }

    indexData().then((data) => {
        res.render('taglist', {...data})
    })
})

module.exports = router
